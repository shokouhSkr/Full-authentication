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
          href={`/auth?tab=${path}`}
          className="text-blue-600 ml-1 hover:text-blue-700 hover:underline-offset-2 hover:underline"
        >
          {btnLabel}
        </Link>
      </p>
    </div>
  );
};

export default AuthHeader;
