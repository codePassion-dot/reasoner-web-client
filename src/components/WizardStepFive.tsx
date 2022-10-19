import { FieldArray, Form, Formik, FormikValues } from "formik";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BiColumns, BiShieldAlt2 } from "react-icons/bi";
import { REQUEST_TYPE } from "../constants/wizard";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { makeRequest } from "../services/wizard";
import { selectUser } from "../store/selectors/users";
import { selectActiveStepIdx, selectSteps } from "../store/selectors/wizard";
import { handleNext } from "../store/slices/wizard";
import { OrdinalMappedFields } from "../types/wizard";
import { getOrdinalColumnsFields } from "../utils/wizard";
import AppInputSelect from "./AppInputSelect";

const StepFive = () => {
  const user = useAppSelector(selectUser);
  const router = useRouter();
  const steps = useAppSelector(selectSteps);
  const dispatch = useAppDispatch();
  const [fields, setFields] = useState<OrdinalMappedFields>({});
  const activeStepIdx = useAppSelector(selectActiveStepIdx);

  useEffect(() => {
    const fetchFields = async () => {
      const ordinalColumns = await getOrdinalColumnsFields(user.accessToken);
      const fields = ordinalColumns.reduce(
        (acc, curr) => ({
          ...acc,
          [curr.columnName]: {
            selectedOptions: curr.mappedValues,
            fieldMappedOptions: Array.from(
              { length: curr.mappedValues.length ?? 0 },
              (_, idx) => ({
                id: idx + 1,
                value: `${idx + 1}`,
                humanText: `${idx + 1}`,
              })
            ),
          },
        }),
        {}
      );
      setFields(fields);
    };
    fetchFields();
  }, [user.accessToken]);

  const handleSubmit = async (
    values: OrdinalMappedFields,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    setSubmitting(true);

    const { error, resource } = await makeRequest({
      requestType: REQUEST_TYPE.COLUMNS_SELECTED_ORDINAL_POST,
      body: {
        selectedOrdinalColumns: Object.keys(values).reduce((acc, curr) => {
          return {
            ...acc,
            [curr]: values[curr].selectedOptions,
          };
        }, {}),
      },
      accessToken: user.accessToken,
    });

    if (!error) {
      dispatch(handleNext());
      router.push(`/wizard/${steps[activeStepIdx + 1].key.toLowerCase()}`);
    }
    setSubmitting(false);
  };

  const handleOnChangeMappedValue = (
    { target: { name, value } }: { target: { name: string; value: string } },
    setFieldValue: (
      field: string,
      value: any,
      shouldValidate?: boolean
    ) => void,
    values: OrdinalMappedFields
  ) => {
    const [ordinalValue, columnName] = name.split("-");
    const optionChanged = values[columnName].selectedOptions.find(
      (option) => option.ordinalValue === ordinalValue
    );
    let newMappedOptions = values[columnName].fieldMappedOptions.filter(
      ({ humanText }) => humanText !== value
    );
    if (optionChanged?.mappedValue) {
      newMappedOptions = [
        ...newMappedOptions,
        {
          id: optionChanged.mappedValue,
          value: `${optionChanged.mappedValue}`,
          humanText: `${optionChanged.mappedValue}`,
        },
      ].sort((a, b) => a.id - b.id);
    }

    const newMappedValues = values[columnName].selectedOptions.map((option) => {
      if (option.ordinalValue === ordinalValue) {
        return {
          ...option,
          mappedValue: value === "" ? null : Number(value),
        };
      }
      return option;
    });

    setFieldValue(columnName, {
      selectedOptions: newMappedValues,
      fieldMappedOptions: newMappedOptions,
    });
  };

  return (
    <Formik enableReinitialize initialValues={fields} onSubmit={handleSubmit}>
      {({ values, setFieldValue }) => {
        return (
          <Form id="wizard">
            <div className="flex flex-col gap-4">
              <AppInputSelect
                options={Object.keys(values).map((key, idx) => ({
                  id: idx,
                  value: key,
                  humanText: key,
                }))}
                name="columnNames"
                onChange={() => {}}
                icon={<BiColumns className="text-white" />}
                placeholder="select ordinal column"
              >
                {(selectedOption) => (
                  <FieldArray name={selectedOption?.humanText ?? "default"}>
                    {() => (
                      <>
                        {values[
                          selectedOption?.humanText ?? "default"
                        ]?.selectedOptions.map(
                          ({ ordinalValue, mappedValue }, idx) => (
                            <div
                              key={idx}
                              className="flex items-center  flex-row gap-2"
                            >
                              <h2 className="basis-1/2 text-lg text-center bg-whisper text-denim rounded-2xl py-1">
                                {ordinalValue}
                              </h2>
                              <AppInputSelect
                                options={
                                  values[selectedOption?.humanText ?? "default"]
                                    ?.fieldMappedOptions
                                }
                                commitedOption={{
                                  id: mappedValue ?? idx,
                                  humanText: mappedValue
                                    ? `${mappedValue}`
                                    : "",
                                  value: mappedValue ? `${mappedValue}` : "",
                                }}
                                name={`${ordinalValue}-${selectedOption?.humanText}`}
                                onChange={(event) =>
                                  handleOnChangeMappedValue(
                                    event,
                                    setFieldValue,
                                    values
                                  )
                                }
                                icon={<BiShieldAlt2 className="text-white" />}
                                placeholder="select mapped value"
                              />
                            </div>
                          )
                        )}
                      </>
                    )}
                  </FieldArray>
                )}
              </AppInputSelect>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default StepFive;
