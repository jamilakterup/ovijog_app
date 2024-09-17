import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import MuiCard from "@mui/material/Card";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { styled } from "@mui/material/styles";
import {
  Autocomplete,
  IconButton,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px",
  },
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

export default function Registration() {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);
  const [nameErrorMessage, setNameErrorMessage] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState(false);
  const [phoneErrorMessage, setPhoneErrorMessage] = useState("");
  const [designation, setDesignation] = useState("");
  const [designationError, setDesignationError] = useState(false);
  const [designationErrorMessage, setDesignationErrorMessage] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirm, setConfirm] = useState("");
  const [confirmError, setConfirmError] = useState(false);
  const [confirmErrorMessage, setConfirmErrorMessage] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [offices, setOffices] = useState([]);
  const [selectedOffice, setSelectedOffice] = useState(null);
  const [officeError, setOfficeError] = useState(false);
  const [officeErrorMessage, setOfficeErrorMessage] = useState("");
  const navigate = useNavigate(null);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirm = () => setShowConfirm((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();
  const handleMouseDownConfirm = (event) => event.preventDefault();

  const validateInputs = async () => {
    let isValid = true;

    if (!name) {
      setNameError(true);
      setNameErrorMessage("Please enter your name");
      isValid = false;
    } else {
      setNameError(false);
      setNameErrorMessage("");
    }

    if (!phone) {
      setPhoneError(true);
      setPhoneErrorMessage("Please enter your phone number");
      isValid = false;
    } else {
      setPhoneError(false);
      setPhoneErrorMessage("");
    }

    if (!selectedOffice) {
      setOfficeError(true);
      setOfficeErrorMessage("Please select office");
      isValid = false;
    } else {
      setPhoneError(false);
      setPhoneErrorMessage("");
    }

    if (!designation) {
      setDesignationError(true);
      setDesignationErrorMessage("Please enter your designation");
      isValid = false;
    } else {
      setDesignationError(false);
      setDesignationErrorMessage("");
    }

    if (!password || password.length < 8) {
      setPasswordError(true);
      setPasswordErrorMessage("Password must be at least 8 characters long.");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    if (!confirm || confirm.length < 6) {
      setConfirmError(true);
      setConfirmErrorMessage("Password must be at least 8 characters long.");
      isValid = false;
    } else {
      setConfirmError(false);
      setConfirmErrorMessage("");
    }

    if (password == confirm) {
      try {
        const response = await fetch(
          "http://114.130.119.192/api/users/register/",
          {
            method: "POST",
            body: JSON.stringify({
              mobile_number: phone,
              password: password,
              "email": "example1@gmail.com",
              "last_name": ".",
              first_name: name,
              office_id: selectedOffice.id,
              designation: designation,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();

        if (result) {
          navigate(`/login`);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      setConfirmErrorMessage("Password does not match");
    }

    return isValid;
  };

  // fetch offices data
  useEffect(() => {
    const fetchOffices = async () => {
      try {
        const response = await axios.get("http://114.130.119.192/api/offices/");
        setOffices(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOffices();
  }, []);

  return (
    <section className="my-8">
      <Card variant="outlined">
        <h2 className="text-4xl custom-font">রেজিস্ট্রেশান করুন</h2>

        <Box sx={{ width: 500, maxWidth: "100%" }}>
          <TextField
            type="text"
            fullWidth
            label="নাম লিখুন"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={nameError}
            helperText={nameErrorMessage}
          />
        </Box>
        <Box sx={{ width: 500, maxWidth: "100%" }}>
          <TextField
            type="text"
            fullWidth
            label="মোবাইল নম্বর লিখুন"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            error={phoneError}
            helperText={phoneErrorMessage}
          />
        </Box>

        <Autocomplete
          disablePortal
          options={offices}
          getOptionLabel={(option) => option.name_Bn || ""}
          value={selectedOffice}
          onChange={(event, newValue) => setSelectedOffice(newValue)}
          renderInput={(params) => (
            <TextField
              {...params}
              label={
                <span className="custom-font text-lg">দপ্তর নির্বাচন করুন</span>
              }
              sx={{
                width: "100%",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "gray", // Sets the default border color
                    opacity: 0.3,
                  },
                },
              }}
              error={officeError}
              helperText={officeErrorMessage}
            />
          )}
        />

        <Box sx={{ width: 500, maxWidth: "100%" }}>
          <TextField
            type="text"
            fullWidth
            label="উপাধি লিখুন"
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
            error={designationError}
            helperText={designationErrorMessage}
          />
        </Box>

        <FormControl
          sx={{ width: "100%" }}
          variant="outlined"
          error={passwordError}
        >
          <InputLabel htmlFor="outlined-adornment-password">
            পাসওয়ার্ড
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
          {confirmError && (
            <Typography color="error">{passwordErrorMessage}</Typography>
          )}
        </FormControl>

        <FormControl
          sx={{ width: "100%" }}
          variant="outlined"
          error={confirmError}
        >
          <InputLabel htmlFor="confirm-password">কনফার্ম পাসওয়ার্ড</InputLabel>
          <OutlinedInput
            id="confirm-password"
            type={showConfirm ? "text" : "password"}
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowConfirm}
                  onMouseDown={handleMouseDownConfirm}
                  edge="end"
                >
                  {showConfirm ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="confirm"
          />
          {passwordError && (
            <Typography color="error">{confirmErrorMessage}</Typography>
          )}
        </FormControl>

        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          onClick={validateInputs}
        >
          <span className="custom-font text-xl">লগইন</span>
        </Button>

        <span className="text-center custom-font">
          অ্যাকাউন্ট আছে?{" "}
          <Link href="/login" variant="body2" sx={{ alignSelf: "center" }}>
            লগইন
          </Link>
        </span>
      </Card>
    </section>
  );
}
