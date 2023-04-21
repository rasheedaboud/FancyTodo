import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { addTodo } from "../common/AzureTable";
import { Todo } from "../../shared/types";
import verifyToken from "../common/Auth";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  try {
    const email = await verifyToken(req.headers["x-authorization"]);
    const todo: Todo = req.body;
    if (!todo) {
      context.res = { status: 400, body: "invalid todo" };
    } else if (email) {
      await addTodo(todo, email);
    }
  } catch (error) {
    console.log(error);
    throw Error(error);
  }
};

export default httpTrigger;
