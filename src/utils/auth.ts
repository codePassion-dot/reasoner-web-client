import { BsPerson } from "react-icons/bs";
import { RiLockPasswordLine } from "react-icons/ri";
import * as Yup from "yup";

const passwordValidation = Yup.string()
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
  .required("Required");

const confirmPasswordValidation = Yup.string()
  .oneOf([Yup.ref("password"), null], "Passwords must match")
  .required("Required");

const passwordField = {
  name: "password",
  placeholder: "Enter your password",
  icon: RiLockPasswordLine({ className: "text-2xl text-white" }),
  type: "password",
  htmlFor: "password",
};

const confirmPasswordField = {
  name: "confirmPassword",
  placeholder: "Confirm your password",
  icon: RiLockPasswordLine({ className: "text-2xl text-white" }),
  type: "password",
  htmlFor: "confirmPassword",
};

export const getBaseAuthValidation = () => {
  return Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: passwordValidation,
  });
};

export const getSignUpValidation = () => {
  return getBaseAuthValidation().shape({
    confirmPassword: confirmPasswordValidation,
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
    passwordField,
  ];
};

export const getSignUpFields = () => {
  return [...getBaseFields(), confirmPasswordField];
};

export const getPasswordRecoveryValidation = () => {
  return Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
  });
};

export const getPasswordRecoveryFields = () => {
  return getBaseFields().slice(0, 1);
};

export const getPasswordResetValidation = () => {
  return Yup.object().shape({
    password: passwordValidation,
    confirmPassword: confirmPasswordValidation,
  });
};

export const getPasswordResetFields = () => {
  return [passwordField, confirmPasswordField];
};
