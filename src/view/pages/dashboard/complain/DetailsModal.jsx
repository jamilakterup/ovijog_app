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

function DetailsModal({ open, handleClose, data }) {
  const [age, setAge] = useState("");

  if (!data) return null; // Return null if no data is available

  const handleChange = (event) => {
    setAge(event.target.value);
  };

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
          <Box sx={{ gridColumn: "span 3", textAlign: "center" }}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              <span className="text-base text-gray-500">শিরোনাম</span> <br />
              <span className="text-lg font-semibold text-gray-700">
                {data.title}
              </span>
            </Typography>
          </Box>

          <Box sx={{ width: "500px", marginRight: "30px" }}>
            <span className="text-base text-gray-500">সার-সংক্ষেপ</span> <br />
            <Typography>
              {data.content} Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Animi aliquam saepe eius repellendus pariatur reiciendis
              optio! Autem numquam earum magnam iste delectus eveniet adipisci
              quis dignissimos voluptates, porro sint explicabo?
            </Typography>

            <Box sx={{ marginTop: "50px" }}>
            <span>মন্তব্যঃ </span> <br />
            <textarea className="bg-slate-200 rounded-md" name="comment"></textarea>
            </Box>
          </Box>

          <Box>
            <span className="text-base text-gray-500">
              ট্র্যাকিং নম্বরঃ{" "}
              <span className="text-gray-700">{data.tracking_id}</span>
            </span>
            <br />

            <div className="text-base text-gray-700 my-3">
              দপ্তরঃ {data.office}
            </div>

            <span className="text-gray-700">{data.office}</span>

            <span className="text-base text-gray-500">জমার তারিখঃ </span>
            <span className="text-gray-700">
              {new Date(data.created_at).toLocaleString()}
            </span>

            <div className="text-base text-gray-500 my-3">
              অভিযোগকারীর তথ্যঃ{" "}
            </div>
            <span className="text-gray-700">{data.complainer_info}</span>

            <div className="text-base text-gray-500 my-3">
            দায়িত্বপ্রাপ্ত-কর্মকর্তা{" "}
            </div>
            <input type="text" className="bg-slate-300 rounded-md" />
          </Box>

          <Box>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">স্ট্যাটাস</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  // value={complain_status}
                  label="complain_status"
                  onChange={handleChange}
                  className="bg-yellow-500"
                >
                  <MenuItem value={1}>চলমান</MenuItem>
                  <MenuItem value={2}>নিস্পন্ন</MenuItem>
                  <MenuItem value={3}>সম্পন্ন</MenuItem>
                </Select>
              </FormControl>
            </Box>
           <div className="mt-8">
            <span className="text-gray-500">সংযুক্ত ফাইলঃ </span>
           {data.file && (
              <img src={data.file} alt="Complaint File" style={imageStyle} />
            )}
           </div>
          </Box>

          <Box sx={{ gridColumn: "span 3", textAlign: "center" }}>
          <Button onClick={handleClose} variant="outlined">সাবমিট</Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
}

export default DetailsModal;
