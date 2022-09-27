import {
  BiLock,
  BiUser,
  BiLinkAlt,
  BiData,
  BiBullseye,
  BiShieldAlt2,
  BiShapeSquare,
  BiTable,
} from "react-icons/bi";
import * as Yup from "yup";
import AppInputAutocomplete from "../components/AppInputAutocomplete";
import AppInputSelect from "../components/AppInputSelect";
import WizardFormInput from "../components/WizardFormInput";
import { REQUEST_TYPE } from "../constants/wizard";
import { makeRequest } from "../services/wizard";
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
    ssl: Yup.bool()
      .required("Required")
      .typeError("The ssl option is required"),
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
      inputComponent: WizardFormInput,
    },
    {
      name: "port",
      placeholder: "Enter your database port",
      icon: BiBullseye({ className: "text-2xl text-white" }),
      type: "text",
      htmlFor: "port",
      inputComponent: WizardFormInput,
    },
    {
      name: "database",
      placeholder: "Enter your database name",
      icon: BiData({ className: "text-2xl text-white" }),
      type: "text",
      htmlFor: "database",
      inputComponent: WizardFormInput,
    },
    {
      name: "username",
      placeholder: "Enter your database username",
      icon: BiUser({ className: "text-2xl text-white" }),
      type: "text",
      htmlFor: "username",
      inputComponent: WizardFormInput,
    },
    {
      name: "password",
      placeholder: "Enter your database password",
      icon: BiLock({ className: "text-2xl text-white" }),
      type: "password",
      htmlFor: "password",
      inputComponent: WizardFormInput,
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
      inputComponent: AppInputSelect,
    },
  ];
};

export const getSchemaValidation = () => {
  return Yup.object().shape({
    schema: Yup.string().required("Required"),
    table: Yup.string().required("Required"),
  });
};

const getSchemas = async (accessToken: string) => {
  const { resource } = await makeRequest({
    requestType: REQUEST_TYPE.SCHEMA_GET,
    accessToken,
  });
  return resource?.map(({ schemaName }, index) => ({
    id: index,
    humanText: schemaName,
    value: schemaName,
  }));
};

export const getSchemaFields = async (
  accessToken?: string
): Promise<WizardField[]> => {
  return [
    {
      name: "schema",
      placeholder: "Select your schema",
      icon: BiShapeSquare({ className: "text-2xl text-white" }),
      type: "select",
      htmlFor: "ssl",
      inputComponent: AppInputAutocomplete,
    },
    {
      name: "table",
      placeholder: "Select your table",
      icon: BiTable({ className: "text-2xl text-white" }),
      type: "select",
      options: await getSchemas(accessToken ?? ""),
      htmlFor: "ssl",
      inputComponent: AppInputAutocomplete,
    },
  ];
};
