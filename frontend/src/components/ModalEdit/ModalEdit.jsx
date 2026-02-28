import { Drawer } from "@mui/material"
import Edit from "../Edit/Edit"

const ModalEdit = ({ open, onClose }) => {
  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      transitionDuration={250}
      ModalProps={{ keepMounted: true }}
      PaperProps={{
        sx: {
          backgroundColor: "black",
          color: "text.primary",
        },
      }}
    >
      <Edit onClose={onClose} />
    </Drawer>
  )
}

export default ModalEdit
