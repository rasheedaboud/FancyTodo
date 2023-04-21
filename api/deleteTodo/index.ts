import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import verifyToken from "../common/Auth";
import { Todo } from "../../shared/types";
import { deleteTodo } from "../common/AzureTable";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  try {
    const email = await verifyToken(req.headers["x-authorization"]);

    if (email) {
      const todo: Todo = req.body;
      const result = await deleteTodo(todo.id, email as string);

      if (result instanceof Error && result.message) {
        context.log(result.message);
        context.res = { status: 500, body: result.message };
      }
    }
  } catch (error) {
    console.log(error);
    context.res = { status: 500, body: error.message };
  }
};

export default httpTrigger;
