import * as yup from 'yup';

export const validationSchema = yup.object({
  startPoint: yup.string().required('Start Point is required'),
  endPoint: yup.string().required('End Point is required'),
  zipCodes: yup
    .array()
    .of(yup.number())
    .min(2, 'Atleast start and end zipcodes should be specified'),
  days: yup.array().required().min(1, 'Route needs to be used atleast 1 day'),
  maxSharingAllowed: yup.number().required('This is required').min(1).max(5),
});
