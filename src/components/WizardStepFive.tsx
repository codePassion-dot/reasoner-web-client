import { FieldArray, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { BiColumns, BiShieldAlt2 } from "react-icons/bi";
import { useAppSelector } from "../hooks/redux";
import { selectUser } from "../store/selectors/users";
import { SelectedOrdinalColumnsType } from "../types/wizard";
import { getOrdinalColumnsFields } from "../utils/wizard";
import AppInputSelect from "./AppInputSelect";

interface SelectItem {
  id: number;
  value: string;
  humanText: string;
  mappedValues?: { ordinalValue: string; mappedValue: number | null }[];
}

interface Fields {
  [key: string]: { ordinalValue: string; mappedValue: number | null }[];
}

const StepFive = () => {
  const user = useAppSelector(selectUser);
  const [fields, setFields] = useState<Fields>({});

  const [selectedFieldMappedOptions, setSelectedFieldMappedOptions] = useState<
    SelectItem[]
  >([]);

  useEffect(() => {
    const fetchFields = async () => {
      const ordinalColumns = await getOrdinalColumnsFields(user.accessToken);
      for (const column of ordinalColumns) {
        setFields({ ...fields, [column.columnName]: column.mappedValues });
      }
    };
    fetchFields();
  }, [user.accessToken]);

  const handleSubmit = (values: any) => {
    console.log(values);
  };

  const handleOnChangeSelectedColumn = ({ target: { name, value } }: any) => {
    const selectedColumn = fields[value].length;
    if (selectedColumn) {
      setSelectedFieldMappedOptions(
        Array.from({ length: selectedColumn ?? 0 }, (_, idx) => ({
          id: idx + 1,
          value: `${idx + 1}`,
          humanText: `${idx + 1}`,
        }))
      );
    }
  };

  const handleOnChangeMappedValue = (
    { target: { name, value } }: any,
    setFieldValue: (
      field: string,
      value: any,
      shouldValidate?: boolean
    ) => void,
    values: Fields
  ) => {
    const [ordinalValue, columnName] = name.split("-");
    const optionChanged = values[columnName].find(
      (option) => option.ordinalValue === ordinalValue
    );
    let newMappedOptions = selectedFieldMappedOptions.filter(
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
    setSelectedFieldMappedOptions(newMappedOptions);
    const newMappedValues = values[columnName].map((option) => {
      if (option.ordinalValue === ordinalValue) {
        return {
          ...option,
          mappedValue: value === "" ? null : Number(value),
        };
      }
      return option;
    });
    setFieldValue(columnName, newMappedValues);
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
                onChange={handleOnChangeSelectedColumn}
                icon={<BiColumns className="text-white" />}
                placeholder="select ordinal column"
              >
                {(selectedOption) => (
                  <FieldArray name={selectedOption?.humanText ?? "default"}>
                    {() => (
                      <>
                        {values[selectedOption?.humanText ?? "default"]?.map(
                          ({ ordinalValue, mappedValue }, idx) => (
                            <div key={idx} className="flex flex-row gap-3">
                              <h2 className="basis-1/2 text-start">
                                {ordinalValue}
                              </h2>
                              <AppInputSelect
                                options={selectedFieldMappedOptions}
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
