import { REQUEST_TYPE } from "../constants/wizard";
import {
  MakeRequestType,
  ResponseType,
  WizardFieldsType,
} from "../types/wizard";
import { AxiosResponse } from "axios";
import { authenticatedInstance } from "../utils/api";

export const makeRequest = async ({
  requestType,
  body,
  accessToken,
  apiVerb,
  domain = "parameterizer",
}: MakeRequestType): Promise<ResponseType> => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  };
  try {
    let response = { data: {} } as AxiosResponse<ResponseType>;
    if (body) {
      const url = new URL(
        `${process.env.NEXT_PUBLIC_API_URL}/${domain}/${requestType}`
      );
      if (apiVerb === "patch") {
        response = await authenticatedInstance.patch(url.toString(), body, {
          headers,
        });
      }
      response = await authenticatedInstance.post(url.toString(), body, {
        headers,
      });
    } else {
      const url = new URL(
        `${process.env.NEXT_PUBLIC_API_URL}/${domain}/${requestType}`
      );

      response = await authenticatedInstance.get(url.toString(), {
        headers,
      });
    }
    return response.data;
  } catch (error) {
    return {
      error: { code: "unexpected_error", detail: "Unexpected error" },
      resource: null,
    };
  }
};
