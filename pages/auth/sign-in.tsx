import type { NextPage } from "next";
import AuthLayout from "../../layouts/AuthLayout";
import AuthSignIn from "../../components/AuthSignIn";

const SignIn: NextPage = () => {
  return (
    <AuthLayout index={0}>
      <AuthSignIn />
    </AuthLayout>
  );
};

export default SignIn;
