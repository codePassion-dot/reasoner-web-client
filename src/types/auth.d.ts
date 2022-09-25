export type UserKeysType = {
  accessToken: string;
};

export type ResponseType = {
  resource: { accessToken: string } | { id: string; email: string } | null;
  error: {
    code: string;
    detail: { [key: string]: string[] } | string;
  } | null;
};

export type ResponseResourceType =
  | { accessToken: string }
  | { id: string; email: string }
  | null;

export type SignInFieldsType = {
  email: string;
  password: string;
};

export type SignUpFieldsType = {
  email: string;
  password: string;
  confirmPassword: string;
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
