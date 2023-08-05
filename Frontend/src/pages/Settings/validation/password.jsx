import * as Yup from "yup";
 export const passwordValidation = Yup.object().shape({
    currentPassword: Yup.string()
    .min(8, 'Too Short!')
    .max(80, "Too Long!")
    .required('Required'),
    newPassword: Yup.string()
    .min(8, 'Too Short!')
    .max(80, "Too Long!")
    .required('Required'),
    repeatNewPassword: Yup.string()
    .min(8, 'Too Short!')
    .max(80, "Too Long!")
    .required('Required')
})