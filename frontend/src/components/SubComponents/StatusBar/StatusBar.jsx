import { Box, LinearProgress } from "@mui/material"

const StatusBar = ({value = 0}) => {
  let color = "success"
  if (value <= 20) color = "error"
  else if (value < 50) color = "warning"
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 0.5,
      }}
    >
      <LinearProgress variant="determinate" value={value} color={color} />
    </Box>
  )
}

export default StatusBar
