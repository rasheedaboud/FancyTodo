import { Context, HttpRequest } from "@azure/functions";

import { listAllTodos } from "../common/AzureTable";
import verifyToken from "../common/Auth";

export default async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  try {
    const email = await verifyToken(req.headers["x-authorization"]);

    if (email) {
      const data = await listAllTodos();

      context.res = { status: 200, body: JSON.stringify(data) };
    }
  } catch (error) {
    console.log(error);
    context.res = { status: 500, body: error.message };
  }
}
