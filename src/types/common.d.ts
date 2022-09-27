export type AppInputPayloadType = {
  options: ListItem<T>[] | undefined;
  name: string;
  onChange: (event: { target: { name: string; value: T } }) => void;
  icon: JSX.Element;
  placeholder: string;
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
