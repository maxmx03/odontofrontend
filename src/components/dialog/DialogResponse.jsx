import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import { Error, CheckCircle } from '@material-ui/icons';

export function DialogResponse({ children, err, msg, type }) {
  return (
    <div>
      <Dialog
        open={err}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        style={{
          display: err ? 'block' : 'none',
        }}
      >
        <DialogTitle id="alert-dialog-title" className="text-center">
          {type === 'error' ? (
            <Error className="text-danger" fontSize="large" />
          ) : (
            <CheckCircle className="text-success" fontSize="large" />
          )}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            className="text-dark"
          >
            {msg}
          </DialogContentText>
        </DialogContent>
        <DialogActions>{children}</DialogActions>
      </Dialog>
    </div>
  );
}
