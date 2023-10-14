"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const ActivatePage = ({ params }: { params: { token: string } }) => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();
  const { token } = params;

  const activateAccount = async () => {
    try {
      const { data: message } = await axios.put("/api/auth/activate", { token });

      setSuccess(message);
    } catch (error: any) {
      setError(error.response.data);
    }
  };

  useEffect(() => {
    activateAccount();
  }, [token]);

  return (
    <div className="p-4 flex items-center justify-center min-h-[calc(100dvh)]">
      {error && (
        <div>
          <p className="text-red-500 text-xl md:text-3xl mb-8 font-medium">{error}</p>
          <button
            className="bg-pink-600 px-4 py-1 rounded-md text-white hover:bg-pink-700 transition-all duration-300 active:scale-[0.98] tracking-wider uppercase"
            onClick={() => router.push("/")}
          >
            Sign In instead
          </button>
        </div>
      )}
      {success && (
        <div>
          <p className="text-green-500 text-xl md:text-3xl mb-8 font-medium">{success}</p>
          <button
            className="bg-pink-600 text-white px-4 py-1 rounded-md hover:bg-pink-700 transition-all duration-300 active:scale-[0.98] tracking-wider uppercase"
            onClick={() => router.push("/")}
          >
            Sign In
          </button>
        </div>
      )}
    </div>
  );
};

export default ActivatePage;
