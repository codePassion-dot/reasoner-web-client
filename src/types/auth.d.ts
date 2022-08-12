export type UserKeysType = {
  id: string;
  email: string;
  accessToken: string;
};

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
