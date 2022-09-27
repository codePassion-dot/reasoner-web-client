import useUser from "../hooks/useUser";
import Loading from "./Loading";

const WithAuthentication = <T,>(WrappedComponent: React.ComponentType<T>) => {
  const ComponentWithAuthentication = (props: T) => {
    const { loading, user } = useUser({ redirectTo: "/auth/sign-in" });
    if (loading || !user) {
      return <Loading />;
    }
    return <WrappedComponent {...props} userId={user} />;
  };
  return ComponentWithAuthentication;
};

export default WithAuthentication;
