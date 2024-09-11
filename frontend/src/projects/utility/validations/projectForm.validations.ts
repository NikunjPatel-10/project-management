import * as Yup from "yup";
/**
 * @description Form Validations
 */
const projectFormValidationSchema = Yup.object().shape({
  projectName: Yup.string().required(" Please enter project name"),
  clientName: Yup.string().required("Please enter client name"),
  projectType: Yup.string().required("Please select project type"),
  status: Yup.string().required("Please select project status"),
  reportingManager: Yup.string().required("Please enter reporting manager"),
  description: Yup.string().required("Please enter project description"),
});

export default projectFormValidationSchema;
