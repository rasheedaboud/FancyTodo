import { AutoCompleteComponent } from "@syncfusion/ej2-react-dropdowns";
import { Field, FieldProps } from "formik";
import { ErrorBoundary } from "react-error-boundary";

import { FallBack } from "./FallBack";
import { ValidationError } from "./ValidationError";

interface SfAutoCompleteProps {
  fieldName: string;
  placeholder: string;
  dataSource:
    | any
    | string[]
    | { [key: string]: object }[]
    | number[]
    | boolean[]
    | undefined;
  allowCustom?: boolean;
  readonly?: boolean;
}

export const SfAutoComplete = (props: SfAutoCompleteProps) => {
  const readonly = props.readonly == null ? false : props.readonly;

  return (
    <>
      {props.dataSource ? (
        <ErrorBoundary FallbackComponent={FallBack}>
          <Field name={props.fieldName}>
            {({ field, meta }: FieldProps) => (
              <>
                <AutoCompleteComponent
                  floatLabelType='Always'
                  dataSource={props.dataSource}
                  placeholder={props.placeholder}
                  allowCustom={props.allowCustom}
                  type='text'
                  readOnly={readonly}
                  text={field.value}
                  id={props.fieldName}
                  {...field}
                  cssClass={
                    meta.touched && meta.error ? "invalid-date" : "valid-date"
                  }
                />
                <ValidationError message={meta.error} touched={meta.touched} />
              </>
            )}
          </Field>
        </ErrorBoundary>
      ) : null}
    </>
  );
};
