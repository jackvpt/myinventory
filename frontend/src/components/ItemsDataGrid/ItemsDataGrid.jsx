import { DataGrid } from "@mui/x-data-grid"
import { useDispatch, useSelector } from "react-redux"
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
    },
  },
  { field: "notes", headerName: "Notes", width: 200, type: "string" },
]

const ItemsDataGrid = ({ items }) => {
  const dispatch = useDispatch()
  const filters = useSelector((state) => state.filters)

  const handleSelectItem = (params) => {
    dispatch(setSelectedItem(params.row.toPayload()))
  }

  const filteredItems = items.filter((item) => {
    return (
      (filters.category ? item.category === filters.category : true) &&
      (filters.type ? item.type === filters.type : true) &&
      (filters.location ? item.mainlocation === filters.location : true)
    )
  })

  return (
    <div style={{ height: "100%" }}>
      <DataGrid
        rows={filteredItems}
        columns={columns}
        getRowId={(row) => row.id}
        pageSize={10}
        rowsPerPageOptions={[10, 25, 50]}
        disableSelectionOnClick
        isCellEditable={() => false}
        onCellDoubleClick={(_, event) => (event.defaultMuiPrevented = true)}
        onCellFocus={(_, event) => (event.defaultMuiPrevented = true)}
        onRowClick={handleSelectItem}
        density="compact"
        autoHeight={false}
        localeText={frFR.components.MuiDataGrid.defaultProps.localeText}
        sx={(theme) => ({
          "& .MuiDataGrid-row": {
            cursor: "pointer",
          },
          "& .MuiDataGrid-cell": {
            outline: "none !important",
          },
          backgroundColor: theme.palette.primary.main,
        })}
      />
    </div>
  )
}

export default ItemsDataGrid
