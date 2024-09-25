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
import {
  useGetComplaintQuery,
  useGetOfficesQuery,
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
  objectFit: "cover",
};

function DetailsModal({ open, handleClose, singleId }) {
  const { data: complaintData, error, isLoading } = useGetComplaintQuery(singleId);
  const { data: offices } = useGetOfficesQuery();
  const { data: statusOptions } = useGetStatusQuery();
  const [submitComplaintProgress] = useSubmitComplaintProgressMutation();

  const [comment, setComment] = useState("");
  const [selectedOffice, setSelectedOffice] = useState(complaintData?.office || "");
  const [selectedUser, setSelectedUser] = useState(complaintData?.assigned_person_id || "");
  const [usersOptions, setUsersOptions] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState(complaintData?.status || "");

  useEffect(() => {
    if (selectedOffice) {
      const fetchUsers = async () => {
        try {
          const response = await fetch("http://114.130.119.192/api/users/office/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ office_id: selectedOffice }),
          });

          if (!response.ok) {
            throw new Error("Failed to fetch users");
          }

          const data = await response.json();
          setUsersOptions(data);
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      };

      fetchUsers();
    } else {
      setUsersOptions([]); // Clear users if no office is selected
    }
  }, [selectedOffice]);

  useEffect(() => {
    // Reset users when the modal is opened or when the office changes
    if (open) {
      setSelectedOffice(complaintData?.office || "");
      setSelectedUser(complaintData?.assigned_person_id || "");
      setSelectedStatus(complaintData?.status || "");
      setComment("");
    }
  }, [open, complaintData]);

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleOfficeChange = (event) => {
    setSelectedOffice(event.target.value);
  };

  const handleUserChange = (event) => {
    setSelectedUser(event.target.value);
  };

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const handleSubmitForm = async () => {
    try {
      const response = await submitComplaintProgress({
        tracking_id: complaintData.tracking_id,
        status_id: selectedStatus || complaintData.status,
        assigned_person_id: selectedUser,
        assigned_office_id: selectedOffice,
        comment: comment,
      }).unwrap();

      console.log("Form submitted successfully:", response);
      handleClose();
      window.location.reload();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return;
  }

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <Box sx={{ gridColumn: "span 3" }}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              <span className="text-gray-600 custom-font">শিরোনাম: </span>
              <span className="text-gray-700 custom-bold-font">{complaintData.title}</span>
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
              <span className="custom-font text-gray-800">{complaintData.content}</span>
            </Typography>

            <Box
              sx={{
                borderLeft: "1px dashed gray",
                borderRight: "1px dashed gray",
                padding: "0 10px",
                width: "800px",
              }}
            >
              <Typography id="transition-modal-title" variant="h6" component="h2">
                <span className="custom-font text-gray-700">তথ্য:</span>
                <div className="text-base text-gray-600 custom-font mb-1">
                  ট্র্যাকিং নম্বর:{" "}
                  <span className="text-blue-700 font-semibold">{complaintData.tracking_id}</span>
                </div>

                <div className="text-base text-gray-600 custom-font mb-1">
                  জমার তারিখ: <span className="text-gray-700">{complaintData.created_at}</span>
                </div>

                <div className="text-base text-gray-600 custom-font mb-1">
                  অভিযোগকারীর তথ্য:{" "}
                  <span className="text-gray-700 custom-bold-font">
                    {complaintData.complainer_info || "বেনামি অভিযোগ"}
                  </span>
                </div>

                <div className="text-base text-gray-600 custom-font mb-1">
                  সংযুক্ত ফাইল:{" "}
                  {complaintData.file && (
                    <img
                      src={complaintData.file}
                      alt="Complaint File"
                      style={imageStyle}
                    />
                  )}
                </div>
              </Typography>
            </Box>

            <Box sx={{ width: "600px" }}>
              <Typography id="transition-modal-title" variant="h6" component="h2">
                <span className="custom-font text-gray-700">অ্যাসাইন/ফরওয়ার্ড করুন</span>
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
                <InputLabel id="office-select-label">দপ্তর</InputLabel>
                <Select
                  labelId="office-select-label"
                  id="office-select"
                  value={selectedOffice}
                  label="দপ্তর"
                  onChange={handleOfficeChange}
                >
                  {offices?.map((office) => (
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
                <InputLabel id="user-select-label">দায়িত্বপ্রাপ্ত-কর্মকর্তা</InputLabel>
                <Select
                  labelId="user-select-label"
                  id="user-select"
                  value={selectedUser}
                  label="দায়িত্বপ্রাপ্ত-কর্মকর্তা"
                  onChange={handleUserChange}
                >
                  {usersOptions.length > 0 ? (
                    usersOptions.map((user) => (
                      <MenuItem key={user.id} value={user.id}>
                        {user.full_name}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem disabled>No users available</MenuItem>
                  )}
                </Select>
              </FormControl>

              <FormControl
                sx={{ marginTop: 2, minWidth: 214, maxWidth: 214 }}
                size="small"
              >
                <InputLabel id="status-select-label">স্ট্যাটাস</InputLabel>
                <Select
                  labelId="status-select-label"
                  id="status-select"
                  value={selectedStatus}
                  label="স্ট্যাটাস"
                  onChange={handleStatusChange}
                >
                  {statusOptions?.map((status) => (
                    <MenuItem key={status.id} value={status.id}>
                      {status.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Box>

          <Box sx={{ gridColumn: "span 3", textAlign: "end", marginTop: "30px" }}>
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
