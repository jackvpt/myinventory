// CSS
import "./Edit.scss"

// MUI
import {
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
} from "@mui/material"

// React
import { useState, useEffect } from "react"

// Hooks
import { useCategories } from "../../hooks/useCategories"
import { useLocations } from "../../hooks/useLocations"

// Model
import ItemModel from "../../models/ItemModel"

const Edit = ({ open, onClose, item }) => {
  const { data: categories = [] } = useCategories()
  const { data: locations = [] } = useLocations()

  // Form state
  const [form, setForm] = useState(new ItemModel(item))

  // Update form when item changes
  useEffect(() => {
    setForm(new ItemModel(item))
  }, [item])

  const handleChange = (field) => (event) => {
    setForm((prev) => ({
      ...prev,
      [field]: event.target.value,
    }))
  }

  const selectedLocation = locations.find(
    (loc) => loc.name === form.mainlocation,
  )

  const handleSubmit = () => {
    if (!form.isValid()) return
    onClose(form)
  }

  return (
    <Dialog open={open} onClose={() => onClose(null)} fullWidth maxWidth="sm">
      <DialogContent className="container__edit">
        {/* Category */}
        <TextField
          select
          label="Catégorie"
          value={form.category}
          onChange={handleChange("category")}
          fullWidth
          margin="normal"
        >
          {categories.map((cat) => (
            <MenuItem key={cat.id} value={cat.key}>
              {cat.name}
            </MenuItem>
          ))}
        </TextField>

        {/* Name */}
        <TextField
          label="Nom"
          value={form.label}
          onChange={handleChange("label")}
          fullWidth
          margin="normal"
        />

        {/* Quantity */}
        <TextField
          type="number"
          label="Quantité"
          value={form.quantity}
          onChange={handleChange("quantity")}
          fullWidth
          margin="normal"
          inputProps={{ min: 0 }}
        />

        {/* Main location */}
        <TextField
          select
          label="Emplacement"
          value={form.mainlocation}
          onChange={handleChange("mainlocation")}
          fullWidth
          margin="normal"
        >
          {locations.map((loc) => (
            <MenuItem key={loc.id} value={loc.name}>
              {loc.name}
            </MenuItem>
          ))}
        </TextField>

        {/* Sublocation */}
        <TextField
          select
          label="Sous-emplacement"
          value={form.sublocation || ""}
          onChange={handleChange("sublocation")}
          fullWidth
          margin="normal"
          disabled={!selectedLocation}
        >
          {selectedLocation?.sublocations.map((sub) => (
            <MenuItem key={sub} value={sub}>
              {sub}
            </MenuItem>
          ))}
        </TextField>
      </DialogContent>

      <DialogActions>
        <Button onClick={() => onClose(null)}>Annuler</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Enregistrer
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default Edit
