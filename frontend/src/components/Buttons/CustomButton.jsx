import LoadingButton from "@mui/lab/LoadingButton"
import { darken } from "@mui/material/styles"

import AddIcon from "@mui/icons-material/Add"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import RestartAltIcon from "@mui/icons-material/RestartAlt"

const actionConfig = {
  create: {
    label: "Ajouter",
    colorKey: "buttonAdd",
    icon: <AddIcon />,
  },
  update: {
    label: "Modifier",
    colorKey: "buttonUpdate",
    icon: <EditIcon />,
  },
  delete: {
    label: "Supprimer",
    colorKey: "buttonDelete",
    icon: <DeleteIcon />,
  },
  reset: {
    label: "Reset",
    colorKey: "buttonReset",
    icon: <RestartAltIcon />,
  },
}

const CustomButton = ({
  action = "create",
  loading = false,
  disabled = false,
  children,
  sx = {},
  ...props
}) => {
  const config = actionConfig[action]

  return (
    <LoadingButton
      variant="contained"
      startIcon={config.icon}
      loading={loading}
      disabled={disabled}
      sx={(theme) => {
        const baseColor = theme.palette.custom[config.colorKey]

        return {
          flex: "1 1 45%",
          backgroundColor: baseColor,
          minWidth: 100,
          height: 36,
          borderRadius: 1,
          textTransform: "none",
          fontWeight: 600,
          transition: "all 0.2s ease",

          "&:hover": {
            backgroundColor: darken(baseColor, 0.2),
          },

          "&:active": {
            backgroundColor: darken(baseColor, 0.3),
            transform: "scale(0.98)",
          },

          ...((typeof sx === "function" && sx(theme)) || sx),
        }
      }}
      {...props}
    >
      {children || config.label}
    </LoadingButton>
  )
}

export default CustomButton
