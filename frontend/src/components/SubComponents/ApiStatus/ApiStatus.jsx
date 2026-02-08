// CSS
import "./ApiStatus.scss"

import {
  faCircleCheck,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Box } from "@mui/material"

const ApiStatus = ({
  isSuccess,
  isError,
  error,
  successMessage = "Opération réussie",
}) => {
  if (!isSuccess && !isError) {
    return null
  }

  return (
    <div className="container-apiStatus">
      {isSuccess && (
        <>
          <Box
            sx={{
              width: "1rem",
              height: "1rem",
              borderRadius: "50%",
              bgcolor: "white",
              color: "green",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FontAwesomeIcon size="lg" icon={faCircleCheck} />
          </Box>
          <p>{successMessage}</p>
        </>
      )}

      {isError && (
        <>
          <FontAwesomeIcon className="iconError" icon={faTriangleExclamation} />
          <p className="container__edit-apiStatus-error">
            {`Une erreur est survenue ${error?.message ? ` (${error.message})` : ""}`}
          </p>
        </>
      )}
    </div>
  )
}

export default ApiStatus
