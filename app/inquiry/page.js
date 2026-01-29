'use client';

import { useState } from "react";

export default function Inquiry() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        location: "",
        message: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
        alert("Thank you for your inquiry. We will be in touch shortly.");
        setFormData({ name: "", email: "", location: "", message: "" });
    };

    return (
        <section style={styles.container}>
            <h1 style={styles.title}>Inquiry</h1>

            <div style={styles.contentWrapper}>
                {/* Form Section */}
                <div style={styles.formSection}>
                    <h2 style={styles.subtitle}>Get in Touch</h2>
                    <form onSubmit={handleSubmit} style={styles.form}>
                        <div style={styles.formGroup}>
                            <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                style={styles.input}
                            />
                        </div>

                        <div style={styles.formGroup}>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                style={styles.input}
                            />
                        </div>

                        <div style={styles.formGroup}>
                            <input
                                type="text"
                                name="location"
                                placeholder="Project Location"
                                value={formData.location}
                                onChange={handleChange}
                                style={styles.input}
                            />
                        </div>

                        <div style={styles.formGroup}>
                            <textarea
                                name="message"
                                placeholder="Message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows={8}
                                style={styles.textarea}
                            />
                        </div>

                        <button type="submit" style={styles.submitBtn}>
                            Send Inquiry
                        </button>
                    </form>
                </div>

                {/* Map Section */}
                <div style={styles.mapSection}>
                    <h2 style={styles.subtitle}>Visit Us</h2>
                    <div style={styles.mapContainer}>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.1234567890!2d-74.0060!3d40.7128!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a20a8c2a8a1%3A0x123456789!2sDesign%20Theory%20Studio!5e0!3m2!1sen!2sus!4v1234567890"
                            width="100%"
                            height="400"
                            style={{ border: 0, filter: "grayscale(1)" }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                        <div style={styles.contactInfo}>
                            <p>
                                <strong>Design Theory Studio</strong>
                            </p>
                            <p>New York, NY 10001</p>
                            <p>hello@designtheory.com</p>
                            <p>+1 (555) 123-4567</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

const styles = {
    container: {
        padding: "120px 60px",
        backgroundColor: "#F9F8F6",
    },
    title: {
        fontSize: "4rem",
        margin: "0 auto 80px auto",
        maxWidth
            : "1200px",

    },
    contentWrapper: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "120px",
        maxWidth: "1200px",
        margin: "0 auto",
    },
    formSection: {
        minWidth: 0,
    },
    mapSection: {
        minWidth: 0,
    },
    subtitle: {
        fontSize: "1.8rem",
        marginBottom: "40px",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "30px",
    },
    formGroup: {
        display: "flex",
        flexDirection: "column",
    },
    input: {
        background: "transparent",
        border: "none",
        borderBottom: "1px solid #333",
        padding: "12px 0",
        fontSize: "14px",
        letterSpacing: "0.05em",
        fontFamily: "'Montserrat', sans-serif",
        outline: "none",
        transition: "border-color 0.3s ease",
    },
    textarea: {
        background: "transparent",
        border: "none",
        borderBottom: "1px solid #333",
        padding: "12px 0",
        fontSize: "14px",
        letterSpacing: "0.05em",
        fontFamily: "'Montserrat', sans-serif",
        outline: "none",
        resize: "none",
        transition: "border-color 0.3s ease",
    },
    submitBtn: {
        background: "none",
        border: "1px solid #333",
        padding: "15px 0",
        cursor: "pointer",
        fontSize: "12px",
        letterSpacing: "0.15em",
        textTransform: "uppercase",
        transition: "all 0.8s ease-in-out",
        marginTop: "20px",
    },
    mapContainer: {
        overflow: "hidden",
        borderRadius: "4px",
    },
    contactInfo: {
        marginTop: "30px",
        fontSize: "14px",
        lineHeight: 1.8,
        textTransform: "none",
        letterSpacing: "normal",
    },
};
