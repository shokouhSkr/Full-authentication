type SlideButtonProps = {
  type: "submit" | "reset" | "button";
  text: string;
  slide_text: string;
  icon: React.ReactNode;
  disabled: boolean;
};

const SlideButton = ({ type, text, slide_text, icon, disabled }: SlideButtonProps) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className="relative w-full inline-flex justify-center group items-center px-8 py-3 overflow-hidden font-medium transition duration-300 ease-out border-2 rounded-md bg-blue-500"
    >
      {disabled ? (
        <span className="text-white">loading...</span>
      ) : (
        <>
          <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-blue-600 group-hover:translate-x-0 ease-out">
            {icon} <span className="ml-1.5">{slide_text}</span>
          </span>

          <span className="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease-out">
            {text}
          </span>

          <span className="relative invisible">{text}</span>
        </>
      )}
    </button>
  );
};

export default SlideButton;
