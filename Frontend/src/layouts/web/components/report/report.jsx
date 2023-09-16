import React,{ useState } from 'react'
import { toast } from "react-toastify";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import Typography from '@mui/material/Typography';
import {createReport} from '../../../../services/Report'
import "./report.css";

export default function ReportModal(props) {
  const [reason,setReason] = useState('')
  const[disable,setDisable] = useState(false)
  const submit = async(e) => {
    setDisable(true)
    e.preventDefault()
    if(!reason) return toast.error('Fill reason section!')
    const response = await createReport({...props.data,reason})
    if(response.status == 'success') {
      toast.success(response.message)
      props.handleClose();
      setDisable(false)
    }
    else if(response.status == 'warning'){
      toast.warning(response.message)
      setDisable(false)
    }
    else{
      toast.error(response.message)
      setDisable(false)
    }
  }
  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
      className="modal report-modal"
    >
      <Box className="modal-box report-modal-box">
        <div className="modal-head border-0 relative border-b">
          <Typography variant="span" className="text-1 font-semibold">
            Report
          </Typography>
          <CloseIcon
            className="absolute right-3 cursor-pointer"
            onClick={props.handleClose}
          />
        </div>
        <div className='modal-body'>
          <form onSubmit={submit}>
          <div className='px-3'>
            <h3 className='mb-2 text-xl font-semibold'>Reason:</h3>
            <textarea onChange={(e) => setReason(e.target.value)} name="report" rows="4" className='outline-none border border-gray-300 rounded w-full p-3' placeholder='Write your report reason...'></textarea>
          </div>
          <div className='py-2 px-3'>
            <button type='submit' className={`py-1 px-3 bg-red-700 text-white rounded outline-none float-right ${disable ? 'opacity-60':null}`} disabled={disable}>Send</button>
          </div>
          </form>
      </div>
      </Box>
    </Modal>
  );
}
