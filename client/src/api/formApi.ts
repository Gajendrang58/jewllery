// src/api/formApi.ts
import axios from "axios";

export interface FormSubmissionPayload {
  name: string;
  email: string;
  mobile: string;
  message?: string;
    date: string; // <-- Add this
}
const baseUrl = import.meta.env.VITE_API_BASE_URL;
export const submitForm = async (payload: FormSubmissionPayload) => {
  const response = await axios.post(
    `${baseUrl}/forms`,
    payload,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};
