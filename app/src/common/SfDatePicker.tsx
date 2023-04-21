import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import { Field, FieldProps } from "formik";
import { ErrorBoundary } from "react-error-boundary";

import { FallBack } from "./FallBack";
import { ValidationError } from "./ValidationError";
import "./validation.css";
interface SfDatePickerProps {
  fieldName: string;
  placeholder: string;
  readonly?: boolean;
}

export const SfDatePicker = (props: SfDatePickerProps) => {
  const readonly = props.readonly == null ? false : props.readonly;

  return (
    <>
      <ErrorBoundary FallbackComponent={FallBack}>
        <Field name={props.fieldName}>
          {({ field, meta }: FieldProps) => (
            <>
              <DatePickerComponent
                floatLabelType='Always'
                placeholder={props.placeholder}
                type='date'
                readOnly={readonly}
                id={props.fieldName}
                {...field}
                cssClass={meta.touched && meta.error ? "invalid-date" : null}
              />
              <ValidationError message={meta.error} touched={meta.touched} />
            </>
          )}
        </Field>
      </ErrorBoundary>
    </>
  );
};
