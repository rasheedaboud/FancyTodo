import { MultiSelectComponent } from "@syncfusion/ej2-react-dropdowns";
import { Field, FieldProps } from "formik";
import { ErrorBoundary } from "react-error-boundary";

import { FallBack } from "./FallBack";
import { ValidationError } from "./ValidationError";
import "./validation.css";
interface SfMultiSelectProps {
  fieldName: string;
  placeholder: string;
  dataSource:
    | any
    | string[]
    | { [key: string]: object }[]
    | number[]
    | boolean[]
    | undefined;
  readonly?: boolean;
  allowCustomValue?: boolean;
}

export const SfMultiSelect = (props: SfMultiSelectProps) => {
  const readonly = props.readonly == null ? false : props.readonly;

  return (
    <>
      {props.dataSource ? (
        <ErrorBoundary FallbackComponent={FallBack}>
          <Field name={props.fieldName}>
            {({ field, meta }: FieldProps) => (
              <>
                <MultiSelectComponent
                  floatLabelType='Always'
                  filterType='Contains'
                  allowFiltering={true}
                  dataSource={props.dataSource}
                  placeholder={props.placeholder}
                  allowCustomValue={props.allowCustomValue}
                  id={props.fieldName}
                  readonly={readonly}
                  readOnly={readonly}
                  {...field}
                  cssClass={meta.touched && meta.error ? "invalid-date" : null}
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
