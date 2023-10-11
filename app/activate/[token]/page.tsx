"use client";

import axios from "axios";
import { useState, useEffect } from "react";

const ActivatePage = ({ params }: { params: { token: string } }) => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { token } = params;

  const activateAccount = async () => {
    try {
      const { data } = await axios.put("/api/auth/activate", { token });

      setSuccess(data);
    } catch (error) {
      setError((error as Error).message);
    }
  };

  useEffect(() => {
    activateAccount();
  }, [token]);

  return (
    <div>
      {error && (
        <div>
          <p>{error}</p>
          <button>Sign in</button>
        </div>
      )}
      {success && (
        <div>
          <p>{success}</p>
          <button>Sign in</button>
        </div>
      )}
    </div>
  );
};

export default ActivatePage;
