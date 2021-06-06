import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const Modal = ({ open, title, children, handleClose }) => {
  const modalRef = useRef(null);
  const modalGroupRef = useRef(document.getElementById("modal"));

  useEffect(() => {
    const modalEl = document.createElement("div");
    modalGroupRef.current.appendChild(modalEl);
    modalRef.current = modalEl;
    return () => modalGroupRef.current.removeChild(modalRef.current);
  }, []);

  if (open && modalRef.current != null) {
    return createPortal(
      <>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {children}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary" autoFocus>
              Aceptar
            </Button>
          </DialogActions>
        </Dialog>
      </>,
      modalRef.current
    );
  } else {
    return null;
  }
};

export default Modal;
