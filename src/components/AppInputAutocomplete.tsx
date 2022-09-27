import { Combobox, Listbox } from "@headlessui/react";
import { useState } from "react";
import { BiCheck, BiChevronDown, BiChevronUp } from "react-icons/bi";
import { classNames } from "../utils/common";

interface ListItem<T> {
  id: number;
  value: T;
  humanText: string;
}

interface Props<T> {
  options: ListItem<T>[] | undefined;
  name: string;
  onChange: (event: { target: { name: string; value: T } }) => void;
  icon: JSX.Element;
  placeholder: string;
}

const AppInputAutocomplete = <T extends string | boolean | JSX.Element>({
  options,
  onChange,
  name,
  ...rest
}: Props<T>) => {
  const [selectedOption, setSelectedOption] = useState<null | ListItem<T>>(
    null
  );

  const [query, setQuery] = useState("");

  const filteredOptions =
    query === ""
      ? options
      : options?.filter(({ humanText }) => {
          return humanText?.toLowerCase().includes(query.toLowerCase());
        });

  const handleOptionChange = (option: ListItem<T>) => {
    setSelectedOption(option);
    onChange({ target: { name, value: option.value } });
  };

  const determineChild = (option: ListItem<T>) => {
    if (option.humanText) {
      return option.humanText;
    }
    return option.value;
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  return (
    <Combobox value={selectedOption} onChange={handleOptionChange}>
      {({ open }) => (
        <div className="w-80 h-9 relative">
          <div className="flex flex-row gap-4 items-center text-xl font-medium justify-between py-1 px-4 w-full rounded-lg bg-cloud-burst shadow-lg shadow-cloud-burst/50">
            {rest.icon}
            <Combobox.Input
              onChange={handleChange}
              displayValue={(option: any) => option?.humanText}
              className="flex outline-none flex-row justify-between items-center  w-full bg-cloud-burst"
              placeholder={rest.placeholder}
            />
            <Combobox.Button>
              {open ? (
                <BiChevronUp
                  className="h-5 w-5 text-white"
                  aria-hidden="true"
                />
              ) : (
                <BiChevronDown
                  className="h-5 w-5 text-white"
                  aria-hidden="true"
                />
              )}
            </Combobox.Button>
          </div>
          <Combobox.Options className="absolute mt-1 z-10 w-full">
            {filteredOptions?.map((option) => (
              <Combobox.Option
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
              </Combobox.Option>
            ))}
          </Combobox.Options>
        </div>
      )}
    </Combobox>
  );
};

export default AppInputAutocomplete;
