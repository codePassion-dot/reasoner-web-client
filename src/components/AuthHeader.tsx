import Image from "next/image";
import { FC } from "react";
import {
  AuthHeaderHorizontalDots,
  AuthHeaderVerticalDots,
} from "../../public/icons";
import leftPerson from "../../public/auth-header-left-person.png";
import rightPerson from "../../public/auth-header-right-person.png";
interface Props {
  children: React.ReactNode;
  title: string;
  description: string;
}
const AuthHeader: FC<Props> = ({ children, title, description }) => {
  return (
    <>
      <div className="flex relative flex-row justify-between pt-9 bg-gradient-to-r from-denim to-cerulean">
        <Image src={leftPerson} width={142} height={167} alt="leftPerson" />
        <div className="flex flex-col basis-8/12">
          <h1 className="flex flex-col text-5xl font-bold text-center text-white">
            <span>{title}</span>
            <span className="mt-2 text-sm text-center">{description}</span>
            <AuthHeaderHorizontalDots styles="mx-auto mt-3" />
          </h1>
        </div>
        <Image
          src={rightPerson}
          width={123}
          height={167}
          alt="rightPerson"
          className="z-10"
        />
        <AuthHeaderVerticalDots styles="right-0 top-0 mt-5 absolute z-0 mr-3" />
      </div>
      {children}
    </>
  );
};

export default AuthHeader;
