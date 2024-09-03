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
import { useEffect, useState } from "react";
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

function DetailsModal({ open, handleClose, data }) {
  const [statusOptions, setStatusOptions] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [comment, setComment] = useState(""); // State for comment input

  useEffect(() => {
    const getStatus = async () => {
      try {
        const response = await axios.get("http://114.130.119.192/api/status/");
        setStatusOptions(response.data);
      } catch (error) {
        console.error("Error fetching status options:", error);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://114.130.119.192/api/users/");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
    getStatus();
  }, []);

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const handleUserChange = (event) => {
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
          status_id: selectedStatus,
          assigned_person_id: selectedUser,
          assigned_office_id: data.assigned_office_id, // Use appropriate value from `data`
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
        handleClose()
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
            <Typography>{data.content}</Typography>

            <Box sx={{ marginTop: "50px" }}>
              <span>মন্তব্যঃ </span> <br />
              <textarea
                className="bg-slate-200 rounded-md p-1"
                name="comment"
                value={comment}
                onChange={handleCommentChange}
              ></textarea>
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

            <span className="text-base text-gray-500">জমার তারিখঃ </span>
            <span className="text-gray-700">
              {new Date(data.created_at).toLocaleString()}
            </span>

            <div className="text-base text-gray-500 my-3">
              অভিযোগকারীর তথ্যঃ{" "}
            </div>
            <span className="text-gray-700">{data.complainer_info}</span>

            <FormControl sx={{ minWidth: 220 }} size="small">
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
                {users.map((user) => (
                  <MenuItem key={user.id} value={user.id}>
                    {user.mobile_number}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box>
            <Box sx={{ minWidth: 120 }}>
              <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="demo-select-small-label">স্ট্যাটাস</InputLabel>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={selectedStatus}
                  label="complain_status"
                  onChange={handleStatusChange}
                >
                  {statusOptions.map((status) => (
                    <MenuItem key={status.id} value={status.id}>
                      {status.name} {/* Replace with appropriate field name */}
                    </MenuItem>
                  ))}
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
            <Button onClick={handleSubmitForm} variant="outlined">
              সাবমিট
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
}

export default DetailsModal;
