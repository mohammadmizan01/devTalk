const validator = require("validator");

const validateSignUpData = (req) => {
    const { firstName, lastName, email, password} = req.body;

    if(!firstName || !lastName){
        throw new Error("Name is not valid");
    }
    if(!validator.isEmail(email)){
        throw new Error("email is not valid");
    }
    if(!validator.isStrongPassword(password)){
        throw new Error("Password is not valid");
    }
}
const validateEditProfileData = (req) => {
    const allowedEditFields = ["firstName", "lastName", "skills", "about"];

    const isEditAllowed = Object.keys(req.body).every((field) => allowedEditFields.includes(field));

return isEditAllowed;
};

const forgotPassword = (req) => {
    const allowedForgotPassword = ["password"];
    const isEditAllowed = Object.keys(req.body).every((field) => allowedForgotPassword.includes(field));
    return isEditAllowed;
}
module.exports={
    validateSignUpData,
    validateEditProfileData,
    forgotPassword,
}