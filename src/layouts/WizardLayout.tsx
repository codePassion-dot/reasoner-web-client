import { ButtonHTMLAttributes, FC } from "react";
import { BiChevronLeftCircle, BiChevronRightCircle } from "react-icons/bi";
import { STEP_NAMES } from "../constants/wizard";
import { classNames } from "../utils/common";

interface Props {
  children: React.ReactNode;
  step: string;
  idxActiveStep: number;
  handlePrev: () => void;
}

const WizardLayout: FC<Props> = ({
  children,
  step,
  idxActiveStep,
  handlePrev,
}) => {
  const icons: {
    icon: JSX.Element;
    type: ButtonHTMLAttributes<HTMLButtonElement>["type"];
    onClick?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
  }[] = [
    {
      icon: <BiChevronRightCircle className="text-whisper h-10 w-10" />,
      type: "submit",
    },
  ];
  if (idxActiveStep > 0) {
    icons.unshift({
      icon: <BiChevronLeftCircle className="text-whisper h-10 w-10" />,
      type: "button",
      onClick: handlePrev,
    });
  }
  return (
    <div className="grid place-items-center h-screen bg-no-repeat bg-cover bg-default">
      <div className="bg-cloud-burst px-14 pt-20 pb-5 rounded-3xl w-max shadow-3xl shadow-white/50">
        <div className="text-center py-10 px-4 pt-3 text-white text-2xl font-medium outline-none rounded-2xl bg-gradient-to-r from-denim to-cerulean">
          <div className="outline-none rounded-2xl bg-gradient-to-r from-denim to-cerulean mb-3">
            {STEP_NAMES[step]}
          </div>
          {children}
        </div>
        <div
          className={classNames(
            "flex flex-row w-full mt-5",
            idxActiveStep === 0 ? "justify-end" : "justify-between"
          )}
        >
          {icons.map(({ icon, type, onClick }, idx) => (
            <button type={type} onClick={onClick} form="wizard" key={idx}>
              {icon}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WizardLayout;
