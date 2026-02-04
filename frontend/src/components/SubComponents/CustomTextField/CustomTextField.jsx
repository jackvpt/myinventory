import { TextField, MenuItem } from "@mui/material"

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

  return (
    <TextField
      select={isSelect}
      size="small"
      margin="normal"
      label={label}
      value={value ?? ""}
      onChange={onChange}
      fullWidth
      disabled={disabled}
      type={!isSelect ? type : undefined}
      sx={sx}
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
                fontSize: "0.75rem",
                minHeight: 26,
                py: 0.3,
              }}
            >
              {getLabel(item)}
            </MenuItem>
          ))
        ))}
    </TextField>
  )
}

export default CustomTextField
