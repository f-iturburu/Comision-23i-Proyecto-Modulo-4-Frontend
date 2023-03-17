import React, { useEffect, useState } from 'react';
import Alert from 'react-bootstrap/Alert';

function AlertDismissible({message , state}) {
  const [show, setShow] = useState(false);

useEffect(()=>{
 setShow(state)
  },[])

  if (show) {
    return (
      <Alert className='p-1 m-1'  variant="danger" onClose={() => setShow(false)} >
        <p className='m-0'>
        {message}
        </p>
      </Alert>
    );
  }
}

export default AlertDismissible