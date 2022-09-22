import useUser from "../hooks/useUser";

const WithAuthentication = <T,>(WrappedComponent: React.ComponentType<T>) => {
  const ComponentWithAuthentication = (props: T) => {
    const { loading, user } = useUser({ redirectTo: "/auth/sign-in" });
    if (loading || !user) {
      return <div>Loading...</div>;
    }
    return <WrappedComponent {...props} userId={user} />;
  };
  return ComponentWithAuthentication;
};

export default WithAuthentication;
