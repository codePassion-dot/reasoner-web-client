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
import AppInputSelect from "./AppInputSelect";

const StepSeven = () => {
  const [fields, setFields] = useState<string[]>([]);
  const user = useAppSelector(selectUser);
  const steps = useAppSelector(selectSteps);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const activeStepIdx = useAppSelector(selectActiveStepIdx);

  useEffect(() => {
    const fetchFields = async () => {
      const { resource } = await makeRequest({
        accessToken: user.accessToken,
        requestType: REQUEST_TYPE.ALGORITHM_GET,
      });
      if (Array.isArray(resource)) {
        setFields(resource?.map((algo) => algo.name) ?? []);
      }
    };
    fetchFields();
  }, []);

  const handleSubmit = async (
    values: any,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    setSubmitting(true);
    const { algorithm } = values;
    const { error, resource } = await makeRequest({
      requestType: steps[activeStepIdx].requestType,
      body: { algorithmName: algorithm },
      accessToken: user.accessToken,
    });

    if (!error) {
      dispatch(handleNext());
      router.push(`/wizard/${steps[activeStepIdx + 1].key.toLowerCase()}`);
    }
    setSubmitting(false);
  };

  return (
    <Formik initialValues={{}} onSubmit={handleSubmit}>
      {() => (
        <Form id="wizard">
          <Field
            as={AppInputSelect}
            options={fields.map((algoName, idx) => ({
              id: idx,
              humanText: algoName,
              value: algoName,
            }))}
            parentCustomStyles="w-72 h-9 relative"
            name="algorithm"
            icon={<BiColumns className="text-white" />}
            placeholder="select algorithm"
          />
        </Form>
      )}
    </Formik>
  );
};

export default StepSeven;
