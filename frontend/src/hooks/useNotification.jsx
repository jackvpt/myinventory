import { createContext, useContext, useState, useCallback } from "react"
import { Snackbar, Alert } from "@mui/material"
import PropTypes from "prop-types"

const NotificationContext = createContext(undefined)

// Custom hook with error handling to ensure it's used within the provider
export const useNotification = () => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error("useNotification must be used within NotificationProvider")
  }
  return context
}

export const NotificationProvider = ({ children, autoHideDuration = 3000 }) => {
  const [notification, setNotification] = useState(null)

  // Notify function with unique ID to avoid conflicts
  const notify = useCallback((message, severity = "success") => {
    setNotification({
      message,
      severity,
      id: Date.now(), // Unique ID to force re-render
    })
  }, [])

  // Helpers for different types of notifications
  const notifySuccess = useCallback(
    (message) => notify(message, "success"),
    [notify],
  )
  const notifyError = useCallback(
    (message) => notify(message, "error"),
    [notify],
  )
  const notifyWarning = useCallback(
    (message) => notify(message, "warning"),
    [notify],
  )
  const notifyInfo = useCallback((message) => notify(message, "info"), [notify])

  const handleClose = useCallback((_event, reason) => {
    // Avoid closing if the user clicks elsewhere
    if (reason === "clickaway") {
      return
    }
    setNotification(null)
  }, [])

  const contextValue = {
    notify,
    notifySuccess,
    notifyError,
    notifyWarning,
    notifyInfo,
  }

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}

      <Snackbar
        key={notification?.id} // Force re-render for new notifications
        open={!!notification}
        autoHideDuration={autoHideDuration}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleClose}
          severity={notification?.severity || "success"}
          variant="filled"
          elevation={6}
          sx={{ width: "100%" }}
        >
          {notification?.message}
        </Alert>
      </Snackbar>
    </NotificationContext.Provider>
  )
}

NotificationProvider.propTypes = {
  children: PropTypes.node.isRequired,
  autoHideDuration: PropTypes.number,
}
