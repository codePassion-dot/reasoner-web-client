import type { NextPage } from "next";
import AuthPasswordRecovery from "../../components/AuthPasswordRecovery";
import AuthHeaderLayout from "../../layouts/AuthHeaderLayout";

const PasswordRecovery: NextPage = () => {
  return (
    <AuthHeaderLayout title="Password Recovery">
      <AuthPasswordRecovery />
    </AuthHeaderLayout>
  );
};

export default PasswordRecovery;
