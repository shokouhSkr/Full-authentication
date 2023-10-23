"use client";

import { useRouter } from "next/navigation";

const Button = ({ text }: { text: string }) => {
  const router = useRouter();

  return (
    <button
      className="bg-[#7289da] px-4 py-2 rounded-md text-white hover:bg-[#4d78d3] transition-all duration-300 active:scale-[0.98]"
      onClick={() => router.push("/")}
    >
      {text}
    </button>
  );
};

export default Button;
