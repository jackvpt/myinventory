import { DataGrid } from "@mui/x-data-grid"

const columns = [
  { field: "category", headerName: "Catégorie", width: 100 },
  { field: "type", headerName: "Type", width: 100 },
  { field: "label", headerName: "Item", width: 150 },
  { field: "mainlocation", headerName: "Localisation", width: 100 },
  { field: "sublocation", headerName: "Sous-localisation", width: 100 },
  { field: "quantity", headerName: "Qté", width: 80, type: "number" },
  { field: "notes", headerName: "Notes", width: 200 },
]

const ItemsDataGrid = ({ items }) => (
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
    />
  </div>
)

export default ItemsDataGrid
