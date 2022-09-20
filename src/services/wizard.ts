import { REQUEST_TYPE } from "../constants/wizard";
import { WizardFieldsType } from "../types/wizard";
import axios, { AxiosResponse } from "axios";

export const makeRequest = async (
  requestType: REQUEST_TYPE,
  body: WizardFieldsType,
  accessToken: string
): Promise<{
  error: { code: string; detail: { [key: string]: string[] } | string };
}> => {
  const domain = "parameterizer";
  try {
    let response = { data: {} } as AxiosResponse<{
      error: { code: string; detail: { [key: string]: string[] } | string };
    }>;
    if (requestType === REQUEST_TYPE.DATABASE) {
      const url = new URL(
        `${process.env.NEXT_PUBLIC_API_URL}/${domain}/${requestType}`
      );

      response = await axios.post(url.toString(), body, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
    }
    if (requestType === REQUEST_TYPE.SCHEMA) {
      const url = new URL(
        `${process.env.NEXT_PUBLIC_API_URL}/${domain}/${requestType}`
      );

      response = await axios.patch(url.toString(), body, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
    }

    return { error: response.data.error };
  } catch (error) {
    return { error: { code: "unexpected_error", detail: "Unexpected error" } };
  }
};
