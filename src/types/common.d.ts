import { DependentFields } from "./wizard";

export type AppInputPayloadType = {
  options: ListItem<T>[] | undefined;
  name: string;
  onChange: (event: { target: { name: string; value: T } }) => void;
  icon: JSX.Element;
  placeholder: string;
  dependentFields?: DependentFields;
  setItemOptions: (field: string, options: ListItem<T>[]) => void;
  value: T;
};

export type AppInputSelectType = <T extends string | boolean | JSX.Element>({
  options,
  field,
  ...rest
}: AppInputPayloadType) => JSX.Element;

export type AppInputAutocompleteType = <
  T extends string | boolean | JSX.Element
>({
  options,
  field,
  ...rest
}: AppInputPayloadType) => JSX.Element;

export type ErrorResponseType = {
  code: string;
  detail: { [key: string]: string[] } | string;
};

export interface ListItem<T> {
  id: number;
  value: T;
  humanText?: string;
}
