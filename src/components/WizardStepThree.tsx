import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { BiArrowToRight } from "react-icons/bi";
import WizardStepThreeSection from "./WizardStepThreeSection";

const StepThree = () => {
  const sections = [
    {
      sectionTitle: "Columns found",
      options: [
        "Column 1",
        "Column 2",
        "Column 3",
        "Column 4",
        "Column 5",
        "Column 6",
        "Column 7",
        "Column 8",
        "Column 9",
        "Column 10",
        "Column 11",
        "Column 12",
      ],
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
  ];

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
      const [removed] = sourceSection.options.splice(source.index, 1);
      destinationSection.options.splice(destination.index, 0, removed);
    }
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex flex-row h-96">
        <WizardStepThreeSection {...sections[0]} />
        <BiArrowToRight className="self-center animate-pulse w-16 h-14" />
        <div className="flex flex-col gap-2">
          <div className="basis-11/12">
            <WizardStepThreeSection {...sections[1]} />
          </div>
          <div>
            <WizardStepThreeSection {...sections[2]} />
          </div>
        </div>
      </div>
    </DragDropContext>
  );
};

export default StepThree;
