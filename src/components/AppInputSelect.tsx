import { Listbox } from "@headlessui/react";
import { useEffect, useState } from "react";
import { BiCheck, BiChevronDown, BiChevronUp } from "react-icons/bi";
import { classNames } from "../utils/common";

interface ListItem<T> {
  id: number;
  value: T;
  humanText?: string;
}

interface Props<T> {
  options: ListItem<T>[] | undefined;
  name: string;
  field: {
    name: string;
    onChange: (event: { target: { name: string; value: T } }) => void;
  };
  icon: JSX.Element;
  placeholder: string;
}

const AppInputSelect = <T extends string | boolean | JSX.Element>({
  options,
  field,
  ...rest
}: Props<T>) => {
  const [selectedOption, setSelectedOption] = useState<null | ListItem<T>>(
    null
  );

  const handleOptionChange = (option: ListItem<T>) => {
    setSelectedOption(option);
    field.onChange({ target: { name: field.name, value: option.value } });
  };

  const determineChild = (option: ListItem<T>) => {
    if (option.humanText) {
      return option.humanText;
    }
    return option.value;
  };

  return (
    <Listbox
      value={selectedOption}
      onChange={handleOptionChange}
      name={field.name}
    >
      {({ open }) => (
        <div className="w-80 h-9">
          <Listbox.Button className="flex text-xl font-medium flex-row justify-between items-center py-1 px-4 w-full rounded-lg bg-cloud-burst shadow-lg shadow-cloud-burst/50  ">
            <div className="flex flex-row gap-4 items-center">
              {rest.icon}
              <span
                className={classNames(
                  "rounded-xl outline-none bg-cloud-burst",
                  !selectedOption ? "text-slate-500 text-base" : "text-white"
                )}
              >
                {selectedOption
                  ? determineChild(selectedOption)
                  : rest.placeholder}
              </span>
            </div>
            {open ? (
              <BiChevronUp className="h-5 w-5 text-white" aria-hidden="true" />
            ) : (
              <BiChevronDown
                className="h-5 w-5 text-white"
                aria-hidden="true"
              />
            )}
          </Listbox.Button>
          <Listbox.Options className="mt-1">
            {options?.map((option) => (
              <Listbox.Option
                key={option.id}
                value={option}
                className="bg-cloud-burst"
              >
                {({ selected, active }) => (
                  <div
                    className={classNames(
                      "flex justify-start flex-row text-xl items-center gap-1",
                      active ? " bg-east-bay" : "opacity-100"
                    )}
                  >
                    {selected ? (
                      <BiCheck className="w-6 h-6" />
                    ) : (
                      <div className="w-6"></div>
                    )}
                    {determineChild(option)}
                  </div>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      )}
    </Listbox>
  );
};

export default AppInputSelect;
