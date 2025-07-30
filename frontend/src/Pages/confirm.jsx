// Confirm.jsx
import { useLocation, useNavigate } from "react-router-dom";

export default function Confirm() {
  const location = useLocation();
  const navigate = useNavigate();
  const formData = location.state;

  if (!formData) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-pink-50">
        <p className="text-gray-600 text-lg">No data to confirm. Please fill the form first.</p>
      </div>
    );
  }

  const handleConfirm = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/proposal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          initiatorName: formData.yourName,
          partnerName: formData.partnerName,
          partnerEmail: formData.partnerEmail,
          date: formData.date,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("✅ Proposal sent successfully!");
        navigate("/"); // or a success page
      } else {
        alert("❌ Error: " + data.message);
      }
    } catch (err) {
      alert("Network error!");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-pink-100 via-pink-200 to-pink-50 p-4">
      <div className="max-w-xl bg-white p-6 rounded-2xl shadow-xl text-center space-y-6">
        <h2 className="text-2xl font-semibold text-pink-600">Just One More Step 💞</h2>
        <p className="text-gray-700 italic">
          Are you ready to make this love your forever with{" "}
          <span className="text-pink-600 font-bold">{formData.partnerName}</span>?
        </p>

        <div className="flex gap-4 justify-center">
          <button
            onClick={handleConfirm}
            className="bg-pink-500 text-white px-6 py-2 rounded-xl font-semibold hover:bg-pink-600 transition"
          >
            Yes, I’m Ready 💍
          </button>
          <button
            onClick={() => navigate("/")}
            className="bg-gray-200 text-gray-700 px-6 py-2 rounded-xl hover:bg-gray-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
