import { TextField, MenuItem } from "@mui/material"
import { useTheme, useMediaQuery } from "@mui/material"

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
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))

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
                  fontSize: isMobile ? "0.9rem" : "0.75rem",
                  minHeight: isMobile ? 40 : 26,
                  py: isMobile ? 1 : 0.3,
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
