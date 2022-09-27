import { ErrorMessage, Field, Form, Formik } from "formik";
import { REQUEST_TYPE } from "../constants/wizard";
import { makeRequest } from "../services/wizard";
import { CgSpinnerTwoAlt } from "react-icons/cg";
import { useRouter } from "next/router";
import WizardFormInput from "./WizardFormInput";
import { FieldType, WizardField, WizardFieldsType } from "../types/wizard";
import { useSelector } from "react-redux";
import { selectUser } from "../store/selectors/users";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { handleNext } from "../store/slices/wizard";
import { selectActiveStepIdx, selectSteps } from "../store/selectors/wizard";
import AppInputSelect from "./AppInputSelect";

interface Props<T> {
  validationSchema: T;
  fields: WizardField[];
  requestType: REQUEST_TYPE;
  initialValues: WizardFieldsType;
}

const WizardFormGeneric = <T extends unknown>({
  validationSchema,
  fields,
  requestType,
  initialValues,
}: Props<T>) => {
  const router = useRouter();
  const user = useSelector(selectUser);
  const steps = useAppSelector(selectSteps);
  const activeStepIdx = useAppSelector(selectActiveStepIdx);
  const dispatch = useAppDispatch();

  const handleSubmit = async (
    values: WizardFieldsType,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    setSubmitting(true);
    const { error } = await makeRequest({
      requestType,
      body: values,
      accessToken: user.accessToken,
    });

    if (!error) {
      dispatch(handleNext());
      router.push(`/wizard/${steps[activeStepIdx + 1].key.toLowerCase()}`);
    }
    setSubmitting(false);
  };
  const firstFourFields = fields.slice(0, 5);
  const restOfFields = fields.slice(5);

  const FieldItem = ({
    name,
    isSubmitting,
    rest,
    inputComponent,
  }: FieldType) => {
    return (
      <div key={name}>
        <Field
          as={inputComponent}
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
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form id="wizard">
          <div className="flex flex-row gap-3">
            <div className="flex flex-col gap-3">
              {firstFourFields.map(
                ({ name, inputComponent, ...rest }: WizardField) => (
                  <FieldItem
                    key={name}
                    name={name}
                    isSubmitting={isSubmitting}
                    inputComponent={inputComponent}
                    rest={rest}
                  />
                )
              )}
            </div>
            <div>
              {restOfFields.map(
                ({ name, inputComponent, ...rest }: WizardField) => (
                  <FieldItem
                    key={name}
                    name={name}
                    isSubmitting={isSubmitting}
                    inputComponent={inputComponent}
                    rest={rest}
                  />
                )
              )}
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default WizardFormGeneric;
