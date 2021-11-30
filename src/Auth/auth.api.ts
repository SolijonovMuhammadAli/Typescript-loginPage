import Axios from "axios";
import { AxiosRequestConfig } from "axios";

export interface Credantials {
  username: string;
  password: string;
}

interface LoginApiResponse {
  created: string;
  id: string;
  token: string;
  username: string;
}

export const onLogin = async (data: Credantials) => {
  const requestConfig: AxiosRequestConfig = {
    method: "post",
    url: process.env.REACT_APP_BASE_URL + "/login",
    data,
  };
  try {
    const { data: response } = await Axios.request<LoginApiResponse>(
      requestConfig
    );
    storeToken(response.token);
    return {
      token: response.token,
    };
  } catch (err) {
    console.error(err);
    return { error: "Error data" };
  }
};

export const onRegister = async (data: Credantials) => {
  const requestConfig: AxiosRequestConfig = {
    method: "post",
    url: process.env.REACT_APP_BASE_URL + "/register",
    data,
  };

  try {
    const { data: response } = await Axios.request(requestConfig);
    return response;
  } catch (err) {
    console.error(err);
    return { error: "Don't send" };
  }
};

export const TOKEN_KEY = "bounce_item_token_key";

const storeToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
};
