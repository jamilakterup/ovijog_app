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

function DetailsModal({ open, handleClose, usersOptions, setUsersOptions, officesOptions, statusOptions, data }) {
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedOffice, setSelectedOffice] = useState("");
  const [comment, setComment] = useState(""); // State for comment input

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const handleOfficeChange= async(event)=>{
    const usersResponse = await axios.post("http://114.130.119.192/api/users/office/",{
      "office_id":event.target.value,
    });
    setUsersOptions(usersResponse.data);
    setSelectedOffice(event.target.value);
  }

  const handleUserChange = async(event) => {
    setSelectedUser(event.target.value);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  // submit the form
  const handleSubmitForm = async () => {
    try {
      const response = await axios.post(
        "http://114.130.119.192/api/complaint-progress-submit/",
        {
          tracking_id: data.tracking_id,
          status_id: selectedStatus !== "" ? selectedStatus : data.status,
          assigned_person_id: selectedUser,
          assigned_office_id: selectedOffice,
          comment: comment,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Handle successful response
      if (response.status === 200) {
        console.log("Form submitted successfully:", response.data);
        handleClose();
        // Optionally, you can display a success message or reset form fields
      }
    } catch (error) {
      // Handle error response
      console.error("Error submitting form:", error);
    }
  };

  if (!data) return null; // Return null if no data is available

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
          <Box sx={{ gridColumn: "span 3" }}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              <span className="text-gray-600 custom-font">শিরোনামঃ </span>
              <span className="text-gray-700 custom-bold-font">
                {data.title}
              </span>
            </Typography>
          </Box>
          <Box sx={{ gridColumn: "span 3", gap: "20px", display: "flex" }}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              <span className="text-base text-gray-600 custom-font">
                সার-সংক্ষেপ
              </span>{" "}
              <br />
              <span className="custom-font text-gray-800">{data.content}</span>
            </Typography>

            <Box
              sx={{
                borderLeft: "1px dashed gray",
                borderRight: "1px dashed gray",
                padding: "0 10px",
                width: "525px",
              }}
            >
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                <div className="text-base text-gray-600 custom-font mb-1">
                  ট্র্যাকিং নম্বরঃ{" "}
                  <span className="text-blue-700 font-semibold">
                    {data.tracking_id}
                  </span>
                </div>

                <div className="text-base text-gray-600 custom-font mb-1">
                  জমার তারিখঃ{" "}
                  <span className="text-gray-700">
                    {new Date(data.created_at).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>

                <div className="text-base text-gray-600 custom-font mb-1">
                  অভিযোগকারীর তথ্যঃ{" "}
                  <span className="text-gray-700 custom-bold-font">
                    {data.complainer_info}
                  </span>
                </div>

                <div className="text-base text-gray-600 custom-font mb-1">
                  সংযুক্ত ফাইলঃ {" "}
                  {data.file && (
                    <img
                      src={data.file}
                      alt="Complaint File"
                      style={imageStyle}
                    />
                  )}
                </div>
              </Typography>
            </Box>

            <Box>
              <div className="custom-font">
                <span className="text-gray-800">মন্তব্যঃ </span> <br />
                <textarea
                  className="bg-slate-200 rounded-md p-1"
                  name="comment"
                  value={comment}
                  onChange={handleCommentChange}
                ></textarea>
              </div>

              <FormControl sx={{ minWidth: 214, marginTop: 2 }} size="small">
                <InputLabel id="user-select-label">দপ্তর</InputLabel>
                <Select
                  labelId="user-select-label"
                  id="user-select"
                  value={selectedOffice || data.office}
                  label="দপ্তর"
                  onChange={handleOfficeChange}
                >
                  {officesOptions.map((office) => (
                    <MenuItem key={office.id} value={office.id}>
                      {office.name_Bn}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl sx={{ minWidth: 214, marginTop: 2 }} size="small">
                <InputLabel id="user-select-label">
                  দায়িত্বপ্রাপ্ত-কর্মকর্তা
                </InputLabel>
                <Select
                  labelId="user-select-label"
                  id="user-select"
                  value={selectedUser}
                  label="দায়িত্বপ্রাপ্ত-কর্মকর্তা"
                  onChange={handleUserChange}
                >
                  {usersOptions.map((user) => (
                    <MenuItem key={user.id} value={user.id}>
                      {user.mobile_number}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl sx={{ marginTop: 2, minWidth: 214 }} size="small">
                <InputLabel id="demo-select-small-label">স্ট্যাটাস</InputLabel>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={selectedStatus || data.status}
                  label="complain_status"
                  onChange={handleStatusChange}
                >
                  {statusOptions.map((status) => (
                    <MenuItem key={status.id} value={status.id}>
                      {status.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Box>

          <Box sx={{ gridColumn: "span 3", textAlign: "end", marginTop:"30px" }}>
            <Button onClick={handleSubmitForm} variant="contained">
              সাবমিট
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
}

export default DetailsModal;
