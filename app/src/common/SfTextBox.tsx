import { TextBoxComponent } from "@syncfusion/ej2-react-inputs";
import { Field, FieldProps } from "formik";
import { ErrorBoundary } from "react-error-boundary";

import { FallBack } from "./FallBack";
import { ValidationError } from "./ValidationError";

interface SfTextBoxProps {
  fieldName: string;
  placeholder: string;
  readonly?: boolean;
  multiline?: boolean;
  type?: string;
}

export const SfTextBox = (props: SfTextBoxProps) => {
  const readonly = props.readonly == null ? false : props.readonly;

  return (
    <>
      <ErrorBoundary FallbackComponent={FallBack}>
        <Field name={props.fieldName}>
          {({ field, meta }: FieldProps) => (
            <>
              <TextBoxComponent
                floatLabelType='Always'
                autocomplete='on'
                multiline={props.multiline}
                placeholder={props.placeholder}
                type={props.type ?? "text"}
                id={props.fieldName}
                readOnly={readonly}
                {...field}
                cssClass={meta.touched && meta.error ? "invalid" : null}
              />
              <ValidationError message={meta.error} touched={meta.touched} />
            </>
          )}
        </Field>
      </ErrorBoundary>
    </>
  );
};
