// CSS
import "./Edit.scss"

// MUI
import {
  DialogActions,
  Button,
  Stack,
  CircularProgress,
  Box,
} from "@mui/material"

// React
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

// Hooks
import { useCategories } from "../../hooks/useCategories"
import { useLocations } from "../../hooks/useLocations"
import {
  useCreateItem,
  useDeleteItem,
  useItems,
  useUpdateItem,
} from "../../hooks/useItems"
import { useTypes } from "../../hooks/useTypes"

// Model
import ItemModel from "../../models/ItemModel"

import CustomTextField from "../SubComponents/CustomTextField/CustomTextField"
import ApiStatus from "../SubComponents/ApiStatus/ApiStatus"
import { setSelectedItem } from "../../features/selectedItemSlice"

const Edit = () => {
  const dispatch = useDispatch()
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
    reset: resetUpdate,
  } = useUpdateItem()

  const {
    mutate: deleteItem,
    isPending: isDeleting,
    isSuccess: isDeleteSuccess,
    isError: isDeleteError,
    error: deleteError,
    reset: resetDelete,
  } = useDeleteItem()

  if (
    isCreateSuccess ||
    isCreateError ||
    isUpdateSuccess ||
    isUpdateError ||
    isDeleteSuccess ||
    isDeleteError
  ) {
    setTimeout(() => resetCreate(), 2500)
    setTimeout(() => resetUpdate(), 2500)
    setTimeout(() => resetDelete(), 2500)
  }

  // API status message logic
  let apiStatus = null

  if (isCreateSuccess || isCreateError) {
    apiStatus = {
      success: isCreateSuccess,
      error: isCreateError,
      errorMsg: createError,
      message: "Élément ajouté",
    }
  }

  if (isUpdateSuccess || isUpdateError) {
    apiStatus = {
      success: isUpdateSuccess,
      error: isUpdateError,
      errorMsg: updateError,
      message: "Élément modifié",
    }
  }

  if (isDeleteSuccess || isDeleteError) {
    apiStatus = {
      success: isDeleteSuccess,
      error: isDeleteError,
      errorMsg: deleteError,
      message: "Élément supprimé",
    }
  }

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

  const resetForm = () => {
    setForm(formInitialState)
  }

  const handleCreate = () => {
    const model = new ItemModel(form)
    if (!model.isValid()) {
      console.log("Data not valid")
      return
    }

    createItem(model.toPayload())
  }

  const handleUpdate = () => {
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
    dispatch(setSelectedItem(null))
    resetForm()
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
          onClick={resetForm}
          sx={{
            width: "80px",
            backgroundColor: "gray",
            "&:hover": {
              backgroundColor: "darkgray",
            },
          }}
        >
          Reset
        </Button>

        {/* CREATE button */}
        <Box sx={{ position: "relative", display: "inline-flex" }}>
          <Button
            variant="contained"
            size="small"
            onClick={handleCreate}
            color="success"
            disabled={!isFormValid || isCreating}
            sx={{ width: "100px" }}
          >
            Ajouter
          </Button>

          {isCreating && (
            <CircularProgress
              size={24}
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                marginTop: "-12px",
                marginLeft: "-12px",
              }}
            />
          )}
        </Box>

        {/* UPDATE button */}
        <Box sx={{ position: "relative", display: "inline-flex" }}>
          <Button
            variant="contained"
            size="small"
            onClick={handleUpdate}
            color="warning"
            disabled={!isFormValid || isUpdating}
            sx={{ width: "100px" }}
          >
            Modifier
          </Button>

          {isUpdating && (
            <CircularProgress
              size={24}
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                marginTop: "-12px",
                marginLeft: "-12px",
              }}
            />
          )}
        </Box>

        {/* DELETE button */}
        <Box sx={{ position: "relative", display: "inline-flex" }}>
          <Button
            variant="contained"
            size="small"
            onClick={handleDelete}
            color="error"
            disabled={!isFormValid || isDeleting}
            sx={{ width: "100px" }}
          >
            Supprimer
          </Button>

          {isDeleting && (
            <CircularProgress
              size={24}
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                marginTop: "-12px",
                marginLeft: "-12px",
              }}
            />
          )}
        </Box>
      </DialogActions>
      <div className="container__edit-apiStatus">
        {apiStatus && (
          <ApiStatus
            isSuccess={apiStatus.success}
            isError={apiStatus.error}
            error={apiStatus.errorMsg}
            successMessage={apiStatus.message}
          />
        )}
      </div>
    </div>
  )
}

export default Edit
