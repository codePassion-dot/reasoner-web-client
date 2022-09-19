import { ErrorMessage, Field, Form, Formik } from "formik";
import { REQUEST_TYPE } from "../constants/wizard";
import { makeRequest } from "../services/wizard";
import { CgSpinnerTwoAlt } from "react-icons/cg";
import { useRouter } from "next/router";
import WizardFormInput from "./WizardFormInput";
import { WizardFieldsType } from "../types/wizard";

interface WizardField {
  name: string;
  placeholder: string;
  icon: React.ReactNode;
  type: string | boolean;
  htmlFor: string;
}

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
  const handleSubmit = async (
    values: WizardFieldsType,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    setSubmitting(true);
    const { error } = await makeRequest(requestType, values);
    if (!error) {
      router.push("/");
    }
    setSubmitting(false);
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="h-60 flex flex-wrap flex-col gap-3">
          {fields.map(({ name, ...rest }: WizardField) => (
            <div key={name} >
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
        </Form>
      )}
    </Formik>
  );
};

export default WizardFormGeneric;
