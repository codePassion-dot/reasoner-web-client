import { REQUEST_TYPE } from "../constants/auth";
import { AuthFieldsType, ResponseType } from "../types/auth";
import axios, { AxiosResponse } from "axios";

export const makeRequest = async (
  requestType: REQUEST_TYPE,
  body: AuthFieldsType,
  urlQuery?: Record<string, string>
): Promise<ResponseType> => {
  try {
    let response = { data: {} } as AxiosResponse<ResponseType>;
    if (
      requestType === REQUEST_TYPE.SIGN_IN ||
      requestType === REQUEST_TYPE.SIGN_UP
    ) {
      response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/${requestType}`,
        body
      );
    }
    if (requestType === REQUEST_TYPE.PASSWORD_RECOVERY) {
      const searchParams = new URLSearchParams(body);
      const url = new URL(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/${requestType}`
      );
      url.search = searchParams.toString();

      response = await axios.get(url.toString());
    }

    if (requestType === REQUEST_TYPE.PASSWORD_RESET) {
      const searchParams = new URLSearchParams(urlQuery);
      const url = new URL(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/${requestType}`
      );

      url.search = searchParams.toString();

      response = await axios.patch(url.toString(), body);
    }
    return response.data;
  } catch (error) {
    return {
      error: {
        code: "unexpected_error",
        detail: "Unexpected error",
      },
      resource: null,
    };
  }
};
