import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import { MouseEventHandler } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { FallBack } from "./FallBack";

interface SfSpinButtonProps {
  isloading: boolean;
  onClick?: MouseEventHandler;
}

const SfSpinButton = ({ isloading, onClick }: SfSpinButtonProps) => {
  return (
    <>
      <ErrorBoundary FallbackComponent={FallBack}>
        {isloading ? (
          <ButtonComponent
            isPrimary={true}
            iconCss='fas fa-circle-notch fa-spin'
            readOnly={true}
            cssClass='float-end'
            content='Working..'
            onClick={() => {}}
            type='button'
          />
        ) : (
          <ButtonComponent
            isPrimary={true}
            cssClass='float-end'
            content='Submit'
            onClick={onClick}
            type='submit'
          />
        )}
      </ErrorBoundary>
    </>
  );
};

export default SfSpinButton;
