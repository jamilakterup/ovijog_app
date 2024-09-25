import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState } from "react";
import axios from "axios";
import { useGetComplaintQuery } from "../../../redux/complain/complainApi";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  maxWidth: 1000,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr",
  gap: "16px",
};

const imageStyle = {
  width: "100px",
  height: "100px",
  objectFit: "cover", // Ensures the image scales without distorting its aspect ratio
};

function DetailsModal({ open, handleClose, singleId }) {
const {data, isLoading}=useGetComplaintQuery(singleId)
console.log('single data',data)
if (isLoading) {
  return <div>Loading...</div>;
}

if (!data) {
  return <div>No data available</div>;
}

  return (
    <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              <div>
        <h1>{data.title}</h1>
        <p>{data.content}</p>
        {/* Render other properties as needed */}
        <p>Status: {data.status_name}</p>
        <p>Office: {data.office_name}</p>
        {/* Add more fields as needed */}
    </div>
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati esse rerum voluptates, veritatis ullam cum, odit accusamus maiores iste quasi eum praesentium totam officia in perferendis necessitatibus aliquid ab fugit?
            </Typography>
          </Box>
        </Fade>
      </Modal>
  );
}

export default DetailsModal;
