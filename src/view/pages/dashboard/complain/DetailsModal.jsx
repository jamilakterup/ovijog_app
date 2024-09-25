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
import {
  useGetComplaintQuery,
  useGetStatusQuery,
  useGetUsersByOfficeQuery,
  useSubmitComplaintProgressMutation,
} from "../../../redux/complain/complainApi";

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
  const { data } = useGetComplaintQuery(singleId);
  const { data: usersOptions } = useGetUsersByOfficeQuery(data?.office || null);
  const { data: statusOptions } = useGetStatusQuery();
  const [submitComplaintProgress] = useSubmitComplaintProgressMutation();

  const [comment, setComment] = useState("");
  const [selectedOffice, setSelectedOffice] = useState("");
  const [offices, setOffices] = useState([]);
  const [selectedUser, setSelectedUser] = useState(usersOptions);
  const [selectedStatus, setSelectedStatus] = useState("");

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleOfficeChange = async (event) => {
    await axios.post("http://114.130.119.192/api/users/office/", {
      office_id: event.target.value,
    });
    setSelectedOffice(event.target.value);
  };

  useEffect(() => {
    const fetchOffices = async () => {
      try {
        const response = await fetch("http://114.130.119.192/api/offices/");

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setOffices(data);
      } catch (error) {
        console.error("Error fetching offices:", error);
      }
    };

    fetchOffices();
  }, [setOffices]);

  const handleUserChange = async (event) => {
    setSelectedUser(event.target.value);
  };

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const handleSubmitForm = async () => {
    try {
      const response = await submitComplaintProgress(
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
      ).unwrap();

      console.log("Form submitted successfully:", response);
      handleClose();

      window.location.reload();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  if (!data) {
    return;
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
          <Box sx={{ gridColumn: "span 3" }}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              <span className="text-gray-600 custom-font">শিরোনাম: </span>
              <span className="text-gray-700 custom-bold-font">
                {data.title}
              </span>
            </Typography>
          </Box>
          <Box sx={{ gridColumn: "span 3", gap: "20px", display: "flex" }}>
            <Typography
              sx={{ width: "800px" }}
              id="transition-modal-title"
              variant="h6"
              component="h2"
            >
              <span className="text-gray-600 custom-font">বর্ণনা:</span> <br />
              <span className="custom-font text-gray-800">{data.content}</span>
            </Typography>

            <Box
              sx={{
                borderLeft: "1px dashed gray",
                borderRight: "1px dashed gray",
                padding: "0 10px",
                width: "800px",
              }}
            >
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                <span className="custom-font text-gray-700">তথ্য:</span>
                <div className="text-base text-gray-600 custom-font mb-1">
                  ট্র্যাকিং নম্বর:{" "}
                  <span className="text-blue-700 font-semibold">
                    {data.tracking_id}
                  </span>
                </div>

                <div className="text-base text-gray-600 custom-font mb-1">
                  জমার তারিখ:{" "}
                  <span className="text-gray-700">{data.created_at}</span>
                </div>

                <div className="text-base text-gray-600 custom-font mb-1">
                  অভিযোগকারীর তথ্য:{" "}
                  <span className="text-gray-700 custom-bold-font">
                    {data.complainer_info || "বেনামি অভিযোগ"}
                  </span>
                </div>

                <div className="text-base text-gray-600 custom-font mb-1">
                  সংযুক্ত ফাইল:{" "}
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

            <Box sx={{ width: "600px" }}>
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                <span className="custom-font text-gray-700">
                  অ্যাসাইন/ফরওয়ার্ড করুন
                </span>
              </Typography>

              <div className="custom-font">
                <span className="text-gray-800">মন্তব্য:</span> <br />
                <textarea
                  className="bg-slate-200 rounded-md p-1"
                  name="comment"
                  value={comment}
                  onChange={handleCommentChange}
                ></textarea>
              </div>

              <FormControl
                sx={{ minWidth: 214, maxWidth: 214, marginTop: 2 }}
                size="small"
              >
                <InputLabel id="user-select-label">দপ্তর</InputLabel>
                <Select
                  labelId="user-select-label"
                  id="user-select"
                  value={selectedOffice || data.office}
                  label="দপ্তর"
                  onChange={handleOfficeChange}
                >
                  {offices.map((office) => (
                    <MenuItem key={office.id} value={office.id}>
                      {office.name_Bn}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl
                sx={{ minWidth: 214, maxWidth: 214, marginTop: 2 }}
                size="small"
              >
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
                      {user.full_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl
                sx={{ marginTop: 2, minWidth: 214, maxWidth: 214 }}
                size="small"
              >
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

          <Box
            sx={{ gridColumn: "span 3", textAlign: "end", marginTop: "30px" }}
          >
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
