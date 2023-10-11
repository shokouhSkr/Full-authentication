"use client";

import axios from "axios";
import { signIn } from "next-auth/react";
import { useState, useEffect } from "react";

const ActivatePage = ({ params }: { params: { token: string } }) => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
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
    <div>
      {error && (
        <div className="h-[100dvh] flex flex-col items-center justify-center text-3xl font-medium gap-4">
          <p className="text-red-500">{error}</p>
          <button
            className="bg-pink-600 px-4 py-1 rounded-md text-white hover:bg-pink-700 transition-all duration-300 active:scale-[0.98] tracking-wider uppercase"
            onClick={() => signIn()}
          >
            Sign In instead
          </button>
        </div>
      )}
      {success && (
        <div className="h-[100dvh] flex flex-col items-center justify-center text-3xl font-medium gap-4">
          <p className="text-green-500">{success}</p>
          <button
            className="bg-pink-600 text-white px-4 py-1 rounded-md hover:bg-pink-700 transition-all duration-300 active:scale-[0.98] tracking-wider uppercase"
            onClick={() => signIn()}
          >
            Sign In
          </button>
        </div>
      )}
    </div>
  );
};

export default ActivatePage;
