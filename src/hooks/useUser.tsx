import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

axios.defaults.withCredentials = true;

interface Props {
  redirectTo: string;
}

const useUser = ({ redirectTo }: Props) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const checkIfUserIsAuthenticated = async () => {
      setLoading(true);
      try {
        const url = new URL(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/check-if-logged-in`
        );
        const response = await axios.get(url.toString());
        setUser(response.data);
      } catch (error: any) {
        setUser(null);
        if (redirectTo) {
          router.push(redirectTo);
        }
      }
      setLoading(false);
    };
    checkIfUserIsAuthenticated();
  }, [redirectTo, router]);

  return { loading, user };
};

export default useUser;
