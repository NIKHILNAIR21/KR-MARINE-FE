import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Layout from "@/components/Layout";

const SeamanBookForm: React.FC = () => {
  interface DocumentFields {
    number: string;
    dateOfIssue: string;
    placeOfIssue: string;
    expiryDate: string;
    remarks: string;
  }

  interface FormValues {
    indian: DocumentFields;
    honduras: DocumentFields;
    panamanian: DocumentFields;
    liberian: DocumentFields;
    indos: DocumentFields;
    sid: DocumentFields;
  }

  // Validation schema for each document type
  const validationSchema = Yup.object({
    indian: Yup.object({
      number: Yup.string().required("Required"),
      dateOfIssue: Yup.date().required("Required"),
      placeOfIssue: Yup.string().required("Required"),
      expiryDate: Yup.date().required("Required"),
      remarks: Yup.string(),
    }),

    honduras: Yup.object({
      number: Yup.string().required("Required"),
      dateOfIssue: Yup.date().required("Required"),
      placeOfIssue: Yup.string().required("Required"),
      expiryDate: Yup.date().required("Required"),
      remarks: Yup.string(),
    }),

    panamanian: Yup.object({
      number: Yup.string().required("Required"),
      dateOfIssue: Yup.date().required("Required"),
      placeOfIssue: Yup.string().required("Required"),
      expiryDate: Yup.date().required("Required"),
      remarks: Yup.string(),
    }),

    liberian: Yup.object({
      number: Yup.string().required("Required"),
      dateOfIssue: Yup.date().required("Required"),
      placeOfIssue: Yup.string().required("Required"),
      expiryDate: Yup.date().required("Required"),
      remarks: Yup.string(),
    }),

    indos: Yup.object({
      number: Yup.string().required("Required"),
      dateOfIssue: Yup.date().required("Required"),
      placeOfIssue: Yup.string().required("Required"),
      expiryDate: Yup.date().required("Required"),
      remarks: Yup.string(),
    }),

    sid: Yup.object({
      number: Yup.string().required("Required"),
      dateOfIssue: Yup.date().required("Required"),
      placeOfIssue: Yup.string().required("Required"),
      expiryDate: Yup.date().required("Required"),
      remarks: Yup.string(),
    }),
  });

  // Formik initialization
  const formik = useFormik<FormValues>({
    initialValues: {
      indian: {
        number: "",
        dateOfIssue: "",
        placeOfIssue: "",
        expiryDate: "",
        remarks: "",
      },
      honduras: {
        number: "",
        dateOfIssue: "",
        placeOfIssue: "",
        expiryDate: "",
        remarks: "",
      },
      panamanian: {
        number: "",
        dateOfIssue: "",
        placeOfIssue: "",
        expiryDate: "",
        remarks: "",
      },
      liberian: {
        number: "",
        dateOfIssue: "",
        placeOfIssue: "",
        expiryDate: "",
        remarks: "",
      },
      indos: {
        number: "",
        dateOfIssue: "",
        placeOfIssue: "",
        expiryDate: "",
        remarks: "",
      },
      sid: {
        number: "",
        dateOfIssue: "",
        placeOfIssue: "",
        expiryDate: "",
        remarks: "",
      },
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <Layout>
      <div className="max-w-[65%] mx-auto">
        <h1 className="text-2xl font-bold mb-6">Seaman's Book</h1>
        <form onSubmit={formik.handleSubmit} className="bg-sky-100 p-6 rounded">
          <div className="overflow-x-auto">
            <table className="min-w-full p-2">
              <thead>
                <tr className="bg-blue-600 text-white rounded-lg">
                  <th className="border border-gray-400 px-4 py-2 ">Origin</th>
                  <th className="border border-gray-400 px-4 py-2">Number</th>
                  <th className="border border-gray-400 px-4 py-2">
                    Date of Issue
                  </th>
                  <th className="border border-gray-400 px-4 py-2">
                    Place of Issue
                  </th>
                  <th className="border border-gray-400 px-4 py-2">
                    Expiry Date
                  </th>
                  <th className="border border-gray-400 px-4 py-2 ">Remarks</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {[
                  { field: "indian", label: "Indian" },
                  { field: "honduras", label: "Honduras" },
                  { field: "panamanian", label: "Panamanian" },
                  { field: "liberian", label: "Liberian" },
                  { field: "indos", label: "INDOS" },
                  { field: "sid", label: "SID" },
                ].map(({ field, label }) => (
                  <tr key={field}>
                    <td className="border border-gray-400 px-4 py-2">
                      {label}
                    </td>
                    <td className="border border-gray-400 px-4 py-3">
                      <input
                        type="text"
                        name={`${field}.number`}
                        placeholder="Number"
                        className="w-full p-2 border border-gray-300 rounded"
                        value={formik.values[field].number}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched[field]?.number &&
                        formik.errors[field]?.number && (
                          <div className="text-red-500">
                            {formik.errors[field]?.number}
                          </div>
                        )}
                    </td>
                    <td className="border border-gray-400 px-4 py-2">
                      <input
                        type="date"
                        name={`${field}.dateOfIssue`}
                        className="w-full p-2 border border-gray-300 rounded"
                        value={formik.values[field].dateOfIssue}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched[field]?.dateOfIssue &&
                        formik.errors[field]?.dateOfIssue && (
                          <div className="text-red-500">
                            {formik.errors[field]?.dateOfIssue}
                          </div>
                        )}
                    </td>
                    <td className="border border-gray-400 px-4 py-2">
                      <input
                        type="text"
                        name={`${field}.placeOfIssue`}
                        placeholder="Place of Issue"
                        className="w-full p-2 border border-gray-300 rounded"
                        value={formik.values[field].placeOfIssue}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched[field]?.placeOfIssue &&
                        formik.errors[field]?.placeOfIssue && (
                          <div className="text-red-500">
                            {formik.errors[field]?.placeOfIssue}
                          </div>
                        )}
                    </td>
                    <td className="border border-gray-400 px-4 py-2">
                      <input
                        type="date"
                        name={`${field}.expiryDate`}
                        className="w-full p-2 border border-gray-300 rounded"
                        value={formik.values[field].expiryDate}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched[field]?.expiryDate &&
                        formik.errors[field]?.expiryDate && (
                          <div className="text-red-500">
                            {formik.errors[field]?.expiryDate}
                          </div>
                        )}
                    </td>
                    <td className="border border-gray-400 px-4 py-2">
                      <input
                        type="text"
                        name={`${field}.remarks`}
                        placeholder="Remarks"
                        className="w-full p-2 border border-gray-300 rounded"
                        value={formik.values[field].remarks}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button
            type="submit"
            className="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Save & Next
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default SeamanBookForm;
