import React from 'react';
import { toast } from "react-toastify";
import { Button } from "reactstrap"; 

const ConfirmToast = (props) => {
    const {confirm, message} = props;
    const closeToast = () => {
        toast.dismiss();
    }
  return(
    <div>
        <div>{message}</div>
        <Button color="primary" onClick={confirm}>Confirm</Button>
        <Button color="primary" outline={true} onClick={closeToast}>Close</Button>
    </div>
  )
}

export default ConfirmToast;