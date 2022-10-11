import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { FieldArray, Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BiArrowToRight } from "react-icons/bi";
import { REQUEST_TYPE } from "../constants/wizard";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { makeRequest } from "../services/wizard";
import { selectUser } from "../store/selectors/users";
import { selectActiveStepIdx, selectSteps } from "../store/selectors/wizard";
import { handleNext } from "../store/slices/wizard";
import { ColumnsMappingType } from "../types/wizard";
import { getColumnsFields } from "../utils/wizard";
import WizardStepThreeSection from "./WizardStepThreeSection";

const StepThree = () => {
  const user = useAppSelector(selectUser);
  const [sections, setSections] = useState<ColumnsMappingType[]>([]);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const steps = useAppSelector(selectSteps);
  const activeStepIdx = useAppSelector(selectActiveStepIdx);

  useEffect(() => {
    const fetchSections = async () => {
      setSections(await getColumnsFields(user.accessToken));
    };
    fetchSections();
  }, []);

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
        (section) => section.droppableId !== "columns-found"
      ),
    };
    const { error } = await makeRequest({
      requestType: REQUEST_TYPE.COLUMNS_POST,
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
                  <div className="flex flex-row h-96">
                    <WizardStepThreeSection
                      sections={values.sections}
                      idx={0}
                    />
                    <BiArrowToRight className="self-center animate-pulse w-16 h-14" />
                    <div className="flex flex-col gap-2">
                      <div className="basis-11/12">
                        <WizardStepThreeSection
                          sections={values.sections}
                          idx={1}
                        />
                      </div>
                      <div>
                        <WizardStepThreeSection
                          sections={values.sections}
                          idx={2}
                        />
                      </div>
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

export default StepThree;
