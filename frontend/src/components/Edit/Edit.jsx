// CSS
import "./Edit.scss"

// MUI
import { DialogActions, Button, Stack, CircularProgress } from "@mui/material"

// React
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

// Hooks
import { useCategories } from "../../hooks/useCategories"
import { useLocations } from "../../hooks/useLocations"
import { useCreateItem, useDeleteItem, useItems, useUpdateItem } from "../../hooks/useItems"
import { useTypes } from "../../hooks/useTypes"

// Model
import ItemModel from "../../models/ItemModel"

import CustomTextField from "../SubComponents/CustomTextField/CustomTextField"
import { updateItem } from "../../api/items.api"

const Edit = () => {
  const selectedItem = useSelector((state) => state.selectedItem)
  const { data: items = [] } = useItems()
  const { data: categories = [] } = useCategories()
  const { data: types = [] } = useTypes()
  const { data: locations = [] } = useLocations()

  const topLocations = Object.entries(
    items.reduce((acc, item) => {
      if (!item.mainlocation) return acc
      acc[item.mainlocation] = (acc[item.mainlocation] || 0) + 1
      return acc
    }, {}),
  )
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([loc]) => loc)

  // Mutations
  const {
    mutate: createItem,
    isPending: isCreating,
    isSuccess: isCreateSuccess,
    isError: isCreateError,
    error: createError,
    reset: resetCreate,
  } = useCreateItem()

  const {
  mutate: updateItem,
  isPending: isUpdating,
  isSuccess: isUpdateSuccess,
  isError: isUpdateError,
  error: updateError,
  reset: resetUpdate
} = useUpdateItem()

  const {
    mutate: deleteItem,
    isPending: isDeleting,
    isSuccess: isDeleteSuccess,
    isError: isDeleteError,
    error: deleteError,
    reset: resetDelete,
  } = useDeleteItem()

  const isProcessing = isCreating || isDeleting || isUpdating

  // Form state
  const formInitialState = {
    category: "",
    type: "",
    label: "",
    quantity: 1,
    mainlocation: "",
    sublocation: "",
    notes: "",
  }
  const [form, setForm] = useState(formInitialState)

  useEffect(() => {
    if (selectedItem) {
      setForm(selectedItem)
    } else {
      setForm(formInitialState)
    }
  }, [selectedItem])

  useEffect(() => {
    if (isCreateSuccess || isDeleteSuccess) {
      const timer = setTimeout(() => {
        resetCreate()
        resetUpdate()
        resetDelete()
      }, 2500)

      return () => clearTimeout(timer)
    }
  }, [isCreateSuccess, isDeleteSuccess])

  const handleChange = (field) => (event) => {
    let value = event.target.value

    // Manual type conversion for quantity field
    if (field === "quantity") {
      value = value === "" ? "" : Number(value)
    }

    setForm((prev) => {
      const model = new ItemModel(prev)
      model[field] = value
      return model
    })
  }

  // Check validity for the button
  const isFormValid = new ItemModel(form).isValid()

  const selectedLocation = locations.find(
    (loc) => loc.name === form.mainlocation,
  )

  const handleAdd = () => {
    const model = new ItemModel(form)
    if (!model.isValid()) {
      console.log("Data not valid")
      return
    }
    createItem(model.toPayload())
  }

  const handleModify = () => {
    const model = new ItemModel(form)
    if (!model.isValid()) {
      console.log("Data not valid")
      return
    }
    updateItem({
      id: model.id,
      item: model.toPayload(),
    })
  }

  const handleDelete = () => {
    deleteItem(selectedItem.id)
  }

  const customStyle = {
    "& .MuiInputBase-root": {
      height: 28,
      fontSize: "0.75rem",
      px: 0.5,
    },

    "& .MuiInputLabel-root": {
      fontSize: "0.7rem",
      top: "-4px",
    },

    "& .MuiInputBase-input": {
      padding: "4px 6px",
    },
  }

  const customButtonStyle = {
    backgroundColor: "white",
    color: "black",
    "&:hover": {
      backgroundColor: "gray",
    },

    minWidth: 24,
    height: 24,
    padding: "2px 4px",
    fontSize: "0.7rem",
    borderRadius: 1,
  }

  return (
    <div className="container__edit">
      {/* Category */}
      <CustomTextField
        label="Catégorie"
        value={form.category}
        onChange={handleChange("category")}
        items={categories}
        getValue={(cat) => cat.name}
        getLabel={(cat) => cat.name}
        sx={customStyle}
      />

      {/* Type */}
      <CustomTextField
        label="Type"
        value={form.type}
        onChange={handleChange("type")}
        items={types}
        getValue={(cat) => cat.name}
        getLabel={(cat) => cat.name}
        sx={customStyle}
      />

      {/* Name */}
      <CustomTextField
        label="Nom"
        value={form.label}
        onChange={handleChange("label")}
        sx={customStyle}
      />

      <div className="container__edit-quantity">
        {/* Quantity */}
        <CustomTextField
          label="Quantité"
          type="number"
          value={form.quantity}
          onChange={handleChange("quantity")}
          inputProps={{ min: 1 }}
          sx={customStyle}
        />
        <div className="container__edit-quantity-spinner">
          <div
            className="container__edit-quantity-spinner-button"
            onClick={() =>
              setForm((prev) => ({
                ...prev,
                quantity: prev.quantity + 1,
              }))
            }
          >
            +
          </div>
          <div
            className="container__edit-quantity-spinner-button"
            onClick={() =>
              setForm((prev) => ({
                ...prev,
                quantity: prev.quantity >= 1 ? prev.quantity - 1 : 0,
              }))
            }
          >
            -
          </div>
        </div>
        <Button
          variant="contained"
          size="small"
          onClick={() =>
            setForm((prev) => ({
              ...prev,
              quantity: 1,
            }))
          }
          sx={customButtonStyle}
        >
          1
        </Button>
        <Button
          variant="contained"
          size="small"
          onClick={() =>
            setForm((prev) => ({
              ...prev,
              quantity: 2,
            }))
          }
          sx={customButtonStyle}
        >
          2
        </Button>
      </div>

      {/* Main location */}
      <div className="container__edit-locations">
        {topLocations.map((location) => (
          <Button
            key={location}
            variant="contained"
            size="small"
            onClick={() =>
              setForm((prev) => ({
                ...prev,
                mainlocation: location,
              }))
            }
            sx={customButtonStyle}
          >
            {location}
          </Button>
        ))}
      </div>
      <CustomTextField
        label="Emplacement"
        value={form.mainlocation}
        onChange={handleChange("mainlocation")}
        items={locations}
        getValue={(loc) => loc.name}
        getLabel={(loc) => loc.name}
        emptyLabel="Aucun emplacement"
        sx={customStyle}
      />

      {/* Sublocation */}
      <CustomTextField
        label="Sous-emplacement"
        value={form.sublocation}
        onChange={handleChange("sublocation")}
        items={selectedLocation?.sublocations || []}
        getValue={(sub) => sub}
        getLabel={(sub) => sub}
        disabled={
          !selectedLocation || selectedLocation.sublocations.length === 0
        }
        emptyLabel="Aucun sous-emplacement"
        sx={customStyle}
      />

      {/* Notes */}
      <CustomTextField
        label="Notes"
        value={form.notes}
        onChange={handleChange("notes")}
        multiline
        rows={3}
        sx={{
          ...customStyle,

          "& .MuiInputBase-root": {
            ...customStyle["& .MuiInputBase-root"],
            height: "auto",
            alignItems: "flex-start",
            paddingTop: "6px",
          },
        }}
      />

      <DialogActions>
        {/* RESET button */}
        <Button
          variant="contained"
          size="small"
          onClick={() => setForm(formInitialState)}
          sx={{
            backgroundColor: "gray",
            "&:hover": {
              backgroundColor: "darkgray",
            },
          }}
        >
          Reset
        </Button>

        {/* CREATE button */}
        <Button
          variant="contained"
          size="small"
          onClick={handleAdd}
          color="success"
          disabled={!isFormValid}
        >
          Ajouter
        </Button>

        {/* UPDATE button */}
        <Button
          variant="contained"
          size="small"
          onClick={handleModify}
          color="warning"
          disabled={!isFormValid}
        >
          Modifier
        </Button>

        {/* DELETE button */}
        <Button
          variant="contained"
          size="small"
          onClick={handleDelete}
          color="error"
        >
          Supprimer
        </Button>
      </DialogActions>

      <div className="container__edit-apiResult">
        {isProcessing && <p className="loading">Traitement en cours...</p>}

        {isCreateSuccess && <p className="success">Création réussie</p>}
        {isUpdateSuccess && <p className="success">Mise à jour réussie</p>}

        {isDeleteSuccess && <p className="success">Suppression réussie</p>}

        {(isCreateError || isUpdateError || isDeleteError) && (
          <p className="error">
            ❌ {createError?.message || updateError?.message || deleteError?.message}
          </p>
        )}
      </div>
    </div>
  )
}

export default Edit
