import { useEffect, useState } from "react";
import { useAppSelector } from "../hooks/redux";
import { selectUser } from "../store/selectors/users";
import { getResults } from "../utils/wizard";
import WizardStepEightSectionLayout from "./WizardStepEightSectionLayout";

const WizardStepEight = () => {
  const [sections, setSections] = useState({
    initialProblem: [""],
    umbral: [""],
    result: [""],
  });
  const user = useAppSelector(selectUser);
  useEffect(() => {
    const fetchSections = async () => {
      const sections = await getResults(user.accessToken);
      setSections(sections);
    };
    fetchSections();
  }, []);
  return (
    <div className="flex flex-row gap-4">
      <WizardStepEightSectionLayout
        title="Initial Problem"
        columns={sections.initialProblem}
      />

      <div className="flex flex-col gap-4">
        <WizardStepEightSectionLayout
          title="Acceptance Percentage"
          columns={sections.umbral}
        />
        <WizardStepEightSectionLayout
          title="Result"
          columns={sections.result}
        />
      </div>
    </div>
  );
};

export default WizardStepEight;
