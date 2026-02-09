import { DataGrid } from "@mui/x-data-grid"
import { useDispatch } from "react-redux"
import { setSelectedItem } from "../../features/selectedItemSlice"

import { frFR } from "@mui/x-data-grid/locales"
import { Box, LinearProgress } from "@mui/material"

const columns = [
  { field: "category", headerName: "Catégorie", width: 120 },
  { field: "type", headerName: "Type", width: 120 },
  { field: "label", headerName: "Item", width: 200 },
  { field: "mainlocation", headerName: "Localisation", width: 150 },
  { field: "sublocation", headerName: "Sous-localisation", width: 150 },
  { field: "quantity", headerName: "Qté", width: 70, type: "number" },
  {
    field: "status",
    headerName: "Etat",
    width: 80,
    renderCell: (params) => {
      const value = params.value ?? 0

      let color = "success"
      if (value < 20) color = "error"
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
    },
  },
  { field: "notes", headerName: "Notes", width: 200, type: "string" },
]

const ItemsDataGrid = ({ items }) => {
  const dispatch = useDispatch()

  const handleSelectItem = (params) => {
    dispatch(setSelectedItem(params.row.toPayload()))
  }

  return (
    <div style={{ height: "100%" }}>
      <DataGrid
        rows={items}
        columns={columns}
        getRowId={(row) => row.id}
        pageSize={10}
        rowsPerPageOptions={[10, 25, 50]}
        checkboxSelection
        density="compact"
        autoHeight={false}
        onRowClick={handleSelectItem}
        localeText={frFR.components.MuiDataGrid.defaultProps.localeText}
        sx={{
          "& .MuiDataGrid-columnHeaders": {
            fontWeight: 700,
            fontSize: "0.9rem",
          },
          "& .MuiDataGrid-cell": {
            fontWeight: 300,
            fontSize: "0.8rem",
          },
        }}
      />
    </div>
  )
}

export default ItemsDataGrid
