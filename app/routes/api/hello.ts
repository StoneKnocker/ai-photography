import type { LoaderFunctionArgs } from "react-router";
import { getRequestContext } from "~/server/cf.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const cf = getRequestContext();
  const db = cf.env.DB;
  const data = await db.prepare("select * from account").first();
  return Response.json({ data });
}
