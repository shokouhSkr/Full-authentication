import { IoAlertCircle } from "react-icons/io5";

type InputPropsType = {
  name: string;
  label: string;
  icon: React.ReactNode;
  placeholder: string;
  type: string;
  register: any;
  error: string | undefined;
  disabled: boolean;
};

const Input = ({
  name,
  label,
  icon,
  placeholder,
  type,
  register,
  error,
  disabled,
}: InputPropsType) => {
  return (
    <div className="mt-3 w-full">
      {/* LABEL */}
      <label htmlFor={name} className="text-gray-700">
        {label}
      </label>

      <div className="relative mt-1 rounded-md">
        {/* INPUT ICON */}
        <div className="absolute left-0 top-3 flex items-center pl-3">
          <span className="text-gray-500 text-sm">{icon}</span>
        </div>

        {/* INPUT */}
        <input
          type={type}
          id={name}
          className={`${
            error
              ? "border-red-600 focus:border-red-600 focus:ring-red-700"
              : "border-gray-300 focus:border-blue-500 focus:ring-blue-700"
          } w-full py-2 pr-7 pl-8 block rounded-md border outline-offset-2 outline-transparent focus:ring-2 text-sm`}
          placeholder={placeholder}
          {...register(name)}
        />

        {/* ERROR ICON */}
        {error && (
          <div className="fill-red-500 absolute right-2 top-[9px] text-xl">
            <IoAlertCircle fill="#ED4337" />
          </div>
        )}

        {/* ERROR MESSAGE */}
        {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
      </div>
    </div>
  );
};

export default Input;
