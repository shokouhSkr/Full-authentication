type InputPropsType = {
  name: string;
  label: string;
  icon: React.ReactNode;
  placeholder: string;
  type: string;
};

const Input = ({ name, label, icon, placeholder, type }: InputPropsType) => {
  return (
    <div className="relative mt-1 rounded-md shadow-sm">
      <div className="pointer-event-none absolute left-0 inset-y-0 flex items-center pl-3">
        <span className="text-gray-500 text-sm">{icon}</span>
      </div>

      <input
        type={type}
        placeholder={placeholder}
        className="w-full py-2 pr-7 pl-8 block rounded-md border border-gray-300 outline-offset-2 outline-transparent focus:border-blue-500 focus:ring-blue-700 focus:ring-2 text-sm"
      />
    </div>
  );
};

export default Input;
