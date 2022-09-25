import {
  BiLock,
  BiUser,
  BiLinkAlt,
  BiData,
  BiBullseye,
  BiShieldAlt2,
} from "react-icons/bi";
import * as Yup from "yup";
import AppInputSelect from "../components/AppInputSelect";
import { WizardField } from "../types/wizard";

export const getDatabaseValidation = () => {
  return Yup.object().shape({
    host: Yup.string().required("Required"),
    port: Yup.number()
      .positive("the port must be a positive number")
      .required("Required")
      .typeError("the port must be a number"),
    database: Yup.string().required("Required"),
    username: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
    ssl: Yup.bool().required("Required"),
  });
};

export const getDatabaseFields = (): WizardField[] => {
  return [
    {
      name: "host",
      placeholder: "Enter your host",
      icon: BiLinkAlt({ className: "text-2xl text-white" }),
      type: "text",
      htmlFor: "host",
      inputComponentType: "default",
    },
    {
      name: "port",
      placeholder: "Enter your database port",
      icon: BiBullseye({ className: "text-2xl text-white" }),
      type: "text",
      htmlFor: "port",
      inputComponentType: "default",
    },
    {
      name: "database",
      placeholder: "Enter your database name",
      icon: BiData({ className: "text-2xl text-white" }),
      type: "text",
      htmlFor: "database",
      inputComponentType: "default",
    },
    {
      name: "username",
      placeholder: "Enter your database username",
      icon: BiUser({ className: "text-2xl text-white" }),
      type: "text",
      htmlFor: "username",
      inputComponentType: "default",
    },
    {
      name: "password",
      placeholder: "Enter your database password",
      icon: BiLock({ className: "text-2xl text-white" }),
      type: "password",
      htmlFor: "password",
      inputComponentType: "default",
    },
    {
      name: "ssl",
      placeholder: "Select your ssl option",
      icon: BiShieldAlt2({ className: "text-2xl text-white" }),
      type: "select",
      options: [
        { id: 1, humanText: "yes", value: true },
        { id: 2, humanText: "no", value: false },
      ],
      htmlFor: "ssl",
      inputComponentType: "select",
    },
  ];
};
