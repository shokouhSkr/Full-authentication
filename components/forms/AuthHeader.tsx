import Link from "next/link";

type AuthHeaderProps = {
  label: string;
  message: string;
  btnLabel: string;
  path?: string;
};

const AuthHeader = ({ label, message, btnLabel, path }: AuthHeaderProps) => {
  return (
    <div className="space-y-4 text-center">
      <h1 className="font-semibold text-4xl">{label}</h1>
      <p className="text-xl">
        {message}{" "}
        <Link
          href={path ? `/auth?tab=${path}` : "/auth"}
          className="text-[#4266B6] ml-1 hover:text-[#375597] hover:underline"
        >
          {btnLabel}
        </Link>
      </p>
    </div>
  );
};

export default AuthHeader;
