import { BsPerson } from "react-icons/bs";
import { RiLockPasswordLine } from "react-icons/ri";
import * as Yup from "yup";

export const getBaseAuthValidation = () => {
  return Yup.object().shape({
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
  });
};

export const getSignUpValidation = () => {
  return getBaseAuthValidation().shape({
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Required"),
  });
};

export const getBaseFields = () => {
  return [
    {
      name: "email",
      placeholder: "Enter your email",
      icon: BsPerson({ className: "text-2xl text-white" }),
      type: "email",
      htmlFor: "email",
    },
    {
      name: "password",
      placeholder: "Enter your password",
      icon: RiLockPasswordLine({ className: "text-2xl text-white" }),
      type: "password",
      htmlFor: "password",
    },
  ];
};

export const getSignUpFields = () => {
  return [
    ...getBaseFields(),
    {
      name: "confirmPassword",
      placeholder: "Confirm your password",
      icon: RiLockPasswordLine({ className: "text-2xl text-white" }),
      type: "password",
      htmlFor: "confirmPassword",
    },
  ];
};

export const getPasswordRecoveryValidation = () => {
  return Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
  });
};

export const getPasswordRecoveryFields = () => {
  return getBaseFields().slice(0, 1);
};
