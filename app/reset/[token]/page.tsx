import Background from "@/components/background/Background";
import ForgotForm from "@/components/forms/ForgotForm";

const ResetPasswordPage = () => {
  return (
    <div className="flex items-center justify-between p-4 lg:p-8">
      {/* FORMS */}
      <div className="flex flex-col items-center justify-center">
        reset
        <ForgotForm />
      </div>

      {/* BACKGROUND */}
      <Background image="../../images/reset.png" />
    </div>
  );
};

export default ResetPasswordPage;
