import { Tab } from "@headlessui/react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import slugify from "slugify";
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
          <Tab.List className="flex flex-row gap-4 rounded-tl-2xl rounded-tr-2xl bg-seagull">
            {CONSTANTS.tabsTexts.map((text, index) => (
              <Tab key={index} as={Fragment}>
                {({ selected }) => (
                  <span
                    className={
                      selected
                        ? "bg-cerulean text-white text-xl font-medium py-3 px-16 rounded-t-2xl"
                        : "bg-seagull text-cloud-burst text-xl py-3 font-medium px-16 rounded-t-2xl"
                    }
                  >
                    {text}
                  </span>
                )}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel>Content 1</Tab.Panel>
            <Tab.Panel>Content 2</Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
};

export default Home;
