import Background from "@/components/background/Background";
import ForgetForm from "@/components/forms/ForgotForm";

const ForgetPasswordPage = () => {
  return (
    <div className="p-4 flex items-center justify-center min-h-[calc(100dvh)] md:mx-20">
      {/* FORMS */}
      <div className="flex flex-col items-center justify-center">
        <ForgetForm />
      </div>

      {/* BACKGROUND */}
      <Background image="../../images/forgot.png" />
    </div>
  );
};

export default ForgetPasswordPage;
