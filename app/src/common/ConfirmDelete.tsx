import { Dialog, DialogUtility } from "@syncfusion/ej2-react-popups";

interface ConfirmDeleteProps {
  okAction: () => void;
  cancelAction: () => void;
}

const ConfirmDelete = ({ okAction, cancelAction }: ConfirmDeleteProps) => {
  const confirmOkAction = (dialogObj: Dialog) => {
    okAction();
    dialogObj.hide();
  };
  const confirmCancelAction = (dialogObj: Dialog) => {
    cancelAction();
    dialogObj.hide();
  };
  const dialogObj = DialogUtility.confirm({
    title: "Delete Item",
    content: "Are you sure you want to permanently delete this item?",
    width: "300px",
    okButton: { click: () => confirmOkAction(dialogObj) },
    cancelButton: { click: () => confirmCancelAction(dialogObj) },
  });
};

export default ConfirmDelete;
