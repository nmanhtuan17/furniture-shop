import * as yup from 'yup'

export const authSchema = yup.object().shape({
  email: yup
    .string()
    .email()
    .required(),
  password: yup
    .string()
    .min(6, "Mật khẩu yêu cầu trên 6 kí tự")
    .required("Nhập mật khẩu")
});

export const signUpSchema = yup.object().shape({
  email: yup
    .string().email().required(),
  username: yup
    .string().required(),
  password: yup
    .string()
    .min(6, "Mật khẩu yêu cầu trên 6 kí tự")
    .required()
})