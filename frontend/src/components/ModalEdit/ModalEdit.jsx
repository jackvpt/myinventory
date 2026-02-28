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
      <Edit onClose={onClose} />
    </Drawer>
  )
}

export default ModalEdit
