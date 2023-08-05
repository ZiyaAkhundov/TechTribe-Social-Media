import * as Yup from "yup";
 export const validation = Yup.object().shape({
    email: Yup.string()
    .min(5, 'Too Short!')
    .max(100, 'Too Long!')
    .required('Required'),
    password: Yup.string()
    .min(8, 'Too Short!')
    .max(80, "Too Long!")
    .required('Required')
})