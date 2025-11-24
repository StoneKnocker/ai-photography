import { getRequestContext } from "~/server/cf.server";

const getDb = () => getRequestContext().env.DB;

export { getDb };
