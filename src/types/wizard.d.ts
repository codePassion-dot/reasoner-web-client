import { FC } from "react";
import {
  AppInputAutocompleteType,
  AppInputSelectType,
  ErrorResponseType,
} from "./common";

export type DatabaseFieldsType = {
  host: string;
  port: string;
  database: string;
  username: string;
  password: string;
  ssl: boolean | null;
};

export type MakeRequestType = {
  requestType: REQUEST_TYPE;
  body?: WizardFieldsType;
  accessToken: string;
};

export type SchemaFieldsType = {
  schema: string;
  table: string;
};

export type AlgorithmFieldsType = {
  Algorithm: string;
};

export type ResponseType = {
  resource: { schemaName: string }[] | null;
  error: ErrorResponseType;
};

export type StepDetailsType = {
  [key: string]: {
    title: string;
    description: string;
  };
};
export type WizardField = {
  name: string;
  placeholder: string;
  icon: React.ReactNode;
  type: string | boolean;
  htmlFor: string;
  options?: { id: number; humanText: string; value: any }[];
  inputComponent:
    | React.FC<
        Pick<WizardField, "name" | "icon" | "htmlFor"> & {
          isSubmitting: boolean;
          type: string;
          placeholder?: string;
        }
      >
    | AppInputSelectType
    | AppInputAutocompleteType;
};

export type FieldType = {
  name: string;
  isSubmitting: boolean;
  inputComponent:
    | React.FC<
        Pick<WizardField, "name" | "icon" | "htmlFor"> & {
          isSubmitting: boolean;
          type: string;
          placeholder?: string;
        }
      >
    | AppInputSelectType
    | AppInputAutocompleteType;
  rest: Partial<WizardField>;
};

export type WizardFieldsType =
  | DatabaseFieldsType
  | SchemaFieldsType
  | AlgorithmFieldsType;
