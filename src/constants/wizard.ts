import { StepDetailsType } from "../types/wizard";

export enum REQUEST_TYPE {
  DATABASE = "create-connection",
  SCHEMA = "save-problem-source",
  SCHEMA_GET = "get-problem-source-schemas",
  TABLES_GET = "get-problem-source-tables",
  COLUMNS_GET = "problem-source-columns",
  COLUMNS_POST = "save-problem-source-columns",
  COLUMNS_TYPE_GET = "get-problem-source-selected-columns",
  COLUMNS_TYPE_POST = "save-problem-source-columns-types",
  COLUMNS_SELECTED_ORDINAL_GET = "get-problem-source-selected-ordinal-columns",
  COLUMNS_SELECTED_ORDINAL_POST = "save-problem-source-selected-ordinal-columns",
  NEW_PROBLEM_SELECTED_COLUMNS_GET = "get-problem-source-selected-columns-new-problem",
  NEW_PROBLEM_SELECTED_COLUMNS_POST = "save-new-registry-selected-columns",
  ALGORITHM_GET = "get-available-algorithms",
  ALGORITHM_POST = "save-selected-algorithm",
}

export enum AUTH_FIELDS {
  ID = "id",
  EMAIL = "email",
  ACCESS_TOKEN = "accessToken",
}

export const WIZARD_FIELDS = {
  DATABASE: "database",
  SCHEMA: "schema",
  TABLE: "table",
  COLUMN: "column",
  ALGORITHM: "algorithm",
  HOST: "host",
  PORT: "port",
  USERNAME: "username",
  PASSWORD: "password",
  SSL: "ssl",
} as const;

export const STEP_NAMES: { [key: string]: string } = {
  SOURCE: "Source Selection",
  SCHEMA_AND_TABLE: "Schema Mapping",
  COLUMNS: "Column Mapping",
  COLUMNS_TYPE: "Column Type",
  SELECTED_ORDINAL_COLUMNS: "Ordinal Columns",
  ALGORITHM: "Algorithm Selection",
} as const;

export const STEP_DETAILS: StepDetailsType = {
  SOURCE: {
    title: "base cases",
    description: "Select the source of your data",
  },
  SCHEMA_AND_TABLE: {
    title: "base case location",
    description: "Map your data to the schema and table",
  },
  COLUMNS: {
    title: "tell us your model",
    description: "Map your data to the columns",
  },
  COLUMNS_TYPE: {
    title: "tell us the type of your columns",
    description: "select the type of your columns (numeric, boolean, ordinal)",
  },
  SELECTED_ORDINAL_COLUMNS: {
    title: "tell us the ordinal columns",
    description: "select the ordinal columns",
  },
  NEW_PROBLEM_SELECT_COLUMNS: {
    title: "tell us your new problem",
    description: "select the columns for your new problem",
  },
  ALGORITHM: {
    title: "algorithm to find the neighbor",
    description: "Select the algorithm to use",
  },
} as const;
