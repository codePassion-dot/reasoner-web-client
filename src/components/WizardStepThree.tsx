import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { useEffect, useState } from "react";
import { BiArrowToRight } from "react-icons/bi";
import { REQUEST_TYPE } from "../constants/wizard";
import { useAppSelector } from "../hooks/redux";
import { makeRequest } from "../services/wizard";
import { selectUser } from "../store/selectors/users";
import { ColumnsMappingType } from "../types/wizard";
import WizardStepThreeSection from "./WizardStepThreeSection";

const StepThree = () => {
  const user = useAppSelector(selectUser);
  const [sections, setSections] = useState<ColumnsMappingType[]>([
    {
      sectionTitle: "Columns found",
      options: [],
      droppableId: "droppable-1",
    },
    {
      sectionTitle: "Predicting Factors",
      options: [],
      droppableId: "droppable-2",
    },
    {
      sectionTitle: "Goal Factor",
      options: [],
      droppableId: "droppable-3",
    },
  ]);

  useEffect(() => {
    const searchColumns = async () => {
      const { resource } = await makeRequest({
        requestType: REQUEST_TYPE.COLUMNS_GET,
        accessToken: user?.accessToken,
      });
      const newSections = [...sections];
      newSections[0].options =
        resource?.map(({ columnName }) => columnName) ?? [];
      setSections(newSections);
    };
    searchColumns();
  }, []);

  const onDragEnd = (item: DropResult) => {
    const { source, destination } = item;
    if (!destination) return;
    if (
      source.index === destination.index &&
      source.droppableId === destination.droppableId
    )
      return;
    const sourceSection = sections.find(
      (section) => section.droppableId === source.droppableId
    );
    const destinationSection = sections.find(
      (section) => section.droppableId === destination.droppableId
    );
    if (sourceSection && destinationSection) {
      const newSections = [...sections];
      const [removed] = sourceSection.options.splice(source.index, 1);
      destinationSection.options.splice(destination.index, 0, removed);
      setSections(newSections);
    }
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex flex-row h-96">
        <WizardStepThreeSection sections={sections} idx={0} />
        <BiArrowToRight className="self-center animate-pulse w-16 h-14" />
        <div className="flex flex-col gap-2">
          <div className="basis-11/12">
            <WizardStepThreeSection sections={sections} idx={1} />
          </div>
          <div>
            <WizardStepThreeSection sections={sections} idx={2} />
          </div>
        </div>
      </div>
    </DragDropContext>
  );
};

export default StepThree;
