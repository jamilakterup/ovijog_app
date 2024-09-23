import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { ThemeProvider, createTheme, styled } from "@mui/material/styles";
import { IconButton, InputAdornment, OutlinedInput } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../redux/auth/authApi";
import SyncIcon from '@mui/icons-material/Sync';


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

const SignInContainer = styled(Stack)(({ theme }) => ({
  height: "100vh",
  padding: 20,
  backgroundImage:
    "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
  backgroundRepeat: "no-repeat",
  ...theme.applyStyles("dark", {
    backgroundImage:
      "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
  }),
}));

export default function Login() {
  const [mode, setMode] = useState("light");
  const defaultTheme = createTheme({ palette: { mode } });
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState(false);
  const [phoneErrorMessage, setPhoneErrorMessage] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(null);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();

  const [login, { data, isLoading, error: responseError }] =
    useLoginMutation();


  useEffect(() => {
    if (responseError?.data) {
      setError(responseError.data);
    }
    if (data?.token && data?.user) {
      navigate("/dashboard/home");
    }
  }, [data, responseError, navigate]);


  const loginHandler = (e) => {
    if (!phone) {
      setPhoneError(true);
      setPhoneErrorMessage("Please enter your phone number");
      isValid = false;
    } else {
      setPhoneError(false);
      setPhoneErrorMessage("");
    }

    login({
      mobile_number: phone,
      password: password,
    })
  };


  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline enableColorScheme />
        <Card variant="outlined">
          <h2 className="text-4xl custom-font">লগইন করুন</h2>

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
            {passwordError && (
              <Typography color="error">{passwordErrorMessage}</Typography>
            )}
          </FormControl>

          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />

          <Button
            fullWidth
            variant="contained"
            onClick={loginHandler}
            disabled={isLoading}
          >
            {isLoading ? (
              <SyncIcon className="animate-spin"/>
            ) : (
              <span className="custom-font text-xl">লগইন</span>
            )}
          </Button>

          <span className="text-center custom-font">
            নতুন অ্যাকাউন্ট খুলতে চান?{" "}
            <Link
              href="/registration"
              variant="body2"
              sx={{ alignSelf: "center" }}
            >
              রেজিস্ট্রেশান
            </Link>
          </span>
        </Card>
    </ThemeProvider>
  );
}
