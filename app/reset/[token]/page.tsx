import Background from "@/components/background/Background";
import ResetForm from "@/components/forms/ResetForm";

const ResetPasswordPage = ({ params }: { params: { token: string } }) => {
  return (
    <div className="p-4 flex items-center justify-center min-h-[calc(100dvh)] md:mx-20">
      {/* FORMS */}
      <div className="flex flex-col items-center justify-center">
        <ResetForm token={params.token} />
      </div>

      {/* BACKGROUND */}
      <Background image="../../images/reset.png" />
    </div>
  );
};

export default ResetPasswordPage;
