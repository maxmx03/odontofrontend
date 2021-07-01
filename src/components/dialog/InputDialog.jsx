import React,
{
  useState,
  useEffect,
} from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';

export const InputDialog = ({
  children, description, fields, open, title,
}) => {
  const [openModal, setModal] = useState(open);

  useEffect(() => {
    setModal(open);
  }, [open]);

  const handleClose = () => {
    setModal(false);
  };

  return (
    <div>
      <Dialog open={openModal} onClose={handleClose} disableBackdropClick>
        <DialogTitle className="text-danger">
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText className="text-dark">
            {description}
          </DialogContentText>
          {fields()}
        </DialogContent>
        <DialogActions>{children}</DialogActions>
      </Dialog>
    </div>
  );
};
