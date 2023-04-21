import "./validation.css";

interface ValidationErrorProps {
  touched: boolean | undefined | any;
  message: string | string[] | undefined | any;
}

const Message = (props: ValidationErrorProps) => {
  return (
    <>
      <div className='validation-message'>{props.touched && props.message}</div>
    </>
  );
};

export const ValidationError = (props: ValidationErrorProps) => {
  return (
    <>
      {props.touched && props.message && (
        <Message message={props.message} touched={props.touched} />
      )}
    </>
  );
};
