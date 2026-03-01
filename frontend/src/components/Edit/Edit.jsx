// CSS
import "./Edit.scss"

// MUI
import {
  Button,
  Slider,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  RadioGroup,
  IconButton,
  FormControlLabel,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
} from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import {
  RemoveCircleOutline,
  ReportProblemOutlined,
  WarningAmberOutlined,
} from "@mui/icons-material"

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
import { setSelectedItem } from "../../features/selectedItemSlice"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faMinusSquare,
  faPlusSquare,
  faSquareXmark,
  faBan,
  faCircleExclamation,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons"
import CustomButton from "../Buttons/CustomButton"
import { useNotification } from "../../hooks/useNotification"

const Edit = ({ onClose }) => {
  const dispatch = useDispatch()
  const selectedItem = useSelector((state) => state.selectedItem)
  const { notifySuccess, notifyError } = useNotification()

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
    // apiStatus = {
    //   success: isCreateSuccess,
    //   error: isCreateError,
    //   errorMsg: createError,
    //   message: "Élément ajouté",
    // }
  }

  if (isUpdateSuccess || isUpdateError) {
    // apiStatus = {
    //   success: isUpdateSuccess,
    //   error: isUpdateError,
    //   errorMsg: updateError,
    //   message: "Élément modifié",
    // }
  }

  if (isDeleteSuccess || isDeleteError) {
    // apiStatus = {
    //   success: isDeleteSuccess,
    //   error: isDeleteError,
    //   errorMsg: deleteError,
    //   message: "Élément supprimé",
    // }
  }

  // Form state
  const formInitialState = {
    category: "",
    type: "",
    label: "",
    quantity: 1,
    mainlocation: "",
    sublocation: "",
    status: 100,
    alert: "",
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

  const handleChange = (field) => (event, newValue) => {
    let value

    // Cas ToggleButtonGroup
    if (field === "alert") {
      value = newValue ?? ""
    } else {
      value = event.target.value

      if (field === "quantity") {
        value = value === "" ? "" : Number(value)
      }
    }

    setForm((prev) => {
      const model = new ItemModel(prev)
      model[field] = value
      return model
    })
  }

  // Check validity for the button
  const isFormValid = () => {
    const model = new ItemModel(form)
    const modelValid = model.isValid()

    return (
      modelValid && subLocationExists(model.mainlocation, model.sublocation)
    )
  }

  const subLocationExists = (mainLocation, sublocation) => {
    const location = locations.find((loc) => loc.name === mainLocation)
    if (!location) return false
    if (location.sublocations.length === 0) return true
    if (location.sublocations.includes(sublocation)) return true
    return false
  }

  const selectedLocation = locations.find(
    (loc) => loc.name === form.mainlocation,
  )

  const resetForm = () => {
    dispatch(setSelectedItem(null))
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
    console.log("model :>> ", model)
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
    },

    /* Label */
    "& .MuiInputLabel-root": {
      color: theme.palette.custom.c2,
    },

    "& .MuiInputLabel-focused": {
      color: theme.palette.info.main,
    },

    /* Multiline container */
    "& .MuiInputBase-multiline": {
      alignItems: "flex-start",
    },

    /* Textarea */
    "& .MuiInputBase-inputMultiline": {
      lineHeight: 1.4,
    },
  })

  const customButtonStyle = {
    backgroundColor: "white",
    color: "black",
    "&:hover": {
      backgroundColor: "gray",
    },
    height: 24,
    borderRadius: 1,
  }

  const customQuantityButtonStyle = {
    ...customButtonStyle,
    width: "24px",
    minWidth: "24px",
    height: "24px",
    fontSize: "0.8rem",
    padding: 0,
  }

  return (
    <Card
      sx={(theme) => ({
        width: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: "6px",
        boxShadow: 2,
        backgroundColor: theme.palette.primary.dark,
        minHeight: 0,
      })}
    >
      {/* Header */}
      <CardHeader
        className="container__edit-header"
        title="Édition"
        action={
          <IconButton
            className="container__edit-header-closeButton"
            aria-label="close"
            onClick={onClose}
          >
            <FontAwesomeIcon
              className="container__edit-header-closeButton-icon"
              icon={faSquareXmark}
              size="lg"
            />
          </IconButton>
        }
        sx={{
          py: 0.5,
          px: 2,
          minHeight: "48px",
          "& .MuiCardHeader-action": {
            alignSelf: "center",
            marginTop: 0,
          },
        }}
        slotProps={{
          title: {
            sx: {
              fontWeight: "bold",
              fontSize: "1.1rem",
            },
          },
        }}
      />

      <CardContent
        sx={{
          flex: 1,
          display: "flex",
          padding: 0,
          overflowY: "auto",
          "&:last-child": {
            paddingBottom: 0,
          },
        }}
      >
        <div className="container__edit-body">
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
                sx={customQuantityButtonStyle}
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
                sx={customQuantityButtonStyle}
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

          <div className="container__edit-body-notesAlert">
            {/* Notes */}
            <div className="container__edit-body-notesAlert-notes">
              <CustomTextField
                label="Notes"
                value={form.notes}
                multiline
                rows={3}
                onChange={handleChange("notes")}
                sx={customStyle}
              />
            </div>

            {/* Alert */}
            <div className="container__edit-body-notesAlert-alert">
              <ToggleButtonGroup
                value={form.alert ?? ""}
                exclusive
                onChange={handleChange("alert")}
                orientation="vertical"
                size="small"
              >
                <ToggleButton value="">
                  <Tooltip title="Aucune">
                    <FontAwesomeIcon
                      className="container__edit-body-notesAlert-alert-icon"
                      icon={faBan}
                    />
                  </Tooltip>
                </ToggleButton>

                <ToggleButton
                  value="caution"
                  sx={{
                    "&.Mui-selected": {
                      color: "warning.main",
                    },
                  }}
                >
                  <Tooltip title="Caution">
                    <FontAwesomeIcon
                      className="container__edit-body-notesAlert-alert-icon caution"
                      icon={faCircleExclamation}
                    />
                  </Tooltip>
                </ToggleButton>

                <ToggleButton
                  value="warning"
                  sx={{
                    "&.Mui-selected": {
                      color: "error.main",
                    },
                  }}
                >
                  <Tooltip title="Warning">
                    <FontAwesomeIcon
                      className="container__edit-body-notesAlert-alert-icon warning"
                      icon={faTriangleExclamation}
                    />
                  </Tooltip>
                </ToggleButton>
              </ToggleButtonGroup>
            </div>
          </div>

          {/* Actions */}
          <CardActions
            sx={{ justifyContent: "flex-end", padding: 0, marginTop: 1 }}
          >
            <div className="container__edit-body-actions">
              {/* Reset */}
              <CustomButton action="reset" onClick={resetForm} />

              {/* Create */}
              <CustomButton
                action="create"
                onClick={handleCreate}
                loading={isCreating}
                disabled={!isFormValid()}
              />

              {/* Update */}
              <CustomButton
                action="update"
                onClick={handleUpdate}
                loading={isUpdating}
                disabled={!isFormValid()}
              />

              {/* Delete */}
              <CustomButton
                action="delete"
                onClick={handleDelete}
                loading={isDeleting}
                disabled={!selectedItem || isDeleting}
              />
            </div>
          </CardActions>
        </div>

        {/* API Status
        <div className="container__edit-body-apiStatus">
          {apiStatus && (
            <ApiStatus
              isSuccess={apiStatus.success}
              isError={apiStatus.error}
              error={apiStatus.errorMsg}
              successMessage={apiStatus.message}
            />
          )}
        </div> */}
      </CardContent>
    </Card>
  )
}

export default Edit
