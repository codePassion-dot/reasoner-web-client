import type { NextPage } from "next";
import AuthPasswordReset from "../../../components/AuthPasswordReset";
import AuthHeaderLayout from "../../../layouts/AuthHeaderLayout";

const PasswordReset: NextPage = () => {
  return (
    <AuthHeaderLayout title="Password Reset">
      <AuthPasswordReset />
    </AuthHeaderLayout>
  );
};

export default PasswordReset;
