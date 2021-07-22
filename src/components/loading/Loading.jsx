import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Modal, CircularProgress } from '@material-ui/core';

import { selectLoadState } from '../../app/redux/selectors/loadSelector';

export function Loading() {
  const [load, setLoad] = useState(false);
  const loading = useSelector(selectLoadState);

  useEffect(() => {
    setLoad(loading);
  }, [loading]);

  function handleClose() {
    setLoad(false);
  }

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
}
