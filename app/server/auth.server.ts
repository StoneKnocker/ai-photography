import { betterAuth } from "better-auth";
import { D1Dialect } from "@atinux/kysely-d1";
import { getRequestContext } from "./cf.server";

const cf = getRequestContext();
console.log("cf", cf);
const dialect = new D1Dialect({ database: cf.env.DB });

export const auth = betterAuth({
  database: {
    dialect,
    type: "sqlite",
  },
  socialProviders: {
    google: {
      clientId: cf.env.GOOGLE_CLIENT_ID as string,
      clientSecret: cf.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
});
