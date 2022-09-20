import { ErrorMessage, Field, Form, Formik } from "formik";
import Link from "next/link";
import { REQUEST_TYPE } from "../constants/auth";
import { makeRequest } from "../services/auth";
import { AuthFieldsType } from "../types/auth";
import AuthFormInput from "./AuthFormInput";
import { CgSpinnerTwoAlt } from "react-icons/cg";
import { useRouter } from "next/router";
import { UI_BUTTON_TYPE } from "../ui/fields/auth";
import { useAppDispatch } from "../hooks/redux";
import { setUser } from "../store/slices/users";
import { isAccessTokenResource } from "../utils/auth";

interface AuthField {
  name: string;
  placeholder: string;
  icon: React.ReactNode;
  type: string;
  htmlFor: string;
}

interface Props<T> {
  validationSchema: T;
  fields: AuthField[];
  buttonText: string;
  requestType: REQUEST_TYPE;
  initialValues: AuthFieldsType;
  urlQuery?: Record<string, string>;
}

const AuthFormGeneric = <T extends unknown>({
  validationSchema,
  fields,
  buttonText,
  requestType,
  initialValues,
  urlQuery,
}: Props<T>) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const handleSubmit = async (
    values: AuthFieldsType,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    setSubmitting(true);
    const { error, resource } = await makeRequest(
      requestType,
      values,
      urlQuery
    );
    setSubmitting(false);
    if (error) return;

    if (requestType !== REQUEST_TYPE.SIGN_IN)
      return router.push("/auth/sign-in");

    if (isAccessTokenResource(resource)) {
      dispatch(
        setUser({
          accessToken: resource.accessToken,
        })
      );
      return router.push("/wizard/step-one");
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="grid place-items-center pt-5 pb-7 rounded-b-2xl bg-cloud-burst">
          <div className="flex flex-col gap-3 w-fit">
            {fields.map(({ name, ...rest }: AuthField) => (
              <div key={name} className="flex flex-col">
                <Field
                  as={AuthFormInput}
                  {...rest}
                  name={name}
                  isSubmitting={isSubmitting}
                />
                <ErrorMessage
                  className="text-white text-sm text-left pt-1"
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
            {buttonText === UI_BUTTON_TYPE[0] && (
              <Link href="/auth/password/recovery">
                <span className="self-center text-xs font-medium text-white cursor-pointer">
                  Forgot password ?
                </span>
              </Link>
            )}
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AuthFormGeneric;
