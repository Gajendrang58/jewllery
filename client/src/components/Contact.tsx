import { Phone, MapPin, Clock } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import { submitForm } from "../api/formApi";
import { getFormattedDateString } from "../utils/dateFormater";

interface FormData {
  name: string;
  email: string;
  mobile: string;
  message: string;
  date:string;
}

const Contact = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    mobile: "",
    message: "",
     date: "", // <-- Add this
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const validateForm = (): boolean => {
    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedMobile = formData.mobile.trim();

    if (!trimmedName) {
      toast.error("Name is required");
      return false;
    }

    if (!trimmedEmail) {
      toast.error("Email is required");
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      toast.error("Please enter a valid email address");
      return false;
    }

    if (!trimmedMobile) {
      toast.error("Phone number is required");
      return false;
    }

    if (!/^\d{10,15}$/.test(trimmedMobile)) {
      toast.error("Phone number must be 10 to 15 digits");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;
const parsedDate = getFormattedDateString();
    const cleanedData: FormData = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      mobile: formData.mobile.trim(),
      message: formData.message.trim(),
       date: parsedDate,
    };

    try {
      setIsSubmitting(true);
      const response = await submitForm(cleanedData);

      console.log("API Response:", response); // Debug

      if (response.success) {
        toast.success("Message sent successfully!");
        setFormData({
          name: "",
          email: "",
          mobile: "",
          message: "",
          date:""
        });
      } else {
        toast.error(response.message || "Submission failed. Please try again.");
      }
    } catch (error: any) {
      console.error("Submission error:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Submission failed. Please try again later.";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      <div className="w-full bg-neutral-300 h-48 flex items-center justify-center">
        <div className="max-w-6xl w-full px-8">
          <h1 className="text-4xl font-bold text-white">Contact Us</h1>
          <p className="text-white mt-2">We'd love to hear from you</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-8 -mt-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left: Contact Info */}
          <div className="bg-gray-50 p-8 rounded-lg shadow-sm">
            <div className="space-y-8">
              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="bg-neutral-100 p-3 rounded-full">
                  <Phone className="text-neutral-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800 text-lg mb-2">
                    CALL US
                  </h3>
                  <p className="text-gray-600">1 (234) 567-891</p>
                  <p className="text-gray-600">1 (234) 987-654</p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-4">
                <div className="bg-neutral-100 p-3 rounded-full">
                  <MapPin className="text-neutral-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800 text-lg mb-2">
                    LOCATION
                  </h3>
                  <p className="text-gray-600">121 Rock Street</p>
                  <p className="text-gray-600">21 Avenue</p>
                  <p className="text-gray-600">New York, NY 92103-9000</p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-4">
                <div className="bg-neutral-100 p-3 rounded-full">
                  <Clock className="text-neutral-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800 text-lg mb-2">
                    BUSINESS HOURS
                  </h3>
                  <p className="text-gray-600">Mon - Fri ..... 10 am - 8 pm</p>
                  <p className="text-gray-600">Sat, Sun ..... Closed</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">
              Get in touch
            </h2>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Enter your Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Your Name"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Enter a valid email address
                </label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Your Email"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="mobile"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Mobile Number
                </label>
                <div className="flex rounded-md shadow-sm">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-100 text-gray-700 text-sm">
                    +91
                  </span>
                  <input
                    id="mobile"
                    type="tel"
                    maxLength={10}
                    value={formData.mobile}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-r-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter 10-digit mobile number"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Type your message here..."
                />
              </div>

              <button
                type="submit"
                className={`w-full ${
                  isSubmitting
                    ? "bg-gray-400"
                    : "bg-neutral-600 hover:bg-blue-700"
                } text-white font-medium py-3 px-4 rounded-md transition duration-200 text-lg`}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "SUBMIT"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
