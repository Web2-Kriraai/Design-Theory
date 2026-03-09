'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, UploadCloud, Image as ImageIcon } from 'lucide-react';

export default function UploadForm({ onSuccess, onCancel, initialData = null }) {
    const [formData, setFormData] = useState({
        title: initialData?.title || '',
        clientName: initialData?.clientName || '',
        category: initialData?.category || '',
        description: initialData?.description || '',
        technologies: initialData?.technologies?.join(', ') || '',
        projectLink: initialData?.projectLink || ''
    });

    const [coverImage, setCoverImage] = useState(initialData?.coverImage || null);
    const [coverPreview, setCoverPreview] = useState(initialData?.coverImage || null);

    const [galleryImages, setGalleryImages] = useState(initialData?.images || []);
    const [galleryPreviews, setGalleryPreviews] = useState(initialData?.images || []);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCoverChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setCoverImage(file);
            setCoverPreview(URL.createObjectURL(file));
        }
    };

    const handleGalleryChange = (e) => {
        const files = Array.from(e.target.files);
        if (galleryImages.length + files.length > 8) {
            setError('You can only upload a maximum of 8 gallery images.');
            return;
        }
        setGalleryImages([...galleryImages, ...files]);
        const newPreviews = files.map(f => URL.createObjectURL(f));
        setGalleryPreviews([...galleryPreviews, ...newPreviews]);
        setError('');
    };

    const removeGalleryImage = (index) => {
        const updatedImages = [...galleryImages];
        updatedImages.splice(index, 1);
        setGalleryImages(updatedImages);

        const updatedPreviews = [...galleryPreviews];
        updatedPreviews.splice(index, 1);
        setGalleryPreviews(updatedPreviews);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!coverImage) return setError('Cover image is required.');
        if (galleryImages.length < 4 || galleryImages.length > 8) return setError('Please upload between 4 and 8 gallery images.');
        if (!formData.title || !formData.clientName || !formData.category || !formData.description) return setError('Please fill all required text fields.');

        setLoading(true);

        try {
            // 1. Upload Cover Image (only if it's a new File object)
            let coverUrl = coverImage;
            if (coverImage instanceof File) {
                const coverData = new FormData();
                coverData.append('images', coverImage);
                const coverRes = await fetch('/api/upload', {
                    method: 'POST',
                    body: coverData
                });
                const coverJson = await coverRes.json();
                if (!coverRes.ok) throw new Error(coverJson.error || 'Failed to upload cover image');
                coverUrl = coverJson.urls[0];
            }

            // 2. Upload Gallery Images (only the new files)
            const uploadedGalleryUrls = [];
            const newGalleryFiles = galleryImages.filter(img => img instanceof File);
            const existingGalleryUrls = galleryImages.filter(img => typeof img === 'string');

            if (newGalleryFiles.length > 0) {
                const galleryData = new FormData();
                newGalleryFiles.forEach(img => galleryData.append('images', img));
                const galleryRes = await fetch('/api/upload', {
                    method: 'POST',
                    body: galleryData
                });
                const galleryJson = await galleryRes.json();
                if (!galleryRes.ok) throw new Error(galleryJson.error || 'Failed to upload new gallery images');
                uploadedGalleryUrls.push(...galleryJson.urls);
            }

            const finalGalleryUrls = [...existingGalleryUrls, ...uploadedGalleryUrls];

            // 3. Save to MongoDB
            const techArray = formData.technologies.split(',').map(t => t.trim()).filter(Boolean);

            const projectData = {
                title: formData.title,
                clientName: formData.clientName,
                category: formData.category,
                description: formData.description,
                coverImage: coverUrl,
                images: finalGalleryUrls,
                technologies: techArray,
                projectLink: formData.projectLink
            };

            const apiUrl = initialData ? `/api/portfolio?id=${initialData._id}` : '/api/portfolio';
            const apiMethod = initialData ? 'PUT' : 'POST';

            const dbRes = await fetch(apiUrl, {
                method: apiMethod,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(projectData)
            });

            if (!dbRes.ok) {
                const dbJson = await dbRes.json();
                throw new Error(dbJson.error || 'Failed to save project to database');
            }

            if (onSuccess) onSuccess();

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            style={{ background: 'white', padding: '40px', border: '1px solid #EAE6DF', position: 'relative' }}
        >
            <button onClick={onCancel} disabled={loading} style={{ position: 'absolute', top: '24px', right: '24px', background: 'none', border: 'none', cursor: 'pointer', color: '#999' }}>
                <X size={20} />
            </button>

            <h2 style={{ fontFamily: 'var(--font-primary, serif)', fontSize: '2rem', color: '#2D2926', marginBottom: '24px' }}>
                {initialData ? 'Edit Project' : 'Add New Project'}
            </h2>

            {error && <div style={{ marginBottom: '20px', padding: '12px', background: '#fef2f2', border: '1px solid #fecaca', color: '#ef4444', fontSize: '0.85rem' }}>{error}</div>}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {/* ── ROW: Title & Client ── */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#999' }}>Title *</label>
                        <input name="title" value={formData.title} onChange={handleInputChange} required style={{ padding: '12px', border: '1px solid #EAE6DF', fontFamily: 'sans-serif', fontSize: '0.9rem' }} placeholder="Project Title" />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#999' }}>Client Name *</label>
                        <input name="clientName" value={formData.clientName} onChange={handleInputChange} required style={{ padding: '12px', border: '1px solid #EAE6DF', fontFamily: 'sans-serif', fontSize: '0.9rem' }} placeholder="Client / Brand Name" />
                    </div>
                </div>

                {/* ── ROW: Category & Link ── */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#999' }}>Category *</label>
                        <select name="category" value={formData.category} onChange={handleInputChange} required style={{ padding: '12px', border: '1px solid #EAE6DF', fontFamily: 'sans-serif', fontSize: '0.9rem', background: 'white' }}>
                            <option value="">Select a category</option>
                            <option value="Residential Interiors">Residential Interiors</option>
                            <option value="Commercial Spaces">Commercial Spaces</option>
                            <option value="Architecture">Architecture</option>
                            <option value="Web & UI Design">Web & UI Design</option>
                            <option value="Branding">Branding</option>
                        </select>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#999' }}>Project Link (Optional)</label>
                        <input name="projectLink" value={formData.projectLink} onChange={handleInputChange} style={{ padding: '12px', border: '1px solid #EAE6DF', fontFamily: 'sans-serif', fontSize: '0.9rem' }} placeholder="https://..." />
                    </div>
                </div>

                {/* ── Technologies & Description ── */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#999' }}>Technologies (Comma separated)</label>
                    <input name="technologies" value={formData.technologies} onChange={handleInputChange} style={{ padding: '12px', border: '1px solid #EAE6DF', fontFamily: 'sans-serif', fontSize: '0.9rem' }} placeholder="AutoCAD, SketchUp, Figma, Next.js..." />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#999' }}>Detailed Description *</label>
                    <textarea name="description" value={formData.description} onChange={handleInputChange} required rows={5} style={{ padding: '12px', border: '1px solid #EAE6DF', fontFamily: 'sans-serif', fontSize: '0.9rem', resize: 'vertical' }} placeholder="Describe the project..." />
                </div>

                {/* ── IMAGE UPLOADS ── */}
                <div style={{ borderTop: '1px solid #EAE6DF', marginTop: '10px', paddingTop: '20px' }}>
                    <h3 style={{ fontFamily: 'var(--font-primary, serif)', fontSize: '1.4rem', color: '#2D2926', marginBottom: '16px' }}>Media Uploads</h3>

                    {/* Cover Image */}
                    <div style={{ marginBottom: '24px' }}>
                        <label style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#999', display: 'block', marginBottom: '8px' }}>Cover Image (1 File) *</label>
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
                            <label style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '140px', height: '140px', background: '#F9F7F2', border: '1px dashed #ccc', transition: 'all 0.2s' }}>
                                <UploadCloud size={24} color="#31275c" style={{ marginBottom: '8px' }} />
                                <span style={{ fontSize: '0.7rem', color: '#999' }}>Upload Cover</span>
                                <input type="file" accept="image/*" onChange={handleCoverChange} style={{ display: 'none' }} />
                            </label>
                            {coverPreview && (
                                <div style={{ width: '140px', height: '140px', position: 'relative', border: '1px solid #EAE6DF' }}>
                                    <img src={coverPreview} alt="Cover Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Gallery Images */}
                    <div>
                        <label style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#999', display: 'block', marginBottom: '8px' }}>Gallery Images (4 to 8 Files) *</label>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                            <label style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100px', height: '100px', background: '#F9F7F2', border: '1px dashed #ccc' }}>
                                <ImageIcon size={20} color="#31275c" style={{ marginBottom: '8px' }} />
                                <span style={{ fontSize: '0.65rem', color: '#999' }}>Add Images</span>
                                <input type="file" accept="image/*" multiple onChange={handleGalleryChange} style={{ display: 'none' }} />
                            </label>

                            <AnimatePresence>
                                {galleryPreviews.map((preview, idx) => (
                                    <motion.div key={preview} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} style={{ width: '100px', height: '100px', position: 'relative', border: '1px solid #EAE6DF' }}>
                                        <img src={preview} alt="Gallery Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        <button type="button" onClick={() => removeGalleryImage(idx)} style={{ position: 'absolute', top: '4px', right: '4px', background: 'rgba(0,0,0,0.5)', color: 'white', border: 'none', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                            <X size={12} />
                                        </button>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

                {/* ── SUBMIT BUTTON ── */}
                <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end', gap: '16px' }}>
                    <button type="button" onClick={onCancel} disabled={loading} style={{ padding: '12px 24px', background: 'transparent', border: '1px solid #EAE6DF', fontFamily: 'sans-serif', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', cursor: 'pointer' }}>Cancel</button>
                    <button type="submit" disabled={loading} style={{ padding: '12px 32px', background: '#31275c', color: 'white', border: 'none', fontFamily: 'sans-serif', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1 }}>
                        {loading ? 'Saving...' : (initialData ? 'Update Project' : 'Publish Project')}
                    </button>
                </div>
            </form>
        </motion.div>
    );
}
