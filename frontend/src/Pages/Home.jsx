import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    yourName: "",
    yourEmail: "",
    partnerName: "",
    partnerEmail: "",
    date: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.yourName.trim()) newErrors.yourName = "Required";
    if (!emailRegex.test(formData.yourEmail)) newErrors.yourEmail = "Invalid email";
    if (!formData.partnerName.trim()) newErrors.partnerName = "Required";
    if (!emailRegex.test(formData.partnerEmail)) newErrors.partnerEmail = "Invalid email";
    if (!formData.date) newErrors.date = "Select a date";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Navigate to confirmation page with formData
      navigate("/confirm", { state: formData });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 via-pink-200 to-pink-50 p-4">
      
      {/* 🌸 Romantic Heading Section */}
      <div className="text-center mb-6">
        <h2 className="text-4xl font-bold text-pink-600">Make A Proposal💍</h2>
        <p className="text-gray-600 text-lg italic mt-2">
          Ready to turn your love into a certified fairytale?
        </p>
      </div>

      {/* 💌 Form Section */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl p-6 rounded-2xl w-full max-w-md space-y-4"
      >
        {["yourName", "yourEmail", "partnerName", "partnerEmail"].map((field) => (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-600">
              {field.includes("your") ? "Your" : "Partner's"}{" "}
              {field.includes("Email") ? "Email" : "Name"}
            </label>
            <input
              type={field.includes("Email") ? "email" : "text"}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className="w-full p-2 mt-1 border rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
            {errors[field] && (
              <p className="text-red-500 text-sm">{errors[field]}</p>
            )}
          </div>
        ))}

        <div>
          <label className="block text-sm font-medium text-gray-600">
            Certificate Date
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full p-2 mt-1 border rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300"
          />
          {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-pink-500 text-white font-bold py-2 rounded-xl hover:bg-pink-600 transition"
        >
          Propose ❤️
        </button>
      </form>
    </div>
  );
}
