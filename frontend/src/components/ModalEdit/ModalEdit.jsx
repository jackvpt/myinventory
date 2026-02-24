import { Drawer, IconButton } from "@mui/material"
import Edit from "../Edit/Edit"

const ModalEdit = ({ open, onClose }) => {
  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      transitionDuration={250}
      ModalProps={{ keepMounted: true }}
    >
      <Edit />
      <IconButton onClick={onClose}>X</IconButton>
    </Drawer>
  )
}

export default ModalEdit
