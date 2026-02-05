// CSS
import "./Edit.scss"

// MUI
import { DialogActions, Button } from "@mui/material"

// React
import { useState } from "react"

// Hooks
import { useCategories } from "../../hooks/useCategories"
import { useLocations } from "../../hooks/useLocations"

// Model
import ItemModel from "../../models/ItemModel"
import { useCreateItem, useItems } from "../../hooks/useItems"
import CustomTextField from "../SubComponents/CustomTextField/CustomTextField"
import { useTypes } from "../../hooks/useTypes"

const Edit = (item) => {
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

  const { mutate, isPending } = useCreateItem()

  // Form state
  const formInitialState = {
    category: "",
    type: "",
    label: "",
    quantity: 1,
    mainlocation: "",
    sublocation: "",
  }
  const [form, setForm] = useState(formInitialState)

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
    mutate(model.toPayload())
  }

  const handleModify = () => {
    if (!form.isValid()) return
  }

  const handleDelete = () => {}

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

      <DialogActions>
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
        <Button
          variant="contained"
          size="small"
          onClick={handleAdd}
          color="success"
          disabled={!isFormValid}
        >
          Ajouter
        </Button>
        <Button
          variant="contained"
          size="small"
          onClick={handleModify}
          color="warning"
        >
          Modifier
        </Button>
        <Button
          variant="contained"
          size="small"
          onClick={handleDelete}
          color="error"
        >
          Supprimer
        </Button>
      </DialogActions>
    </div>
  )
}

export default Edit
