export const validateContactForm = (formData) => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
        newErrors.email = "Please enter a valid email address";
    }

    const phoneRegex = /^\d{10}$/;
    if (!formData.phoneNumber || !phoneRegex.test(formData.phoneNumber.replace(/\s/g, ''))) {
        newErrors.phoneNumber = "Please enter a valid 10-digit phone number";
    }

    const validProjectTypes = [
        'residential', 'commercial', 'architecture',
        'renovation', 'visualization', 'turnkey', 'consultation',
    ];
    if (!formData.projectType || !validProjectTypes.includes(formData.projectType)) {
        newErrors.projectType = "Please select a valid project type";
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
        newErrors.message = "Message must be at least 10 characters";
    }

    return newErrors;
};
