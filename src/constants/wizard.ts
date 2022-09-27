import { StepDetailsType } from "../types/wizard";

export enum REQUEST_TYPE {
  DATABASE = "create-connection",
  SCHEMA = "save-problem-source",
  SCHEMA_GET = "get-problem-source-schemas",
  COLUMN = "save-problem-target", // TODO: change to save-problem-target when backend is ready
  ALGORITHM = "save-algorithm", // TODO: change to save-algorithm when backend is ready
}

export enum AUTH_FIELDS {
  ID = "id",
  EMAIL = "email",
  ACCESS_TOKEN = "accessToken",
}

export const STEP_NAMES: { [key: string]: string } = {
  SOURCE: "Source Selection",
  SCHEMA_AND_TABLE: "Schema Mapping",
  COLUMNS: "Column Mapping",
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
  ALGORITHM: {
    title: "algorithm to find the neighbor",
    description: "Select the algorithm to use",
  },
} as const;
