import { TextField, MenuItem, useTheme } from "@mui/material"
import { useMediaQuery } from "@mui/material"

const CustomTextField = ({
  label,
  value,
  onChange,

  // Select style
  items = null,
  getValue,
  getLabel,
  emptyLabel = "Aucune donnée",

  // Common
  type = "text",
  disabled = false,
  sx = {},
  ...props
}) => {
  const isSelect = Array.isArray(items)

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"))

  return (
    <div className="container__customTextField">
      <TextField
        select={isSelect}
        size={props.multiline ? undefined : "small"}
        margin={props.multiline ? "dense" : "normal"}
        label={label}
        value={value ?? ""}
        onChange={onChange}
        fullWidth
        disabled={disabled}
        type={!isSelect ? type : undefined}
        sx={sx}
        slotProps={
          isSelect
            ? {
                select: {
                  MenuProps: {
                    PaperProps: {
                      sx: {
                        maxHeight: "70vh",
                      },
                    },
                  },
                },
              }
            : undefined
        }
        {...props}
      >
        {isSelect &&
          (items.length === 0 ? (
            <MenuItem disabled value="">
              {emptyLabel}
            </MenuItem>
          ) : (
            items.map((item) => (
              <MenuItem
                key={getValue(item)}
                value={getValue(item)}
                sx={{
                  "&.MuiMenuItem-root": {
                    minHeight: isMobile ? 70 : 40,
                  },
                  py: isMobile ? 1 : 0.5,
                }}
              >
                {getLabel(item)}
              </MenuItem>
            ))
          ))}
      </TextField>
    </div>
  )
}

export default CustomTextField
