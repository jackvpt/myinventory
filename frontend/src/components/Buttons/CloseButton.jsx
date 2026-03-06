import IconButton from "@mui/material/IconButton"
import CloseIcon from "@mui/icons-material/Close"

const CloseButton = ({ onClick }) => {
  return (
    <IconButton aria-label="close" onClick={onClick}>
      <CloseIcon />
    </IconButton>
  )
}

export default CloseButton