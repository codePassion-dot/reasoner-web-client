import { useEffect, useState } from "react";
import { REQUEST_TYPE } from "../constants/wizard";
import { useAppSelector } from "../hooks/redux";
import { selectUser } from "../store/selectors/users";
import { ColumnsMappingType } from "../types/wizard";
import { getSelectedColumnsFields } from "../utils/wizard";
import WizardStepDragAndDrop from "./WizardStepDragAndDrop";

const StepFour = () => {
  const [sections, setSections] = useState<ColumnsMappingType[]>([]);
  const user = useAppSelector(selectUser);

  useEffect(() => {
    const fetchSections = async () => {
      const sections = await getSelectedColumnsFields(user.accessToken);
      setSections(sections);
    };
    fetchSections();
  }, []);

  return (
    <WizardStepDragAndDrop
      sections={sections}
      requestType={REQUEST_TYPE.COLUMNS_TYPE_POST}
    />
  );
};

export default StepFour;
