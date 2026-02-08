import { DataGrid } from "@mui/x-data-grid"
import { useDispatch } from "react-redux"
import { setSelectedItem } from "../../features/selectedItemSlice"

import { frFR } from "@mui/x-data-grid/locales"

const columns = [
  { field: "category", headerName: "Catégorie", width: 100 },
  { field: "type", headerName: "Type", width: 100 },
  { field: "label", headerName: "Item", width: 150 },
  { field: "mainlocation", headerName: "Localisation", width: 100 },
  { field: "sublocation", headerName: "Sous-localisation", width: 100 },
  { field: "quantity", headerName: "Qté", width: 80, type: "number" },
  { field: "notes", headerName: "Notes", width: 200 },
]

const ItemsDataGrid = ({ items }) => {
  const dispatch = useDispatch()

  const handleSelectItem = (params) => {
    console.log("params.row :>> ", params.row)
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
