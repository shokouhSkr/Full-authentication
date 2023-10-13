const Divider = () => {
  return (
    <div className="w-full flex items-center justify-between">
      <div className="w-full h-[1px] bg-gray-300" />
      <span className="text-sm uppercase mx-6 text-gray-400">or</span>
      <div className="w-full h-[1px] bg-gray-300" />
    </div>
  );
};

export default Divider;
