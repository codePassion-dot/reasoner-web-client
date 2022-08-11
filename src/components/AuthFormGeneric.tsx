import { ErrorMessage, Field, Form, Formik } from "formik";
import Link from "next/link";
import AuthFormInput from "./AuthFormInput";

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
}

const AuthFormGeneric = <T extends unknown>({
  validationSchema,
  fields,
  buttonText,
}: Props<T>) => {
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({ isSubmitting }) => (
        <Form className="grid place-items-center pt-5 pb-7 rounded-b-2xl bg-cloud-burst">
          <div className="flex flex-col gap-3 w-fit">
            {fields.map(({ name, ...rest }: AuthField) => (
              <div key={name} className="flex flex-col">
                <Field as={AuthFormInput} {...rest} name={name} />
                <ErrorMessage
                  className="text-white"
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
              <h3 className="text-2xl italic font-bold text-white">
                {buttonText}
              </h3>
            </button>
            <Link href="/auth/recover">
              <span className="self-center text-xs font-medium text-white">
                Forgot password ?
              </span>
            </Link>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AuthFormGeneric;
