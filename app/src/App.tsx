import "./App.css";
import { useGetTodosQuery } from "./todos/hooks/useGetTodos";
import Kanban from "./todos/components/Kanban";
import SfAppBar from "./common/SfAppbar";
import { Container } from "react-bootstrap";
import { useSetUser } from "./auth/Auth";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { usePushChanges } from "./todos/hooks/usePushChanges";

export default function App() {
  const [_, filteredTodos] = useGetTodosQuery();
  usePushChanges();
  const user = useSetUser();

  useEffect(() => {
    if (user) {
      if (user.DisplayName) {
        toast.success(`Welcome ${user.DisplayName}`);
      } else {
        toast.success(`Welcome ${user.FirstName} ${user.LastName}`);
      }
    }
  }, [user]);

  return (
    <div id='App' className='App'>
      <SfAppBar />
      <Container fluid className='mt-2'>
        <Kanban todos={filteredTodos} />
      </Container>
    </div>
  );
}
