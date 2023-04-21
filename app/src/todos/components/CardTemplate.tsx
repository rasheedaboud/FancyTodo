import React, { useEffect } from "react";
import { Todo } from "../../../../shared/types";
import { SfCard } from "../../common/SfCard";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import { v4 as guid } from "uuid";
import { Col, Row } from "react-bootstrap";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import { useMediaQuery } from "react-responsive";
import {
  DropDownButtonComponent,
  ItemModel,
  MenuEventArgs,
} from "@syncfusion/ej2-react-splitbuttons";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { hideEdit, showEdit } from "../todo-slice";
import { Dialog, DialogUtility } from "@syncfusion/ej2-react-popups";
import ConfirmDelete from "../../common/ConfirmDelete";
import useDeleteTodoMutation from "../hooks/useDeleteTodoMutation";
interface FooterProps {
  todo: Todo;
}

const Footer = ({ todo }: FooterProps) => {
  return (
    <Row className='mt-1'>
      <Col lg={6}>
        <span>
          <DatePickerComponent
            value={todo.due ? new Date(todo.due.valueOf()) : null}
            readOnly={true}
            readonly={true}
          />
        </span>
      </Col>
    </Row>
  );
};
const shortenText = (text: string, length: number) => {
  if (text) {
    if (text.length >= length) {
      return text.slice(0, length) + "...";
    } else {
      return text;
    }
  }
};

const shortenTitle = (header: string, isMobile: boolean) => {
  if (header) {
    if (isMobile) {
      return shortenText(header, 20);
    } else {
      return shortenText(header, 75);
    }
  }
};
const dropdownButtonItems: ItemModel[] = [
  {
    text: "Edit",
    id: "Edit",
  },
  {
    text: "Delete",
    id: "Delete",
  },
];
const Header = (todo: Todo) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const selectedTodo = useAppSelector((state) => state.todoState.selectedItem);
  const dispatch = useAppDispatch();
  const deleteTodo = useDeleteTodoMutation();

  const handleDelete = () => {
    deleteTodo(selectedTodo);
  };

  const hanldeSelect = (args: MenuEventArgs) => {
    if (args.item.id === "Edit") {
      dispatch(showEdit());
    }
    if (args.item.id === "Delete") {
      ConfirmDelete({
        cancelAction: () => {},
        okAction: handleDelete,
      });
    }
  };

  return (
    <>
      {isMobile ? (
        <>
          <Row>
            <Col>{shortenTitle(todo.title, isMobile)}</Col>
          </Row>
          <Row>
            <Col>
              <DropDownButtonComponent
                key={guid()}
                cssClass='e-block'
                items={dropdownButtonItems}
                select={hanldeSelect}
                content='Actions'
              />
            </Col>
          </Row>
        </>
      ) : (
        <Row>
          <Col md={10} sm>
            {shortenTitle(todo.title, isMobile)}
          </Col>
          <Col md={2}>
            <DropDownButtonComponent
              key={guid()}
              cssClass='float-end'
              select={hanldeSelect}
              items={dropdownButtonItems}
              content='...'
            />
          </Col>
        </Row>
      )}
    </>
  );
};

const Details = ({ notes, status, priority }: Todo) => {
  return (
    <>
      <Row className='mb-3'>
        <Col>
          <span>
            <i className='fa-solid fa-circle-exclamation'></i>
          </span>
          <span>
            <strong>&nbsp;&nbsp;Priority:{priority}</strong>
          </span>
        </Col>
        <Col>
          <span>
            <i className='fa-solid fa-list-check'></i>
          </span>
          <span>
            <strong>&nbsp;&nbsp;{status}</strong>
          </span>
        </Col>
      </Row>
      <Row>
        <span>
          <strong>Notes:</strong>
        </span>
      </Row>
      <Row>
        <Col>{shortenText(notes, 200)}</Col>
      </Row>
    </>
  );
};

const CardTemplate = (todo: Todo) => {
  return (
    <SfCard
      header={Header(todo)}
      cardActions={""}
      content={
        <>
          <Details {...todo} />
          <Footer todo={todo} />
        </>
      }
    />
  );
};

export default CardTemplate;
