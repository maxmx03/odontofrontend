import React,
{
  useEffect,
  useState,
} from 'react';
import { useSelector } from 'react-redux';
import {
  Modal,
  CircularProgress,
} from '@material-ui/core';
import { selectLoading } from '../../app/reducers/loading';

export const Loading = () => {
  const [load, setLoad] = useState(false);
  const loading = useSelector(selectLoading);

  useEffect(() => {
    setLoad(loading);
  }, [loading]);

  const handleClose = () => {
    setLoad(false);
  };

  return (
    <Modal
      open={load}
      onClose={handleClose}
      className="d-flex justify-content-center align-items-center"
      disablePortal
      disableEnforceFocus
      disableAutoFocus
      disableBackdropClick
    >
      <CircularProgress color="primary" />
    </Modal>
  );
};
