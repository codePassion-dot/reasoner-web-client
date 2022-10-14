import { useEffect, useState } from "react";
import { REQUEST_TYPE } from "../constants/wizard";
import { useAppSelector } from "../hooks/redux";
import { selectUser } from "../store/selectors/users";
import { ColumnsMappingType } from "../types/wizard";
import { getColumnsFields } from "../utils/wizard";
import WizardStepDragAndDrop from "./WizardStepDragAndDrop";

const StepThree = () => {
  const [sections, setSections] = useState<ColumnsMappingType[]>([]);
  const user = useAppSelector(selectUser);

  useEffect(() => {
    const fetchSections = async () => {
      setSections(await getColumnsFields(user.accessToken));
    };
    fetchSections();
  }, []);

  return (
    <WizardStepDragAndDrop
      sections={sections}
      requestType={REQUEST_TYPE.COLUMNS_POST}
    />
  );
};

export default StepThree;
