import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useState } from "react";
import Layout from "@/components/Layout";
import { useNavigate } from "react-router-dom";
import { personal_info } from "@/service/ApiService";
// Define the form values interface
interface FormValues {
  surname: string;
  middleName: string;
  firstName: string;
  nationality: string;
  dateOfBirth: string;
  placeOfBirth: string;
  postAppliedFor: string;
  willingToAcceptLowerRank: string;
  availableFromDate: string;
  educationQualification: string; // Added field
  bloodGroup: string; // Added field
  photo: File | null; // Type for file
}

const PersonalInfoForms: React.FC = () => {
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null); // Store the preview URL
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  // Define the form validation schema using Yup
  const validationSchema = Yup.object({
    surname: Yup.string()
      .max(20, "Must be 20 characters or less")
      .required("Surname is required"),
    middleName: Yup.string().max(20, "Must be 20 characters or less"),
    firstName: Yup.string()
      .max(15, "Must be 15 characters or less")
      .required("First Name is required"),
    nationality: Yup.string().required("Nationality is required"),
    dateOfBirth: Yup.date()
      .max(new Date(), "Date of birth cannot be in the future")
      .required("Date of birth is required"),
    placeOfBirth: Yup.string().required("Place of birth is required"),
    postAppliedFor: Yup.string().required("Post applied for is required"),
    willingToAcceptLowerRank: Yup.string()
      .oneOf(["yes", "no"], "Please select Yes or No")
      .required("This field is required"),
    availableFromDate: Yup.date()
      .min(new Date(), "Available from date cannot be in the past")
      .required("Available from date is required"),
    educationQualification: Yup.string().required(
      "Education Qualification is required"
    ), // Added validation
    bloodGroup: Yup.string()
      .oneOf(
        ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
        "Invalid blood group"
      )
      .required("Blood group is required"), // Added validation
    photo: Yup.mixed().required("Photo is required"), // Validate that a file is selected
  });

  // Initialize Formik with initial values and validation schema
  const formik = useFormik({
    initialValues: {
      surname: "",
      middleName: "",
      firstName: "",
      nationality: "",
      dateOfBirth: "",
      placeOfBirth: "",
      postAppliedFor: "",
      willingToAcceptLowerRank: "",
      availableFromDate: "",
      educationQualification: "",
      bloodGroup: "",
      photo: null, // Initialize photo as null
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true); // Start loading
      const body = {
        surname: values.surname,
        middle_name: values.middleName, // Adjusted to match form values
        first_name: values.firstName, // Adjusted to match form values
        nationality: values.nationality,
        date_of_birth: values.dateOfBirth,
        place_of_birth: values.placeOfBirth,
        post_applied_for: values.postAppliedFor,
        willing_to_accept_lower_rank: values.willingToAcceptLowerRank,
        available_from_date: values.availableFromDate,
        education_qualification: values.educationQualification,
        blood_group: values.bloodGroup,
        photo: photoPreview ? photoPreview : "",// Use photo name or leave empty if not uploaded
      };

      try {
        const response = await personal_info(body);
        if (response) {
          console.log("API Response:", response);
          navigate("/passport-form");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        // Handle error (e.g., show a notification)
      } finally {
        setIsLoading(false); // End loading
      }
    },
  });

  // Handle file selection
  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Optional chaining in case no file is selected
    if (file) {
      setPhoto(file); // Update state with the selected file
      setPhotoPreview(URL.createObjectURL(file)); // Create and set the image preview URL
      formik.setFieldValue("photo", file); // Set the file in Formik
    }
  };

  // Trigger the hidden file input when the button is clicked
  const handleClick = () => {
    const fileInput = document.getElementById("photo") as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  };

  return (
    <Layout>
      <div className="max-w-[50%] mx-auto h-[35vh]">
        <h1 className="text-2xl font-bold mb-4">Personal Info Form</h1>
        <form
          className="p-3 bg-gradient-to-tr from-teal-50 to-cyan-50 shadow-md rounded-lg"
          onSubmit={formik.handleSubmit}
        >
          <div className=" mb-4">
            <div className=" flex justify-center ">
              <div>
                {" "}
                {photoPreview && (
                  <div>
                    {/* Display the photo preview */}
                    <img
                      src={photoPreview}
                      alt="Preview"
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                        borderRadius: "5px",
                        marginTop: "10px",
                      }}
                    />
                  </div>
                )}
                {!photoPreview && (
                  <label className="block font-medium mb-1">Upload Photo</label>
                )}
                <button
                  type="button"
                  onClick={handleClick}
                  style={{
                    marginBottom: "10px",
                    backgroundColor: "lightblue",
                    padding: "8px",
                    borderRadius: "5px",
                  }}
                  className="mx-auto my-1 w-[100px]"
                >
                  Choose File
                </button>
                <input
                  id="photo"
                  name="photo"
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }} // Hide the file input
                  onChange={handlePhotoChange}
                />
                {formik.touched.photo && formik.errors.photo ? (
                  <div style={{ color: "red" }}>{formik.errors.photo}</div>
                ) : null}
              </div>
            </div>
          </div>
          <div className="flex justify-between gap-4 mb-4">
            <div className="flex-1">
              <label htmlFor="surname" className="block font-medium mb-1">
                Surname
              </label>
              <input
                id="surname"
                name="surname"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.surname}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
              {formik.touched.surname && formik.errors.surname ? (
                <div className="text-red-500">{formik.errors.surname}</div>
              ) : null}
            </div>

            <div className="flex-1">
              <label htmlFor="middleName" className="block font-medium mb-1">
                Middle Name
              </label>
              <input
                id="middleName"
                name="middleName"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.middleName}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
              {formik.touched.middleName && formik.errors.middleName ? (
                <div className="text-red-500">{formik.errors.middleName}</div>
              ) : null}
            </div>

            <div className="flex-1">
              <label htmlFor="firstName" className="block font-medium mb-1">
                First Name
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.firstName}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
              {formik.touched.firstName && formik.errors.firstName ? (
                <div className="text-red-500">{formik.errors.firstName}</div>
              ) : null}
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="nationality" className="block font-medium mb-1">
              Nationality
            </label>
            <input
              id="nationality"
              name="nationality"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.nationality}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
            {formik.touched.nationality && formik.errors.nationality ? (
              <div className="text-red-500">{formik.errors.nationality}</div>
            ) : null}
          </div>
          <div className="flex justify-between gap-4 mb-4">
            <div className="flex-1">
              <label htmlFor="dateOfBirth" className="block font-medium mb-1">
                Date of Birth
              </label>
              <input
                id="dateOfBirth"
                name="dateOfBirth"
                type="date"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.dateOfBirth}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
              {formik.touched.dateOfBirth && formik.errors.dateOfBirth ? (
                <div className="text-red-500">{formik.errors.dateOfBirth}</div>
              ) : null}
            </div>
            <div className="flex-1">
              <label htmlFor="placeOfBirth" className="block font-medium mb-1">
                Place of Birth
              </label>
              <input
                id="placeOfBirth"
                name="placeOfBirth"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.placeOfBirth}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
              {formik.touched.placeOfBirth && formik.errors.placeOfBirth ? (
                <div className="text-red-500">{formik.errors.placeOfBirth}</div>
              ) : null}
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="postAppliedFor" className="block font-medium mb-1">
              Post Applied For
            </label>
            <input
              id="postAppliedFor"
              name="postAppliedFor"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.postAppliedFor}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
            {formik.touched.postAppliedFor && formik.errors.postAppliedFor ? (
              <div className="text-red-500">{formik.errors.postAppliedFor}</div>
            ) : null}
          </div>
          <div className="flex justify-between gap-4 mb-2">
            <div className="flex-1 ">
              <label
                htmlFor="willingToAcceptLowerRank"
                className="block font-medium mb-1"
              >
                Willing to accept lower rank?
              </label>
              <select
                id="willingToAcceptLowerRank"
                name="willingToAcceptLowerRank"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.willingToAcceptLowerRank}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="">Select...</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
              {formik.touched.willingToAcceptLowerRank &&
              formik.errors.willingToAcceptLowerRank ? (
                <div className="text-red-500">
                  {formik.errors.willingToAcceptLowerRank}
                </div>
              ) : null}
            </div>
            <div className="flex-1 ">
              <label
                htmlFor="availableFromDate"
                className="block font-medium mb-1"
              >
                Available From
              </label>
              <input
                id="availableFromDate"
                name="availableFromDate"
                type="date"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.availableFromDate}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
              {formik.touched.availableFromDate &&
              formik.errors.availableFromDate ? (
                <div className="text-red-500">
                  {formik.errors.availableFromDate}
                </div>
              ) : null}
            </div>
          </div>
          <div className="flex justify-between gap-4">
            {" "}
            {/* Education Qualification */}
            <div className=" flex-1 mb-4">
              <label
                htmlFor="educationQualification"
                className="block font-medium mb-1"
              >
                Education Qualification
              </label>
              <input
                id="educationQualification"
                name="educationQualification"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.educationQualification}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
              {formik.touched.educationQualification &&
              formik.errors.educationQualification ? (
                <div className="text-red-500">
                  {formik.errors.educationQualification}
                </div>
              ) : null}
            </div>
            {/* Blood Group */}
            <div className=" flex-1 mb-4">
              <label htmlFor="bloodGroup" className="block font-medium mb-1">
                Blood Group
              </label>
              <select
                id="bloodGroup"
                name="bloodGroup"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.bloodGroup}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="" disabled>
                  Select
                </option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
              {formik.touched.bloodGroup && formik.errors.bloodGroup ? (
                <div className="text-red-500">{formik.errors.bloodGroup}</div>
              ) : null}
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Submitting..." : "Save & Next: Passport Form"}
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default PersonalInfoForms;
