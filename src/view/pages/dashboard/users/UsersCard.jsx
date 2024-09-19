import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import axios from "axios";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

export default function UsersCard() {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://114.130.119.192/api/users/");
        setUsers(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
  }, []);

  const handleToggle = (userId) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId
          ? { ...user, is_active: !user.is_active }
          : user
      )
    );
  };

  return (
    <div className="m-3">
      {users?.map((user) => (
        <Card
          key={user.id}
          sx={{
            minWidth: 275,
            marginBottom: 2,
            background: user.is_active ? "#83d7f2" : "#f7c6c6", // Change background color based on status
          }}
        >
          <CardContent>
            <Typography variant="h5" component="div">
              {user.full_name}
            </Typography>
            <Typography sx={{ mb: 0.4 }} color="text.secondary">
              Mobile: {user.mobile_number || "Not provided"}
            </Typography>
            <Typography sx={{ mb: 0.4 }} color="text.secondary">
              Designation: {user.designation || "Not specified"}
            </Typography>
            <Typography variant="body2">
              Address: {user.address || "Not provided"}
              <br />
              Status: {user.is_active ? "Active" : "Inactive"}
              <br />
              Role:{" "}
              {user.is_superuser
                ? "Superuser"
                : user.is_staff
                ? "Staff"
                : "User"}
            <FormControlLabel
              sx={{ ml: 8 }}
              control={
                <Switch
                  checked={user.is_active}
                  onChange={() => handleToggle(user.id)}
                />
              }
            />
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
