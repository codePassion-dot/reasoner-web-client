import { FC } from "react";
import { REQUEST_TYPE, WIZARD_FIELDS } from "../constants/wizard";
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
};

export type DependentFieldType = {
  [WIZARD_FIELDS]: string;
};

export type TableFieldsType = {
  table: WIZARD_FIELDS;
};

export type AlgorithmFieldsType = {
  Algorithm: string;
};

export type ResponseType = {
  resource: { [key: string]: string }[] | null;
  error: ErrorResponseType;
};

export type StepDetailsType = {
  [key: string]: {
    title: string;
    description: string;
  };
};

export type DependentFields = {
  field: WIZARD_FIELDS;
  requestType: REQUEST_TYPE;
}[];

export type WizardField = {
  name: string;
  placeholder: string;
  dependsOn?: string;
  dependentFields?: DependentFields;
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

export type SetFieldValueType = (
  field: string,
  value: any,
  shouldValidate?: boolean
) => void;

export type FieldType = {
  name: string;
  isSubmitting: boolean;
  dependsOn?: string;
  dependentFields?: DependentFields;
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
  | TableFieldsType
  | AlgorithmFieldsType
  | DependentFieldType;
