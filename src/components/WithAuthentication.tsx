import { useSelector } from "react-redux";
import { selectUser } from "../store/selectors/users";
import { useRouter } from "next/router";
import { useEffect } from "react";

const WithAuthentication = <T,>(WrappedComponent: React.ComponentType<T>) => {
  const ComponentWithAuthentication = (props: T) => {
    // TODO: we should do this but with the refresh token instead
    const user = useSelector(selectUser);
    const router = useRouter();
    useEffect(() => {
      if (!user.accessToken) {
        router.replace("/auth/sign-in");
      }
    }, [router, user.accessToken]);

    return <WrappedComponent {...props} />;
  };
  return ComponentWithAuthentication;
};

export default WithAuthentication;
