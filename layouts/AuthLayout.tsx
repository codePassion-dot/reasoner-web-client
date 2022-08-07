import { Tab } from "@headlessui/react";
import { useRouter } from "next/router";
import { FC, Fragment } from "react";
import { CONSTANTS } from "../constants";
import Link from "next/link";
import slugify from "slugify";

interface Props {
  children: React.ReactNode;
  index: number;
}

const AuthLayout: FC<Props> = ({ children, index }) => {
  const router = useRouter();
  return (
    <div className="grid place-items-center h-screen bg-no-repeat bg-cover bg-default">
      <div className="rounded-2xl 3xl:w-1/4 4xl:w-1/5 shadow-3xl shadow-white/50">
        <Tab.Group
          defaultIndex={0}
          selectedIndex={index}
          onChange={(index: number) =>
            router.push(
              `/auth/${slugify(CONSTANTS.authText[index], { lower: true })}`
            )
          }
        >
          <Tab.List className="flex gap-4 justify-center items-center rounded-tl-2xl rounded-tr-2xl bg-seagull">
            {CONSTANTS.authText.map((text, index) => (
              <Tab key={index} as={Fragment}>
                {({ selected }) => (
                  <span
                    className={
                      selected
                        ? "bg-denim cursor-pointer outline-none text-center text-white text-xl font-medium basis-1/2 py-3 px-16  rounded-t-2xl"
                        : "bg-seagull cursor-pointer text-center text-cloud-burst text-xl basis-1/2  font-medium px-16 py-3  rounded-t-2xl"
                    }
                  >
                    {text}
                  </span>
                )}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel as={Link} href="/sign-in">
              {children}
            </Tab.Panel>
            <Tab.Panel as={Link} href="/sign-up">
              {children}
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
};

export default AuthLayout;
