import AuthTabLayout from "../../layouts/AuthTabLayout";
import AuthSignIn from "../../components/AuthSignIn";
import type { NextPage } from "next";

const SignIn: NextPage = () => {
  return (
    <AuthTabLayout tabIndex={0}>
      <AuthSignIn />
    </AuthTabLayout>
  );
};

export default SignIn;
