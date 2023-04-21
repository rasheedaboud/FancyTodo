import { useRef } from "react";
import { Todo } from "../../../../shared/types";
import {
  CardClickEventArgs,
  ColumnDirective,
  ColumnsDirective,
  DragEventArgs,
  KanbanComponent,
} from "@syncfusion/ej2-react-kanban";
import CardTemplate from "./CardTemplate";
import Toolbar from "./Toolbar";
import { v4 as guid } from "uuid";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { hideEdit, selectItem, showEdit } from "../todo-slice";
import { SfDialog } from "../../common/SfDialog";
import { useMediaQuery } from "react-responsive";
import EditTodo from "./EditTodo";
import { extend } from "@syncfusion/ej2-base";
import useUpdateTodoMutation from "../hooks/useUpdateTodoMutation";
interface KanbanProps {
  todos: Todo[];
}

const Kanban = ({ todos }: KanbanProps) => {
  const kanban = useRef<KanbanComponent | null>();
  const showEditDialog = useAppSelector((state) => state.todoState.showEdit);
  const dispatch = useAppDispatch();
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const update = useUpdateTodoMutation();

  const handleDoubleClick = (args: CardClickEventArgs) => {
    args.cancel = true;
    dispatch(showEdit());
  };
  const handleClick = (args: CardClickEventArgs) => {
    args.cancel = true;
    const data = args.data as Todo;
    if (data) {
      dispatch(selectItem(data));
    }
  };
  //REQUIRED FOR DRAG DROP TO WORK
  let data = extend([], todos, null, true) as Todo[];

  const handleDragStop = (args: DragEventArgs) => {
    if (args.data) {
      const todo = args.data[0] as Todo;
      if (todo) {
        update(todo);
      }
    }
  };

  return (
    <>
      {showEditDialog ? (
        <SfDialog
          isSmallScreen={isMobile}
          header={"Edit Todo"}
          width='50%'
          height='30rem'
          content={<EditTodo />}
          close={() => dispatch(hideEdit())}
        />
      ) : null}
      <Toolbar />
      <KanbanComponent
        ref={kanban}
        id='userTodos'
        keyField='status'
        dataSource={data}
        allowDragAndDrop={true}
        dragStop={handleDragStop}
        cardDoubleClick={handleDoubleClick}
        cardClick={handleClick}
        cardSettings={{
          contentField: "notes",
          headerField: "title",
          template: CardTemplate.bind(this),
        }}
        swimlaneSettings={{ allowDragAndDrop: true }}
        width={"100%"}
        height={"100vh"}
        dialogSettings={{ template: CardTemplate.bind(this as Todo) }}
      >
        <ColumnsDirective>
          <ColumnDirective
            key={guid()}
            headerText={"Not Started"}
            keyField={"Not Started"}
            allowToggle={true}
          />
          <ColumnDirective
            key={guid()}
            headerText={"In Progress"}
            keyField={"In Progress"}
            allowToggle={true}
          />
          <ColumnDirective
            key={guid()}
            headerText={"Complete"}
            keyField={"Complete"}
            allowToggle={true}
          />
        </ColumnsDirective>
      </KanbanComponent>
    </>
  );
};

export default Kanban;
