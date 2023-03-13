import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';

function AlertDismissible({message , state}) {
  const [show, setShow] = useState(state);

  if (show) {
    return (
      <Alert className='p-3 mt-3' variant="danger" onClose={() => setShow(false)} dismissible>
        <p className='m-0'>
        {message}
        </p>
      </Alert>
    );
  }
}

export default AlertDismissible