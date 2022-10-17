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
}: MakeRequestType): Promise<ResponseType> => {
  const domain = "parameterizer";
  try {
    let response = { data: {} } as AxiosResponse<ResponseType>;
    if (requestType === REQUEST_TYPE.DATABASE) {
      const url = new URL(
        `${process.env.NEXT_PUBLIC_API_URL}/${domain}/${requestType}`
      );

      response = await authenticatedInstance.post(url.toString(), body, {
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

      response = await authenticatedInstance.patch(url.toString(), body, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
    }

    if (requestType === REQUEST_TYPE.SCHEMA_GET) {
      const url = new URL(
        `${process.env.NEXT_PUBLIC_API_URL}/${domain}/${requestType}`
      );

      response = await authenticatedInstance.get(url.toString(), {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
    }

    if (requestType === REQUEST_TYPE.TABLES_GET) {
      const url = new URL(
        `${process.env.NEXT_PUBLIC_API_URL}/${domain}/${requestType}`
      );

      response = await authenticatedInstance.post(url.toString(), body, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
    }

    if (requestType === REQUEST_TYPE.COLUMNS_GET) {
      const url = new URL(
        `${process.env.NEXT_PUBLIC_API_URL}/${domain}/${requestType}`
      );
      response = await authenticatedInstance.get(url.toString(), {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
    }

    if (requestType === REQUEST_TYPE.COLUMNS_POST) {
      const url = new URL(
        `${process.env.NEXT_PUBLIC_API_URL}/${domain}/${requestType}`
      );
      response = await authenticatedInstance.post(url.toString(), body, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
    }

    if (requestType === REQUEST_TYPE.COLUMNS_TYPE_GET) {
      const url = new URL(
        `${process.env.NEXT_PUBLIC_API_URL}/${domain}/${requestType}`
      );
      response = await authenticatedInstance.get(url.toString(), {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
    }

    if (requestType === REQUEST_TYPE.COLUMNS_TYPE_POST) {
      const url = new URL(
        `${process.env.NEXT_PUBLIC_API_URL}/${domain}/${requestType}`
      );
      response = await authenticatedInstance.post(url.toString(), body, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
    }

    if (requestType === REQUEST_TYPE.COLUMNS_SELECTED_ORDINAL_GET) {
      const url = new URL(
        `${process.env.NEXT_PUBLIC_API_URL}/${domain}/${requestType}`
      );
      response = await authenticatedInstance.get(url.toString(), {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
    }

    if (requestType === REQUEST_TYPE.COLUMNS_SELECTED_ORDINAL_POST) {
      const url = new URL(
        `${process.env.NEXT_PUBLIC_API_URL}/${domain}/${requestType}`
      );
      response = await authenticatedInstance.post(url.toString(), body, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
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
