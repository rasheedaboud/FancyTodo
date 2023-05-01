import { Form, Formik } from "formik";
import { useAppSelector } from "../../store/store";
import { Todo, priority, todoStatus } from "../../../../shared/types";
import { Col, Row } from "react-bootstrap";
import { SfTextBox } from "../../common/SfTextBox";
import { SfDatePicker } from "../../common/SfDatePicker";
import { SfDropdown } from "../../common/SfDropdown";
import SfSpinButton from "../../common/SfSpinButton";
import useUpdateTodoMutation from "../hooks/useUpdateTodoMutation";
import * as Yup from "yup";
import moment from "moment";

const formSchema = Yup.object().shape({
  id: Yup.string().optional(),
  title: Yup.string().required("Please enter title."),
  status: Yup.string().required("Please select status.").nullable(),
  priority: Yup.string().required("Please select priority.").nullable(),
  due: Yup.date().required("Value is required"),
  notes: Yup.string().required("Please add some notes.").min(10).max(1000),
});

const EditTodo = () => {
  const todo = useAppSelector((state) => state.todoState.selectedItem);
  const update = useUpdateTodoMutation();
  return (
    <>
      <Formik<Partial<Todo>>
        initialValues={{ ...todo }}
        validate={(values) => {
          if (values.due == null) {
            return { due: "Select valid date" };
          }
        }}
        onSubmit={(values) => {
        try{
          update(values);
        }
        catch(error){
          console.log(error)
        }

        }}
        validationSchema={formSchema}
      >
        <Form>
          <Row className='mt-2'>
            <Col>
              <SfTextBox fieldName={"title"} placeholder={"Title"} />
            </Col>
          </Row>
          <Row className='mt-2'>
            <Col>
              <SfDropdown
                fieldName={"status"}
                placeholder={"Status"}
                dataSource={todoStatus}
              />
            </Col>
          </Row>
          <Row className='mt-2'>
            <Col>
              <SfDropdown
                fieldName={"priority"}
                placeholder={"Priority"}
                dataSource={priority}
              />
            </Col>
          </Row>
          <Row className='mt-2'>
            <Col>
              <SfDatePicker fieldName={"due"} placeholder={"Due"} />
            </Col>
          </Row>
          <Row className='mt-2'>
            <Col>
              <SfTextBox
                fieldName={"notes"}
                placeholder={"Notes"}
                multiline={true}
              />
            </Col>
          </Row>
          <Row className='mt-3'>
            <Col>
              <SfSpinButton isloading={false} />
            </Col>
          </Row>
        </Form>
      </Formik>
    </>
  );
};

export default EditTodo;
