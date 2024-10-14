import Layout from "@/components/Layout";
import { useFormik } from "formik";
import * as Yup from "yup";
type Props = {};

interface PassportFormValues {
  passportNumber: string;
  dateOfIssue: string;
  placeOfIssue: string;
  expiryDate: string;
  ecnr: boolean;
  blankPages: number;
}

const validationSchema = Yup.object({
  passportNumber: Yup.string()
    .required("Passport number is required")
    .matches(
      /^[A-PR-WYa-pr-wy][1-9]\d\s?\d{4}[1-9]$/,
      "Invalid passport number"
    ),
  dateOfIssue: Yup.date().required("Date of issue is required"),
  placeOfIssue: Yup.string().required("Place of issue is required"),
  expiryDate: Yup.date()
    .min(Yup.ref("dateOfIssue"), "Expiry date must be after the date of issue")
    .required("Expiry date is required"),
  ecnr: Yup.boolean().required("ECNR status is required"),
  blankPages: Yup.number()
    .min(1, "There must be at least 1 blank page")
    .max(48, "Maximum 48 blank pages allowed")
    .required("Number of blank pages is required"),
});
const PassportForm = (props: Props) => {
  const formik = useFormik<PassportFormValues>({
    initialValues: {
      passportNumber: "",
      dateOfIssue: "",
      placeOfIssue: "",
      expiryDate: "",
      ecnr: false,
      blankPages: 1,
    },
    validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <Layout>
      <form
        onSubmit={formik.handleSubmit}
        className="max-w-xl mx-auto space-y-4 p-3 bg-gradient-to-tr from-teal-50 to-cyan-50 shadow-md rounded-lg"
      >
        <h1 className="text-3xl ">Passport information</h1>
        <div className="flex flex-col">
          <label htmlFor="passportNumber">Passport Number</label>
          <input
            id="passportNumber"
            name="passportNumber"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.passportNumber}
            className="border p-2 rounded"
          />
          {formik.touched.passportNumber && formik.errors.passportNumber ? (
            <div className="text-red-500">{formik.errors.passportNumber}</div>
          ) : null}
        </div>

        <div className="flex flex-col">
          <label htmlFor="dateOfIssue">Date of Issue</label>
          <input
            id="dateOfIssue"
            name="dateOfIssue"
            type="date"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.dateOfIssue}
            className="border p-2 rounded"
          />
          {formik.touched.dateOfIssue && formik.errors.dateOfIssue ? (
            <div className="text-red-500">{formik.errors.dateOfIssue}</div>
          ) : null}
        </div>

        <div className="flex flex-col">
          <label htmlFor="placeOfIssue">Place of Issue</label>
          <input
            id="placeOfIssue"
            name="placeOfIssue"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.placeOfIssue}
            className="border p-2 rounded"
          />
          {formik.touched.placeOfIssue && formik.errors.placeOfIssue ? (
            <div className="text-red-500">{formik.errors.placeOfIssue}</div>
          ) : null}
        </div>

        <div className="flex flex-col">
          <label htmlFor="expiryDate">Expiry Date</label>
          <input
            id="expiryDate"
            name="expiryDate"
            type="date"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.expiryDate}
            className="border p-2 rounded"
          />
          {formik.touched.expiryDate && formik.errors.expiryDate ? (
            <div className="text-red-500">{formik.errors.expiryDate}</div>
          ) : null}
        </div>

        <div>
          <label htmlFor="ecnr">ECNR Status</label>
          <input
            id="ecnr"
            name="ecnr"
            type="checkbox"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            checked={formik.values.ecnr}
            className="ml-2"
          />
          {formik.touched.ecnr && formik.errors.ecnr ? (
            <div className="text-red-500">{formik.errors.ecnr}</div>
          ) : null}
        </div>

        <div className="flex flex-col">
          <label htmlFor="blankPages">Number of Blank Pages</label>
          <input
            id="blankPages"
            name="blankPages"
            type="number"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.blankPages}
            className="border p-2 rounded"
          />
          {formik.touched.blankPages && formik.errors.blankPages ? (
            <div className="text-red-500">{formik.errors.blankPages}</div>
          ) : null}
        </div>

        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Save & Next
        </button>
      </form>
    </Layout>
  );
};

export default PassportForm;
