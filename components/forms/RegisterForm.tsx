import { CiUser } from "react-icons/ci";
import Input from "../common/Input";

const RegisterForm = () => {
  return (
    <form>
      <div className="w-1/3">
        <Input
          name="first_name"
          label="First name"
          type="text"
          icon={<CiUser />}
          placeholder="example"
        />
      </div>
    </form>
  );
};

export default RegisterForm;
