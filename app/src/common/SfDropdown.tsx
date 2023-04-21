import {
  DropDownListComponent,
  FieldSettingsModel,
} from "@syncfusion/ej2-react-dropdowns";
import { Field, FieldProps } from "formik";
import { useRef } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { FallBack } from "./FallBack";
import { ValidationError } from "./ValidationError";
import "./validation.css";
interface SfDropdownProps {
  fieldName: string;
  placeholder: string;
  dataSource: any;
  readonly?: boolean;
  fields?: FieldSettingsModel;
}

export const SfDropdown = (props: SfDropdownProps) => {
  const readonly = props.readonly == null ? false : props.readonly;
  const dropDown = useRef<DropDownListComponent | null | undefined>();

  const onDataBound = (arg: Object, field: string) => {
    dropDown.current?.addItem(field);
  };
  return (
    <>
      {props.dataSource ? (
        <ErrorBoundary FallbackComponent={FallBack}>
          <Field name={props.fieldName}>
            {({ field, meta }: FieldProps) => (
              <>
                <DropDownListComponent
                  floatLabelType='Always'
                  allowFiltering={true}
                  dataBound={(arg) => onDataBound(arg, field.value)}
                  filterType='Contains'
                  dataSource={props.dataSource}
                  placeholder={props.placeholder}
                  type='text'
                  fields={props.fields}
                  text={field.value}
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
