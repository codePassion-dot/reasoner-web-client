import { FC } from "react";
import AuthTab from "../components/AuthTab";

interface Props {
  children: React.ReactNode;
  tabIndex?: number;
}

const AuthTabLayout: FC<Props> = ({ children, tabIndex }) => {
  return (
    <div className="grid place-items-center h-screen bg-no-repeat bg-cover bg-default">
      <div className="rounded-2xl 3xl:w-1/4 4xl:w-1/5 shadow-3xl shadow-white/50">
        <AuthTab tabIndex={tabIndex}>
          {children}
        </AuthTab>
      </div>
    </div>
  );
};

export default AuthTabLayout;
