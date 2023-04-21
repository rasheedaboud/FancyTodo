import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import Icons from "../../common/Icons";
import { Col, Container, Row } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";
import {
  ChangeEventArgs,
  ComboBoxComponent,
} from "@syncfusion/ej2-react-dropdowns";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { Todo, newTodo } from "../../../../shared/types";
import { clearFilter, selectItem, setFilter, showEdit } from "../todo-slice";
import "./Toolbar.css";

export const AddButton = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(selectItem(newTodo()));
    dispatch(showEdit());
  };

  return (
    <>
      {isMobile ? (
        <TooltipComponent target='#AddItem' content={"Add Record"}>
          <ButtonComponent
            id='AddItem'
            type='button'
            className='e-block mt-3 wiggle-btn e-success'
            iconCss={Icons.Add}
            content='Add Todo'
            onClick={handleClick}
          />
        </TooltipComponent>
      ) : (
        <TooltipComponent target='#AddItem' content={"Add Record"}>
          <ButtonComponent
            id='AddItem'
            type='button'
            className='float-end wiggle-btn e-success'
            iconCss={Icons.Add}
            content='Add Todo'
            onClick={handleClick}
          />
        </TooltipComponent>
      )}
    </>
  );
};
export const Search = () => {
  const todos: Todo[] = useAppSelector((state) => state.todoState.todos);
  const filteredTodos: Todo[] = useAppSelector(
    (state) => state.todoState.filter
  );
  const dispatch = useAppDispatch();

  const handleSearch = (item: ChangeEventArgs) => {
    const data = item.itemData as Todo;
    if (data) {
      dispatch(setFilter([data]));
    } else {
      dispatch(clearFilter());
    }
  };

  return (
    <>
      <TooltipComponent target='#SeachTodo' content={"Search todos"}>
        <ComboBoxComponent
          id='SeachTodo'
          className='mt-2'
          floatLabelType='Auto'
          allowFiltering={true}
          filterType='Contains'
          placeholder='Search Todos'
          dataSource={todos}
          change={handleSearch}
          fields={{ text: "title", value: "title" }}
        />
      </TooltipComponent>
    </>
  );
};
const Toolbar = () => {
  const isMobile = useMediaQuery({ maxWidth: 565 });

  return (
    <Container fluid>
      <Row className='mt-2 mb-3'>
        <Col lg={2} md={3} sm={3}>
          <Search />
        </Col>
        <Col
          className={
            isMobile ? null : "d-flex justify-content-end align-items-center"
          }
        >
          <AddButton />
        </Col>
      </Row>
    </Container>
  );
};

export default Toolbar;
