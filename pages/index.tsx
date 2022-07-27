import { Tab } from "@headlessui/react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import slugify from "slugify";
import AuthHeader from "../components/AuthHeader";
import { CONSTANTS } from "../constants";

const Home: NextPage = () => {
  const router = useRouter();
  const [tab, setTab] = useState(0);
  useEffect(() => {
    if (router.isReady) {
      if (typeof router.query.auth === "string") {
        const reversedSlug = router.query.auth
          .toString()
          .replace("-", " ")
          .replace("s", "S");
        setTab(CONSTANTS.tabsTexts.indexOf(reversedSlug));
      }
    }
  }, [router.isReady, router.query.auth]);

  return (
    <div className="grid place-items-center h-screen">
      <div className="w-fit">
        <Tab.Group
          defaultIndex={0}
          selectedIndex={tab}
          onChange={(index) =>
            router.push(
              `/?auth=${slugify(CONSTANTS.tabsTexts[index], { lower: true })}`,
              undefined,
              {
                shallow: true,
              }
            )
          }
        >
          <Tab.List className="flex gap-4 justify-center items-center rounded-tl-2xl rounded-tr-2xl bg-seagull">
            {CONSTANTS.tabsTexts.map((text, index) => (
              <Tab key={index} as={Fragment}>
                {({ selected }) => (
                  <span
                    className={
                      selected
                        ? "bg-denim text-center text-white text-xl font-medium basis-1/2 py-3 px-16  rounded-t-2xl"
                        : "bg-seagull text-center text-cloud-burst text-xl basis-1/2  font-medium px-16 py-3  rounded-t-2xl"
                    }
                  >
                    {text}
                  </span>
                )}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel>
              <AuthHeader
                title="Welcome"
                description="Please fill your credentials to log into your profile"
              >
                <div>this would be the sign in form</div>
              </AuthHeader>
            </Tab.Panel>
            <Tab.Panel>
              <AuthHeader
                title="Get Started"
                description="Join us filling the next form to create your account"
              >
                <div>this would be the sign up form</div>
              </AuthHeader>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
};

export default Home;
