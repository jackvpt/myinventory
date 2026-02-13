// CSS
import "./Edit.scss"

// MUI
import {
  DialogActions,
  Button,
  CircularProgress,
  Box,
  Slider,
  Collapse,
  IconButton,
  Card,
  CardHeader,
  CardContent,
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
import styled from "@emotion/styled"
import { GridExpandMoreIcon } from "@mui/x-data-grid"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMinusSquare, faPlusSquare } from "@fortawesome/free-solid-svg-icons"

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

  // Slider color logic
  const getSliderColor = (value) => {
    if (value <= 20) return "#d32f2f"
    if (value < 50) return "#ed6c02"
    return "#2e7d32"
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

  // IsOpen state
  const [isOpen, setIsOpen] = useState(true)

  // Form state
  const formInitialState = {
    category: "",
    type: "",
    label: "",
    quantity: 1,
    mainlocation: "",
    sublocation: "",
    status: 100,
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

  const customStyle = (theme) => ({
    /* Root normal */
    "& .MuiInputBase-root:not(.MuiInputBase-multiline)": {
      height: 34,
      fontSize: "0.75rem",
    },

    /* Label */
    "& .MuiInputLabel-root": {
      fontSize: "0.7rem",
      color: theme.palette.custom.c2,
    },

    "& .MuiInputLabel-shrink": {
      transform: "translate(14px, -6px) scale(0.75)",
    },

    "& .MuiInputLabel-focused": {
      color: theme.palette.info.main,
    },

    /* Input normal */
    "& .MuiInputBase-input": {
      padding: "4px 6px",
      fontSize: "0.75rem",
    },

    /* Multiline container */
    "& .MuiInputBase-multiline": {
      padding: "6px 12px",
      alignItems: "flex-start",
    },

    /* Textarea */
    "& .MuiInputBase-inputMultiline": {
      padding: 0,
      fontSize: "0.75rem",
      lineHeight: 1.4,
    },
  })

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
    <Card
      sx={(theme) => ({
        width: "100%",
        mb: 2,
        borderRadius: "12px",
        boxShadow: 2,
        backgroundColor: theme.palette.primary.dark,
      })}
    >
      {/* HEADER */}
      <CardHeader
        title="Édition"
        sx={{
          py: 0.5,
          px: 2,
          minHeight: "48px",
        }}
        slotProps={{
          title: {
            sx: {
              fontWeight: "bold",
              fontSize: "1.1rem",
            },
          },
        }}
        action={
          <IconButton
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            sx={{
              transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.25s ease",
            }}
          >
            <GridExpandMoreIcon />
          </IconButton>
        }
      />

      {/* COLLAPSE */}
      <Collapse in={isOpen} timeout="auto">
        <CardContent sx={{ padding: 0 }}>
          {/* Category */}
          <div className="container__edit-body-textField">
            <CustomTextField
              label="Catégorie"
              value={form.category}
              onChange={handleChange("category")}
              items={categories}
              getValue={(cat) => cat.name}
              getLabel={(cat) => cat.name}
              sx={customStyle}
            />
          </div>

          {/* Type */}
          <div className="container__edit-body-textField">
            <CustomTextField
              label="Type"
              value={form.type}
              onChange={handleChange("type")}
              items={types}
              getValue={(cat) => cat.name}
              getLabel={(cat) => cat.name}
              sx={customStyle}
            />
          </div>

          {/* Label */}
          <div className="container__edit-body-textField">
            <CustomTextField
              label="Item"
              value={form.label}
              onChange={handleChange("label")}
              sx={customStyle}
            />
          </div>

          {/* Quantity */}
          <div className="container__edit-body-quantity">
            <CustomTextField
              label="Quantité"
              type="number"
              value={form.quantity}
              onChange={handleChange("quantity")}
              inputProps={{ min: 1 }}
              sx={customStyle}
            />
            <div className="container__edit-body-quantity-buttons">
              <div className="container__edit-body-quantity-buttons-spinner">
                <FontAwesomeIcon
                  icon={faPlusSquare}
                  className="spinner-icon"
                  onClick={() =>
                    setForm((prev) => ({
                      ...prev,
                      quantity: prev.quantity + 1,
                    }))
                  }
                />

                <FontAwesomeIcon
                  icon={faMinusSquare}
                  className="spinner-icon"
                  onClick={() =>
                    setForm((prev) => ({
                      ...prev,
                      quantity: prev.quantity >= 1 ? prev.quantity - 1 : 0,
                    }))
                  }
                />
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
          </div>

          {/* Location */}
          <div className="container__edit-body-textField">
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
          </div>

          {/* Last locations */}
          <div className="container__edit-body-locations">
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

          {/* Sublocation */}
          <div className="container__edit-body-textField">
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
          </div>

          {/* Status */}
          <div className="container__edit-body-status">
            <div className="container__edit-body-status-label">État</div>

            <Slider
              value={form.status}
              min={0}
              max={100}
              step={10}
              valueLabelDisplay="auto"
              onChange={handleChange("status")}
              sx={{
                color: getSliderColor(form.status),

                "& .MuiSlider-thumb": {
                  border: "2px solid currentColor",
                },

                "& .MuiSlider-track": {
                  backgroundColor: "currentColor",
                },

                "& .MuiSlider-rail": {
                  opacity: 0.3,
                },
              }}
            />
          </div>

          {/* Notes */}
          <div className="container__edit-body-textField">
            <CustomTextField
              label="Notes"
              value={form.notes}
              multiline
              rows={3}
              onChange={handleChange("notes")}
              sx={customStyle}
            />
          </div>

          {/* Actions */}
          <DialogActions sx={{ mt: 2 }}>
            {/* Reset */}
            <Button
              variant="contained"
              size="small"
              onClick={resetForm}
              sx={{
                width: "80px",
                backgroundColor: "gray",
                "&:hover": { backgroundColor: "darkgray" },
              }}
            >
              Reset
            </Button>

            {/* Create */}
            <Box sx={{ position: "relative" }}>
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
                    mt: "-12px",
                    ml: "-12px",
                  }}
                />
              )}
            </Box>

            {/* Update */}
            <Box sx={{ position: "relative" }}>
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
                    mt: "-12px",
                    ml: "-12px",
                  }}
                />
              )}
            </Box>

            {/* Delete */}
            <Box sx={{ position: "relative" }}>
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
                    mt: "-12px",
                    ml: "-12px",
                  }}
                />
              )}
            </Box>
          </DialogActions>

          {/* API Status */}
          <div className="container__edit-body-apiStatus">
            {apiStatus && (
              <ApiStatus
                isSuccess={apiStatus.success}
                isError={apiStatus.error}
                error={apiStatus.errorMsg}
                successMessage={apiStatus.message}
              />
            )}
          </div>
        </CardContent>
      </Collapse>
    </Card>
  )
}

export default Edit
