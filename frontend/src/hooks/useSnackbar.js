import { useState, useCallback } from "react"

export const useSnackbar = () => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success", // success | error | info | warning
  })

  const showSnackbar = useCallback(
    (message, severity = "success") => {
      setSnackbar({
        open: true,
        message,
        severity,
      })
    },
    []
  )

  const closeSnackbar = useCallback(() => {
    setSnackbar((s) => ({ ...s, open: false }))
  }, [])

  return {
    snackbar,
    showSnackbar,
    closeSnackbar,
  }
}
