import { Draggable, Droppable } from "@hello-pangea/dnd";
import { FC } from "react";
import slugify from "slugify";
import { ColumnsMappingType } from "../types/wizard";

interface Props {
  sections:ColumnsMappingType[];
  idx: number;
}

const WizardStepThreeSection: FC<Props> = ({
  sections,
  idx,
}) => {
  return (
    <div className="flex rounded-lg flex-col  h-full w-80">
      <div className="justify-between shadow-lg rounded-xl bg-cloud-burst flex flex-row shadow-cloud-burst/50 p-2 mb-2">
        <h2 className="text-xl">{sections[idx].sectionTitle}</h2>
      </div>
      <Droppable droppableId={sections[idx].droppableId}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="flex gap-3 flex-col bg-cloud-burst overflow-y-auto scrollbar-hide h-full p-3 rounded-xl"
          >
            {sections[idx].options.map((option, idx) => (
              <Draggable
                draggableId={slugify(option, { lower: true })}
                key={slugify(option, { lower: true })}
                index={idx}
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <h2 className="bg-whisper text-lg rounded-xl text-cerulean">
                      {option}
                    </h2>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default WizardStepThreeSection;
