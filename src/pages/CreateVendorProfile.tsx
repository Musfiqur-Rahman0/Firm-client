import { useState } from "react";
import { vendorApi } from "../api/services/apis";
import { toast } from "sonner";

interface FarmFormData {
  farmName: string;
  farmLocation: string;
  farmDescription: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
}

export default function CreateVendorProfile() {
  const [formData, setFormData] = useState<FarmFormData>({
    farmName: "",
    farmLocation: "",
    farmDescription: "",
  });

  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [errors, setErrors] = useState<Partial<FarmFormData>>({});

  const validate = (): boolean => {
    const newErrors: Partial<FarmFormData> = {};
    if (!formData.farmName.trim())
      newErrors.farmName = "Farm name is required.";
    if (!formData.farmLocation.trim())
      newErrors.farmLocation = "Farm location is required.";
    if (!formData.farmDescription.trim())
      newErrors.farmDescription = "Farm description is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setResponse(null);

    try {
      const res = await vendorApi.createProfile(formData);

      setResponse({ success: true, message: "Farm created successfully!" });
      setFormData({ farmName: "", farmLocation: "", farmDescription: "" });
      toast.success("Farm created successfully!");
    } catch (error) {
      setResponse({
        success: false,
        message: "Something went wrong. Please try again.",
      });

      toast.error(error?.message || "Failed to create farm.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-6">
      <div className="w-full max-w-xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-green-600 rounded-2xl mb-4 shadow-lg">
            <svg
              className="w-7 h-7 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.8}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 10l9-7 9 7v10a2 2 0 01-2 2H5a2 2 0 01-2-2V10z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 21V12h6v9"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
            Create a Farm
          </h1>
          <p className="text-gray-500 mt-1 text-sm">
            Fill in the details below to register your farm.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-xl shadow-green-100 border border-green-100 p-8 space-y-6">
          {/* Farm Name */}
          <div className="space-y-1.5">
            <label
              htmlFor="farmName"
              className="block text-sm font-semibold text-gray-700"
            >
              Farm Name
            </label>
            <input
              id="farmName"
              name="farmName"
              type="text"
              value={formData.farmName}
              onChange={handleChange}
              placeholder="e.g. Green Valley Farm"
              className={`w-full px-4 py-3 rounded-xl border text-sm text-gray-800 placeholder-gray-400 bg-gray-50 focus:bg-white transition-all outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                errors.farmName
                  ? "border-red-400 ring-2 ring-red-200"
                  : "border-gray-200"
              }`}
            />
            {errors.farmName && (
              <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                <svg
                  className="w-3.5 h-3.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10A8 8 0 11 2 10a8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                {errors.farmName}
              </p>
            )}
          </div>

          {/* Farm Location */}
          <div className="space-y-1.5">
            <label
              htmlFor="farmLocation"
              className="block text-sm font-semibold text-gray-700"
            >
              Farm Location
            </label>
            <input
              id="farmLocation"
              name="farmLocation"
              type="text"
              value={formData.farmLocation}
              onChange={handleChange}
              placeholder="e.g. Dhaka, Bangladesh"
              className={`w-full px-4 py-3 rounded-xl border text-sm text-gray-800 placeholder-gray-400 bg-gray-50 focus:bg-white transition-all outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                errors.farmLocation
                  ? "border-red-400 ring-2 ring-red-200"
                  : "border-gray-200"
              }`}
            />
            {errors.farmLocation && (
              <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                <svg
                  className="w-3.5 h-3.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10A8 8 0 11 2 10a8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                {errors.farmLocation}
              </p>
            )}
          </div>

          {/* Farm Description */}
          <div className="space-y-1.5">
            <label
              htmlFor="farmDescription"
              className="block text-sm font-semibold text-gray-700"
            >
              Farm Description
            </label>
            <textarea
              id="farmDescription"
              name="farmDescription"
              rows={4}
              value={formData.farmDescription}
              onChange={handleChange}
              placeholder="Describe your farm — its produce, size, or anything relevant..."
              className={`w-full px-4 py-3 rounded-xl border text-sm text-gray-800 placeholder-gray-400 bg-gray-50 focus:bg-white transition-all outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-none ${
                errors.farmDescription
                  ? "border-red-400 ring-2 ring-red-200"
                  : "border-gray-200"
              }`}
            />
            {errors.farmDescription && (
              <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                <svg
                  className="w-3.5 h-3.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10A8 8 0 11 2 10a8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                {errors.farmDescription}
              </p>
            )}
          </div>

          {/* Note about userId */}
          <p className="text-xs text-gray-400 bg-gray-50 rounded-lg px-3 py-2 border border-dashed border-gray-200">
            🔒 Your user ID is securely attached server-side from your session —
            no need to include it here.
          </p>

          {/* API Response Feedback */}
          {response && (
            <div
              className={`flex items-start gap-3 px-4 py-3 rounded-xl text-sm font-medium border ${
                response.success
                  ? "bg-green-50 border-green-200 text-green-700"
                  : "bg-red-50 border-red-200 text-red-600"
              }`}
            >
              <span className="text-base leading-none mt-0.5">
                {response.success ? "✅" : "❌"}
              </span>
              {response.message}
            </div>
          )}

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full py-3.5 bg-green-600 hover:bg-green-700 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-xl transition-all duration-150 shadow-md shadow-green-200 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg
                  className="w-4 h-4 animate-spin"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  />
                </svg>
                Creating Farm...
              </>
            ) : (
              <>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Create Farm
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
