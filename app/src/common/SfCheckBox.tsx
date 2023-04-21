import {
  CheckBoxComponent,
  LabelPosition,
} from "@syncfusion/ej2-react-buttons";
import { Field, FieldProps } from "formik";
import { ErrorBoundary } from "react-error-boundary";
import { FallBack } from "./FallBack";
import "./validation.css";

interface SfCheckBoxProps {
  fieldName: string;
  label: string;
  readonly?: boolean;
  labelPosition?: LabelPosition;
}

export const SfCheckBox = (props: SfCheckBoxProps) => {
  const readonly = props.readonly == null ? false : props.readonly;

  return (
    <>
      <ErrorBoundary FallbackComponent={FallBack}>
        <Field name={props.fieldName}>
          {({ field, meta }: FieldProps) => (
            <>
              <CheckBoxComponent
                label={props.label}
                change={field.onChange}
                labelPosition={props.labelPosition ?? "Before"}
                id={props.fieldName}
                readOnly={readonly}
                {...field}
              />
            </>
          )}
        </Field>
      </ErrorBoundary>
    </>
  );
};
