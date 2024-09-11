import * as Yup from "yup";

export const taskFormValidationSchema = Yup.object().shape({
  name: Yup.string().required("Please enter task name"),
  category: Yup.string().required("Please select category"),
  billingType: Yup.string().required("Please select billing type"),
  description: Yup.string().required("Please enter task description"),
  status: Yup.string().required("Please select task status"),
});
