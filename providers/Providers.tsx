"use client";

import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      {children}
      <ToastContainer
        style={{ width: "400px" }}
        position="top-left"
        autoClose={2000}
        hideProgressBar
        theme="colored"
      />
    </SessionProvider>
  );
};

export default Providers;
