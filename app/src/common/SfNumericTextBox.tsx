import { NumericTextBoxComponent } from "@syncfusion/ej2-react-inputs";
import { Field, FieldProps } from "formik";
import { ErrorBoundary } from "react-error-boundary";

import { FallBack } from "./FallBack";
import { ValidationError } from "./ValidationError";

interface SfNumericTextBoxProps {
  fieldName: string;
  placeholder: string;
  readonly?: boolean;
  min?: number;
  max?: number;
  step?: number;
  decimals?: number;
}

export const SfNumericTextBox = (props: SfNumericTextBoxProps) => {
  const readonly = props.readonly == null ? false : props.readonly;

  return (
    <>
      <ErrorBoundary FallbackComponent={FallBack}>
        <Field name={props.fieldName}>
          {({ field, meta, form }: FieldProps) => (
            <>
              <NumericTextBoxComponent
                floatLabelType='Always'
                placeholder={props.placeholder}
                decimals={props.decimals}
                readonly={props.readonly}
                min={props.min}
                max={props.max}
                step={props.step}
                id={props.fieldName}
                readOnly={readonly}
                change={field.onChange}
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
