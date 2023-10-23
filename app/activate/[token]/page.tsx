"use client";

import { useState, useEffect } from "react";
import Button from "@/components/buttons/Button";
import axios from "axios";

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
    <div className="p-4 flex items-center justify-center min-h-[calc(100dvh)]">
      {error && (
        <div>
          <p className="text-red-500 text-xl md:text-3xl mb-8 font-medium">{error}</p>
          <Button text="Sign in instead" />
        </div>
      )}
      {success && (
        <div>
          <p className="text-green-500 text-xl md:text-3xl mb-8 font-medium">{success}</p>
          <Button text="Sign in" />
        </div>
      )}
    </div>
  );
};

export default ActivatePage;
