import * as Yup from "yup";
 export const validationLogin = Yup.object().shape({
    username: Yup.string()
    .min(3, 'Too Short!')
    .max(100, 'Too Long!')
    .required('Required').test('is-uppercase', 'Username should not contain uppercase letters', (value) => {
        return value === value.toLowerCase();
      }),
    password: Yup.string()
    .min(8, 'Too Short!')
    .max(80, "Too Long!")
    .required('Required')
})

export const validationRegister = Yup.object().shape({
    email: Yup.string().email('Invalid email address')
    .min(5, 'Too Short!')
    .max(100, 'Too Long!')
    .required('Required').test('is-uppercase', 'Email should not contain uppercase letters', (value) => {
        return value === value.toLowerCase();
      }),
    username: Yup.string()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required').test('is-uppercase', 'Username should not contain uppercase letters', (value) => {
        return value === value.toLowerCase();
      }),
    password: Yup.string()
    .min(8, 'Too Short!')
    .max(80, "Too Long!")
    .required('Required')
})