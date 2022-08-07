import AuthLayout from "../../layouts/AuthLayout";
import AuthSignUp from "../../components/AuthSignUp";
import { NextPage } from "next";

const SignUp: NextPage = () => {
  return (
    <AuthLayout index={1}>
      <AuthSignUp />
    </AuthLayout>
  );
};
export default SignUp;
