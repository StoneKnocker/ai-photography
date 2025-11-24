import { type AppLoadContext } from "react-router";

let instance: AppLoadContext["cloudflare"];

export const getRequestContext = (value?: AppLoadContext["cloudflare"]) => {
  if (value) {
    instance = value;
  }
  // console.log("getRequestContext:", instance);
  return instance;
};
