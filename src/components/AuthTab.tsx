import { Tab } from "@headlessui/react";
import { FC } from "react";
import slugify from "slugify";

import { useRouter } from "next/router";
import { UI_REQUEST_TYPE } from "../ui/fields/auth";

interface Props {
    children: React.ReactNode;
    tabIndex?: number;
}

const classNames = (...classes: string[]) => {
    return classes.filter(Boolean).join(" ");
};

const AuthTab: FC<Props> = ({ children, tabIndex }) => {
    const router = useRouter();
    return (
        <Tab.Group
            defaultIndex={0}
            selectedIndex={tabIndex}
            onChange={(index: number) =>
                router.push(
                    `/auth/${slugify(UI_REQUEST_TYPE[index], { lower: true })}`
                )
            }
        >
            <Tab.List className="flex justify-center items-center rounded-tl-2xl rounded-tr-2xl bg-seagull">
                {UI_REQUEST_TYPE.map((text, index) => (
                    <Tab
                        key={`${text}-${index}`}
                        className={({ selected }: { selected: boolean }) =>
                            classNames(
                                "cursor-pointer outline-none text-center text-xl font-medium basis-1/2 py-3 px-16  rounded-t-2xl",
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
    )
}

export default AuthTab