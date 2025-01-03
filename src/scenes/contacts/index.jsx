import React, { useState } from "react";
import { Box, Typography, IconButton, useTheme } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { tokens } from "../../theme";

const Contacts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Example notifications
  const [notifications, setNotifications] = useState([
    { id: 1, location: "New York", percentage: 75 },
    { id: 2, location: "San Francisco", percentage: 50 },
    { id: 3, location: "Los Angeles", percentage: 90 },
  ]);

  // Remove a notification
  const handleRemoveNotification = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notification) => notification.id !== id)
    );
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={2}
      mt={4}
      p={2}
      borderRadius="8px"
    >
      <Typography variant="h6" color={colors.grey[100]}>
        Notifications
      </Typography>

      {notifications.map((notification) => (
        <Box
          key={notification.id}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          p={2}
          borderRadius="8px"
          bgcolor={colors.blueAccent[700]} // Retain individual notification background
        >
          <Typography color={colors.grey[100]}>
            {notification.location}: {notification.percentage}%
          </Typography>
          <IconButton
            color="error"
            onClick={() => handleRemoveNotification(notification.id)}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      ))}

      {notifications.length === 0 && (
        <Typography color={colors.grey[100]}>No notifications.</Typography>
      )}
    </Box>
  );
};

export default Contacts;
