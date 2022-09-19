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

export type WizardFieldsType =
  | DatabaseFieldsType
  | SchemaFieldsType
  | AlgorithmFieldsType;
