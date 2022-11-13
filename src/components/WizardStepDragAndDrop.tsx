import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { FieldArray, Form, Formik } from "formik";
import { useRouter } from "next/router";
import { FC, useEffect } from "react";
import { BiArrowToRight } from "react-icons/bi";
import { REQUEST_TYPE } from "../constants/wizard";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { makeRequest } from "../services/wizard";
import { selectUser } from "../store/selectors/users";
import { selectActiveStepIdx, selectSteps } from "../store/selectors/wizard";
import { handleNext } from "../store/slices/wizard";
import { ColumnsMappingType } from "../types/wizard";
import WizardStepDragAndDropSection from "./WizardStepDragAndDropSection";

interface Props<T> {
  sections: ColumnsMappingType[];
  requestType: REQUEST_TYPE;
  validationSchema?: T;
}

const WizardStepDragAndDrop = <T extends unknown>({ sections, requestType, validationSchema }: Props<T>) => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const steps = useAppSelector(selectSteps);
  const activeStepIdx = useAppSelector(selectActiveStepIdx);

  const getCustomStyle = (droppableId: string) => {
    if (droppableId === "predicting-factors") {
      return "basis-11/12";
    }
    if (droppableId !== "goal-factor") {
      return "basis-1/2";
    }
    return "";
  };

  const reOrganizeSections = (
    item: DropResult,
    sections: ColumnsMappingType[],
    setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void
  ) => {
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
      setFieldValue("sections", newSections);
    }
  };

  const handleSubmit = async (
    values: { sections: ColumnsMappingType[] },
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    setSubmitting(true);
    const body = {
      sections: values.sections.filter(
        (section) =>
          section.droppableId !== "columns-found" &&
          section.droppableId !== "selected-columns"
      ),
    };
    const { error } = await makeRequest({
      requestType,
      body,
      accessToken: user.accessToken,
    });

    if (!error) {
      dispatch(handleNext());
      router.push(`/wizard/${steps[activeStepIdx + 1].key.toLowerCase()}`);
    }
    setSubmitting(false);
  };

  return (
    <Formik
      enableReinitialize
      initialValues={{ sections }}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({ values, setFieldValue }) => {
        return (
          <Form id="wizard">
            <FieldArray name="sections">
              {() => (
                <DragDropContext
                  onDragEnd={(item) =>
                    reOrganizeSections(item, values.sections, setFieldValue)
                  }
                >
                  <div className="flex flex-row h-[35rem]">
                    <WizardStepDragAndDropSection
                      sections={values.sections}
                      idx={0}
                    />
                    <BiArrowToRight className="self-center animate-pulse w-16 h-14" />
                    <div className="flex flex-col gap-2">
                      {values.sections.slice(1).map((section, idx) => (
                        <div
                          key={idx}
                          className={getCustomStyle(section.droppableId)}
                        >
                          <WizardStepDragAndDropSection
                            sections={values.sections}
                            idx={idx + 1}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </DragDropContext>
              )}
            </FieldArray>
          </Form>
        );
      }}
    </Formik>
  );
};

export default WizardStepDragAndDrop;
