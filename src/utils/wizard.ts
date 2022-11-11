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
import { REQUEST_TYPE, WIZARD_FIELDS } from "../constants/wizard";
import { makeRequest } from "../services/wizard";
import {
  ColumnsMappingType,
  NewProblemSelectedColumns,
  ResponseType,
  SelectedOrdinalColumnsType,
  WizardField,
} from "../types/wizard";

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
      name: WIZARD_FIELDS.HOST,
      placeholder: "Enter your host",
      icon: BiLinkAlt({ className: "text-2xl text-white" }),
      type: "text",
      htmlFor: WIZARD_FIELDS.HOST,
      inputComponent: WizardFormInput,
    },
    {
      name: WIZARD_FIELDS.PORT,
      placeholder: "Enter your database port",
      icon: BiBullseye({ className: "text-2xl text-white" }),
      type: "text",
      htmlFor: WIZARD_FIELDS.PORT,
      inputComponent: WizardFormInput,
    },
    {
      name: WIZARD_FIELDS.DATABASE,
      placeholder: "Enter your database name",
      icon: BiData({ className: "text-2xl text-white" }),
      type: "text",
      htmlFor: WIZARD_FIELDS.DATABASE,
      inputComponent: WizardFormInput,
    },
    {
      name: WIZARD_FIELDS.USERNAME,
      placeholder: "Enter your database username",
      icon: BiUser({ className: "text-2xl text-white" }),
      type: "text",
      htmlFor: WIZARD_FIELDS.USERNAME,
      inputComponent: WizardFormInput,
    },
    {
      name: WIZARD_FIELDS.PASSWORD,
      placeholder: "Enter your database password",
      icon: BiLock({ className: "text-2xl text-white" }),
      type: "password",
      htmlFor: WIZARD_FIELDS.PASSWORD,
      inputComponent: WizardFormInput,
    },
    {
      name: WIZARD_FIELDS.SSL,
      placeholder: "Select your ssl option",
      icon: BiShieldAlt2({ className: "text-2xl text-white" }),
      type: "select",
      options: [
        { id: 1, humanText: "yes", value: true },
        { id: 2, humanText: "no", value: false },
      ],
      htmlFor: WIZARD_FIELDS.SSL,
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
      name: WIZARD_FIELDS.SCHEMA,
      placeholder: "Select your schema",
      icon: BiShapeSquare({ className: "text-2xl text-white" }),
      type: "select",
      options: await getSchemas(accessToken ?? ""),
      dependentFields: [
        { field: "table", requestType: REQUEST_TYPE.TABLES_GET },
      ],
      htmlFor: WIZARD_FIELDS.SCHEMA,
      inputComponent: AppInputAutocomplete,
    },
    {
      name: WIZARD_FIELDS.TABLE,
      placeholder: "Select your table",
      icon: BiTable({ className: "text-2xl text-white" }),
      type: "select",
      options: [],
      dependsOn: "schema",
      htmlFor: WIZARD_FIELDS.TABLE,
      inputComponent: AppInputAutocomplete,
    },
  ];
};

const getColumns = async (accessToken: string): Promise<string[]> => {
  const { resource } = await makeRequest({
    requestType: REQUEST_TYPE.COLUMNS_GET,
    accessToken: accessToken,
  });

  return resource?.map(({ columnName }) => columnName) ?? [];
};

const getColumnsSelected = async (accessToken: string): Promise<string[]> => {
  const { resource } = await makeRequest({
    requestType: REQUEST_TYPE.COLUMNS_TYPE_GET,
    accessToken: accessToken,
  });
  return resource?.map(({ columnName }) => columnName) ?? [];
};

export const getSelectedColumnsFields = async (
  accessToken: string
): Promise<ColumnsMappingType[]> => {
  return [
    {
      sectionTitle: "Selected columns",
      options: await getColumnsSelected(accessToken),
      droppableId: "selected-columns",
    },
    {
      sectionTitle: "Ordinal columns",
      options: [],
      droppableId: "ordinal-columns",
    },
    {
      sectionTitle: "Numeric columns",
      options: [],
      droppableId: "numeric-columns",
    },
    {
      sectionTitle: "Boolean columns",
      options: [],
      droppableId: "boolean-columns",
    },
    {
      sectionTitle: "Literal columns",
      options: [],
      droppableId: "literal-columns",
    },
  ];
};

export const getColumnsFields = async (
  accessToken: string
): Promise<ColumnsMappingType[]> => {
  return [
    {
      sectionTitle: "Columns found",
      options: await getColumns(accessToken ?? ""),
      droppableId: "columns-found",
    },
    {
      sectionTitle: "Predicting Factors",
      options: [],
      droppableId: "predicting-factors",
    },
    {
      sectionTitle: "Goal Factor",
      options: [],
      droppableId: "goal-factor",
    },
  ];
};

export const getSelectedOrdinalColumns = async (accessToken: string) => {
  const { resource } = await makeRequest({
    requestType: REQUEST_TYPE.COLUMNS_SELECTED_ORDINAL_GET,
    accessToken: accessToken,
  });
  return resource;
};

export const getOrdinalColumnsFields = async (
  accessToken: string
): Promise<SelectedOrdinalColumnsType[]> => {
  const ordinalColumns = await getSelectedOrdinalColumns(accessToken);

  return (
    ordinalColumns?.map((ordinalColumn) => ({
      columnName: ordinalColumn.columnName,
      mappedValues: ordinalColumn.values.map((value, idx) => ({
        ordinalValue: value,
        mappedValue: null,
      })),
    })) ?? []
  );
};

export const getNewProblemFields = async (
  accessToken: string
): Promise<NewProblemSelectedColumns[]> => {
  const { resource } = await makeRequest({
    requestType: REQUEST_TYPE.NEW_PROBLEM_SELECTED_COLUMNS_GET,
    accessToken,
  });
  return (
    resource?.map(({ columnName, type, options }) => ({
      columnName,
      type,
      options,
    })) ?? []
  );
};
