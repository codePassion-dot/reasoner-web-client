export enum REQUEST_TYPE {
  DATABASE = "create-connection",
  SCHEMA = "save-problem-source",
  COLUMN = "save-problem-target", // TODO: change to save-problem-target when backend is ready
  ALGORITHM = "save-algorithm", // TODO: change to save-algorithm when backend is ready
}

export enum AUTH_FIELDS {
  ID = "id",
  EMAIL = "email",
  ACCESS_TOKEN = "accessToken",
}
