// CSS
import "./ItemsDataGrid.scss"

import { DataGrid } from "@mui/x-data-grid"
import { useDispatch, useSelector } from "react-redux"
import { setSelectedItem } from "../../features/selectedItemSlice"

import { frFR } from "@mui/x-data-grid/locales"
import StatusBar from "../SubComponents/StatusBar/StatusBar"

const columns = [
  { field: "category", headerName: "Catégorie", flex: 0.8, minWidth: 80 },
  { field: "type", headerName: "Type", flex: 0.8, minWidth: 80 },
  { field: "label", headerName: "Item", flex: 1.6, minWidth: 120 },
  {
    field: "mainlocation",
    headerName: "Localisation",
    flex: 1,
    minWidth: 80,
  },
  {
    field: "sublocation",
    headerName: "Sous-localisation",
    flex: 1.2,
    minWidth: 100,
  },
  {
    field: "quantity",
    headerName: "Qté",
    flex: 0.5,
    minWidth: 40,
    renderCell: (params) => (
      <div
        className={
          params.value === 0 ? "cellQuantity zeroQuantity" : "cellQuantity"
        }
      >
        {params.value}
      </div>
    ),
  },
  {
    field: "status",
    headerName: "Etat",
    flex: 0.7,
    minWidth: 70,
    renderCell: (params) => <StatusBar value={params.value} />,
  },
  {field:"alert",
    headerName:"Alerte",
    flex:0.7,
    minWidth:70,
    renderCell:(params) => (
      <div className={params.value ? "cellAlert alertActive" : "cellAlert"}>    
        {params.value ? "!" : ""}
      </div>
    )
  },
  { field: "notes", headerName: "Notes", flex: 1.5, minWidth: 120 },
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
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        },
        backgroundColor: theme.palette.primary.main,
      })}
    />
  )
}

export default ItemsDataGrid
