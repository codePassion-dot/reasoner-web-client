import { FC } from "react";
import AuthTab from "../components/AuthTab";

interface Props {
    children: React.ReactNode;
    title: string;
}

const AuthHeaderLayout: FC<Props> = ({ children, title }) => {
    return (
        <div className="grid place-items-center h-screen bg-no-repeat bg-cover bg-default">
            <div className="rounded-2xl 3xl:w-1/4 4xl:w-1/5 shadow-3xl shadow-white/50">
                <div className="text-center pt-3 text-white text-2xl font-medium outline-none rounded-2xl bg-gradient-to-r from-denim to-cerulean ">
                    <div className="outline-none rounded-2xl bg-gradient-to-r from-denim to-cerulean ">
                        {title}
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default AuthHeaderLayout;
