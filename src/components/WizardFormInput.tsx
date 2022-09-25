import { FC } from "react";

interface Props {
  name: string;
  type: string;
  placeholder?: string;
  htmlFor: string;
  icon: React.ReactNode;
  isSubmitting: boolean;
}

const WizardFormInput: FC<Props> = (props) => {
  const { isSubmitting, ...rest } = props;
  return (
    <label
      htmlFor={props.htmlFor}
      className="flex flex-row text-xl font-medium"
    >
      <div className="flex flex-row gap-4 justify-start items-center py-1 pl-4 rounded-lg bg-cloud-burst shadow-lg shadow-cloud-burst/50">
        {props.icon}
        <input
          className="text-white rounded-xl outline-none bg-cloud-burst placeholder:text-slate-500 placeholder:text-base"
          placeholder={props.placeholder}
          {...rest}
          disabled={isSubmitting}
        />
      </div>
    </label>
  );
};

export default WizardFormInput;
