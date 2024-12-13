
import * as Yup from 'yup';

const passwordRules= /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
export const loginSchema = Yup.object().shape({
    email: Yup.string().email('please enter valid email address').required("This field is required"),
    password:Yup.string().min(8,"Minimum 8 params required").matches(passwordRules,"Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character").required("This field is required"),
})

export const registerSchema = Yup.object().shape({
    email: Yup.string().email('please enter valid email address').required("This field is required"),
    password:Yup.string().min(8,"Minimum 8 params required").matches(passwordRules,"Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character").required("This field is required"),
    userName:Yup.string().min(3,"Minimum 3 params required").required("This field is required"),
})