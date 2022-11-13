import { FC } from "react";

interface Props {
  title: string;
  columns: string[];
}

const WizardStepEightSectionLayout: FC<Props> = ({ title, columns }) => {
  return (
    <div className="flex flex-col gap-2 items-center p-3 rounded-lg bg-cloud-burst shadow-lg shadow-cloud-burst/50">
      <h2 className="text-white font-light text-lg">{title}</h2>
      {columns.map((column) => (
        <h3
          key={column}
          className="bg-whisper px-2 w-full text-center text-lg rounded-xl text-cerulean"
        >
          {column}
        </h3>
      ))}
    </div>
  );
};

export default WizardStepEightSectionLayout;
