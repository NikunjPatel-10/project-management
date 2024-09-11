import * as Yup from "yup";
/**
 * @description Form Validations
 */
const loginFormSchema = Yup.object().shape({
  email: Yup.string().required("Email is required").email(),
  password: Yup.string().required("Password is required"),
});

export default loginFormSchema;
