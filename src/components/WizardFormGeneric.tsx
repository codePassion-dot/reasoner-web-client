import { ErrorMessage, Field, Form, Formik } from "formik";
import { REQUEST_TYPE } from "../constants/wizard";
import { makeRequest } from "../services/wizard";
import { CgSpinnerTwoAlt } from "react-icons/cg";
import { useRouter } from "next/router";
import WizardFormInput from "./WizardFormInput";
import { FieldType, WizardField, WizardFieldsType } from "../types/wizard";
import { useSelector } from "react-redux";
import { selectUser } from "../store/selectors/users";

interface Props<T> {
  validationSchema: T;
  fields: WizardField[];
  buttonText: string;
  requestType: REQUEST_TYPE;
  initialValues: WizardFieldsType;
}

const WizardFormGeneric = <T extends unknown>({
  validationSchema,
  fields,
  buttonText,
  requestType,
  initialValues,
}: Props<T>) => {
  const router = useRouter();
  const user = useSelector(selectUser);
  const handleSubmit = async (
    values: WizardFieldsType,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    setSubmitting(true);
    const { error } = await makeRequest(requestType, values, user.accessToken);
    alert("you did it!");
    setSubmitting(false);
  };
  const firstFourFields = fields.slice(0, 5);
  const restOfFields = fields.slice(5);

  const FieldItem = ({
    name,
    isSubmitting,
    WizardFormInput,
    rest,
  }: FieldType) => (
    <div key={name}>
      <Field
        as={WizardFormInput}
        {...rest}
        name={name}
        isSubmitting={isSubmitting}
      />
      <ErrorMessage
        className="text-white text-xs text-left "
        name={name}
        component="div"
      />
    </div>
  );
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <div className="flex flex-row gap-3">
            <div className="flex flex-col gap-3">
              {firstFourFields.map(({ name, ...rest }: WizardField) => (
                <FieldItem
                  key={name}
                  name={name}
                  isSubmitting={isSubmitting}
                  WizardFormInput={WizardFormInput}
                  rest={rest}
                />
              ))}
            </div>
            <div>
              {restOfFields.map(({ name, ...rest }: WizardField) => (
                <FieldItem
                  key={name}
                  name={name}
                  isSubmitting={isSubmitting}
                  WizardFormInput={WizardFormInput}
                  rest={rest}
                />
              ))}
              <button
                type="submit"
                disabled={isSubmitting}
                className="self-center px-4 rounded-3xl w-fit bg-cerulean"
              >
                <h3 className="flex flex-row gap-2 items-center text-2xl italic font-bold text-white">
                  {isSubmitting && <CgSpinnerTwoAlt className="animate-spin" />}
                  {buttonText}
                </h3>
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default WizardFormGeneric;
