import {
  BiLock,
  BiUser,
  BiLinkAlt,
  BiData,
  BiBullseye,
  BiShieldAlt2,
} from "react-icons/bi";
import * as Yup from "yup";

export const getDatabaseValidation = () => {
  return Yup.object().shape({
    host: Yup.string().required("Required"),
    port: Yup.string().required("Required"),
    database: Yup.string().required("Required"),
    username: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
    ssl: Yup.bool().required("Required"),
  });
};

export const getDatabaseFields = () => {
  return [
    {
      name: "host",
      placeholder: "Enter your host",
      icon: BiLinkAlt({ className: "text-2xl text-white" }),
      type: "text",
      htmlFor: "host",
    },
    {
      name: "port",
      placeholder: "Enter your database port",
      icon: BiBullseye({ className: "text-2xl text-white" }),
      type: "text",
      htmlFor: "port",
    },
    {
      name: "database",
      placeholder: "Enter your database name",
      icon: BiData({ className: "text-2xl text-white" }),
      type: "text",
      htmlFor: "database",
    },
    {
      name: "username",
      placeholder: "Enter your database username",
      icon: BiUser({ className: "text-2xl text-white" }),
      type: "text",
      htmlFor: "username",
    },
    {
      name: "password",
      placeholder: "Enter your database password",
      icon: BiLock({ className: "text-2xl text-white" }),
      type: "password",
      htmlFor: "password",
    },
    {
      name: "ssl",
      placeholder: "Enter your database",
      icon: BiShieldAlt2({ className: "text-2xl text-white" }),
      type: "text",
      htmlFor: "ssl",
    },
  ];
};
