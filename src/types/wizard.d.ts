import { AppInputSelectType } from "./common";

export type DatabaseFieldsType = {
  host: string;
  port: string;
  database: string;
  username: string;
  password: string;
  ssl: boolean;
};

export type SchemaFieldsType = {
  schema: string;
  table: string;
};

export type AlgorithmFieldsType = {
  Algorithm: string;
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
  options?: { id: number; humanText: string; value: boolean }[];
  inputComponentType: string;
};

export type FieldType = {
  name: string;
  isSubmitting: boolean;
  CustomInput?:
    | React.FC<
        Pick<WizardField, "name" | "icon" | "htmlFor"> & {
          isSubmitting: boolean;
          type: string;
          placeholder?: string;
        }
      >
    | AppInputSelectType;
  inputComponentType: string;
  rest: Partial<WizardField>;
};

export type WizardFieldsType =
  | DatabaseFieldsType
  | SchemaFieldsType
  | AlgorithmFieldsType;
