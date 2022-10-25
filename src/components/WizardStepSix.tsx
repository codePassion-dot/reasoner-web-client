import { Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BiColumns } from "react-icons/bi";
import { REQUEST_TYPE } from "../constants/wizard";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { makeRequest } from "../services/wizard";
import { selectUser } from "../store/selectors/users";
import { selectActiveStepIdx, selectSteps } from "../store/selectors/wizard";
import { handleNext } from "../store/slices/wizard";
import { NewProblemSelectedColumns } from "../types/wizard";
import { getNewProblemFields } from "../utils/wizard";
import AppInputSelect from "./AppInputSelect";
import WizardFormInput from "./WizardFormInput";

const StepSix = () => {
  const [fields, setFields] = useState<NewProblemSelectedColumns[]>([]);
  const [initialValues, setInitialValues] = useState<{
    [key: string]: string | number;
  }>({});
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const steps = useAppSelector(selectSteps);
  const activeStepIdx = useAppSelector(selectActiveStepIdx);

  useEffect(() => {
    const fetchFields = async () => {
      const columns = await getNewProblemFields(user.accessToken);
      setFields(columns);
      setInitialValues(
        columns.reduce((acc, curr) => ({ ...acc, [curr.columnName]: "" }), {})
      );
    };
    fetchFields();
  }, []);

  const handleSubmit = async (
    values: { [key: string]: string | number },
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    setSubmitting(true);
    const requestBody = Object.entries(values).reduce(
      (acc: { columnName: string; value: string | number }[], [key, value]) => [
        ...acc,
        { columnName: key, value },
      ],
      []
    );
    const { error, resource } = await makeRequest({
      requestType: steps[activeStepIdx].requestType,
      body: requestBody,
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
      onSubmit={handleSubmit}
      initialValues={initialValues}
    >
      {({ isSubmitting, values }) => (
        <Form id="wizard">
          <div className="flex flex-col items-start gap-2">
            {fields.map(({ columnName, type, options }) => (
              <div
                key={columnName}
                className="flex flex-row justify-between gap-2 w-full"
              >
                <h2 className="text-lg truncate basis-1/3 px-4 text-center bg-whisper text-denim rounded-2xl py-1">
                  {columnName}
                </h2>
                {options.length > 0 && (
                  <Field
                    as={AppInputSelect}
                    name={columnName}
                    options={options.map((option, idx) => ({
                      id: idx,
                      humanText: option,
                      value: option,
                    }))}
                    icon={<BiColumns className="text-white" />}
                    placeholder="select value"
                  />
                )}
                {!options.length && (
                  <Field
                    as={WizardFormInput}
                    name={columnName}
                    value={values[columnName] ?? ""}
                    type="number"
                    placeholder="Enter value"
                    isSubmitting={isSubmitting}
                    icon={<BiColumns className="text-white" />}
                    htmlFor={columnName}
                  />
                )}
              </div>
            ))}
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default StepSix;
