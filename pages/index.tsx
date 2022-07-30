import { Tab } from "@headlessui/react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import slugify from "slugify";
import AuthHeader from "../components/AuthHeader";
import { CONSTANTS } from "../constants";
import * as Yup from "yup";
import { BsPerson } from "react-icons/bs";
import { RiLockPasswordLine } from "react-icons/ri";
import AuthFormGeneric from "../components/AuthFormGeneric";

const Home: NextPage = () => {
  const router = useRouter();
  const [tab, setTab] = useState(0);
  const validationSchemaSignIn = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .min(8, "Too short")
      .max(14, "Too long")
      .test(
        "password",
        "Password must contain at least one uppercase",
        (value) => typeof value === "string" && /[A-Z]/.test(value)
      )
      .test(
        "password",
        "Password must contain at least one lowercase",
        (value) => typeof value === "string" && /[a-z]/.test(value)
      )
      .test(
        "password",
        "Password must contain at least one special character",
        (value) =>
          typeof value === "string" &&
          /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value)
      )
      .required("Required"),
  });
  const validationSchemaSignUp = validationSchemaSignIn.shape({
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Required"),
  });

  const signInFields = [
    {
      name: "email",
      placeholder: "Enter your email",
      icon: <BsPerson className="text-2xl text-white" />,
      type: "email",
      htmlFor: "email",
    },
    {
      name: "password",
      placeholder: "Enter your password",
      icon: <RiLockPasswordLine className="text-2xl text-white" />,
      type: "password",
      htmlFor: "password",
    },
  ];
  const signUpFields = [
    ...signInFields,
    {
      name: "confirmPassword",
      placeholder: "Confirm your password",
      icon: <RiLockPasswordLine className="text-2xl text-white" />,
      type: "password",
      htmlFor: "confirmPassword",
    },
  ];
  useEffect(() => {
    if (router.isReady) {
      if (typeof router.query.auth === "string") {
        const reversedSlug = router.query.auth
          .toString()
          .replace("-", " ")
          .replace("s", "S");
        setTab(CONSTANTS.authText.indexOf(reversedSlug));
      }
    }
  }, [router.isReady, router.query.auth]);

  return (
    <div className="grid place-items-center h-screen bg-no-repeat bg-cover bg-default">
      <div className="rounded-2xl 3xl:w-1/4 4xl:w-1/5 shadow-3xl shadow-white/50">
        <Tab.Group
          defaultIndex={0}
          selectedIndex={tab}
          onChange={(index: number) =>
            router.push(
              `/?auth=${slugify(CONSTANTS.authText[index], { lower: true })}`,
              undefined,
              {
                shallow: true,
              }
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
            <Tab.Panel>
              <AuthHeader
                title="Welcome"
                description="Please fill your credentials to log into your profile"
              >
                <AuthFormGeneric
                  fields={signInFields}
                  validationSchema={validationSchemaSignIn}
                  buttonText={CONSTANTS.authText[0]}
                />
              </AuthHeader>
            </Tab.Panel>
            <Tab.Panel>
              <AuthHeader
                title="Get Started"
                description="Join us filling the next form to create your account"
              >
                <AuthFormGeneric
                  fields={signUpFields}
                  validationSchema={validationSchemaSignUp}
                  buttonText={CONSTANTS.authText[1]}
                />
              </AuthHeader>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
};

export default Home;
