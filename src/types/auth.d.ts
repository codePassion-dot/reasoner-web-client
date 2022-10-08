import { ErrorResponseType } from "./common";

export type UserKeysType = {
  accessToken: string;
};

export type SignInFieldsType = {
  email: string;
  password: string;
};

export type ResponseResourceType =
  | { accessToken: string }
  | { id: string; email: string }
  | null;

export type SignUpFieldsType = {
  email: string;
  password: string;
  confirmPassword: string;
};

export type ResponseType = {
  resource: { accessToken: string } | { id: string; email: string } | null;
  error: ErrorResponseType;
};
export type RecoverFieldsType = {
  email: string;
};

export type ResetFieldsType = {
  password: string;
  confirmPassword: string;
};

export type AuthFieldsType =
  | SignInFieldsType
  | SignUpFieldsType
  | RecoverFieldsType
  | ResetFieldsType;
