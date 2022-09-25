export type AppInputSelectType = <T extends []>(
  options: { id: string; value: T }[]
) => JSX.Element;
