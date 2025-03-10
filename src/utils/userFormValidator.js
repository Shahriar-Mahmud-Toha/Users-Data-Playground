const userFormValidator = ( formData ) => {
    //Demo Validation
    if (!formData.firstName.trim()) return "First name is required";
    if (!formData.email.includes("@")) return "Invalid email";
    return null;
};

export default userFormValidator;
