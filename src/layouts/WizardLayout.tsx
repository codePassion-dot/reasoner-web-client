import { FC } from "react";

interface Props {
  children: React.ReactNode;
  title: string;
}

const WizardLayout: FC<Props> = ({ children, title }) => {
  return (
    <div className="grid place-items-center h-screen bg-no-repeat bg-cover bg-default">
      <div className="bg-cloud-burst px-14 py-20 rounded-2xl w-max shadow-3xl shadow-white/50">
        <div className="text-center py-10 px-4 pt-3 text-white text-2xl font-medium outline-none rounded-2xl bg-gradient-to-r from-denim to-cerulean">
          <div className="outline-none rounded-2xl bg-gradient-to-r from-denim to-cerulean mb-3">
            {title}
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default WizardLayout;
