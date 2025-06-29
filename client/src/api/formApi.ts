// src/api/formApi.ts
import axios from "axios";

export interface FormSubmissionPayload {
  name: string;
  email: string;
  mobile: string;
  message?: string;
    date: string; // <-- Add this
}
export const submitForm = async (payload: FormSubmissionPayload) => {
  const response = await axios.post(
    `https://jeba-atthan-project.vercel.app/api/forms`,
    payload,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};
