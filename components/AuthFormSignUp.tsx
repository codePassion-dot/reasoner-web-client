import { ErrorMessage, Field, Form, Formik } from "formik";
import Link from "next/link";
import { FC } from "react";
import { BsPerson } from "react-icons/bs";
import { RiLockPasswordLine } from "react-icons/ri";
import * as Yup from "yup";
import { CONSTANTS } from "../constants";
import AuthFormInput from "./AuthFormInput";

const AuthFormSignUp: FC = () => {
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .min(8, "Too short")
      .max(14, "Too long")
      .test(
        "password",
        "Password must contain at least one uppercase",
        (value) => typeof value === "string" && /[A-Z]/.test(value)
      )
      .test(
        "password",
        "Password must contain at least one lowercase",
        (value) => typeof value === "string" && /[a-z]/.test(value)
      )
      .test(
        "password",
        "Password must contain at least one special character",
        (value) =>
          typeof value === "string" &&
          /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value)
      )
      .required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Required"),
  });
  const fields = [
    {
      name: "email",
      humanText: "Email",
      placeholder: "Enter your email",
      icon: <BsPerson className="text-2xl text-white" />,
      type: "email",
      htmlFor: "email",
    },
    {
      name: "password",
      humanText: "Password",
      placeholder: "Enter your password",
      icon: <RiLockPasswordLine className="text-2xl text-white" />,
      type: "password",
      htmlFor: "password",
    },
    {
      name: "confirmPassword",
      humanText: "Confirm Password",
      placeholder: "Confirm your password",
      icon: <RiLockPasswordLine className="text-2xl text-white" />,
      type: "password",
      htmlFor: "confirmPassword",
    },
  ];

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
            {fields.map(({ name, ...rest }) => (
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
                {CONSTANTS.tabsTexts[1]}
              </h3>
            </button>
            <Link href="/">
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

export default AuthFormSignUp;
