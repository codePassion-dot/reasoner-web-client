import { Tab } from "@headlessui/react";
import { useRouter } from "next/router";
import { FC } from "react";
import slugify from "slugify";
import { CONSTANTS } from "../constants";

interface Props {
  children: React.ReactNode;
  tabIndex: number;
}

const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(" ");
};

const AuthLayout: FC<Props> = ({ children, tabIndex }) => {
  const router = useRouter();
  return (
    <div className="grid place-items-center h-screen bg-no-repeat bg-cover bg-default">
      <div className="rounded-2xl 3xl:w-1/4 4xl:w-1/5 shadow-3xl shadow-white/50">
        <Tab.Group
          defaultIndex={0}
          selectedIndex={tabIndex}
          onChange={(index: number) =>
            router.push(
              `/auth/${slugify(CONSTANTS.authText[index], { lower: true })}`
            )
          }
        >
          <Tab.List className="flex gap-4 justify-center items-center rounded-tl-2xl rounded-tr-2xl bg-seagull">
            {CONSTANTS.authText.map((text, index) => (
              <Tab
                key={`${text}-${index}`}
                className={({ selected }: { selected: boolean }) =>
                  classNames(
                    "cursor-pointer outline-none text-center text-white text-xl font-medium basis-1/2 py-3 px-16  rounded-t-2xl",
                    selected
                      ? "bg-denim text-white"
                      : "bg-seagull text-cloud-burst"
                  )
                }
              >
                {text}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel>{children}</Tab.Panel>
            <Tab.Panel>{children}</Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
};

export default AuthLayout;
