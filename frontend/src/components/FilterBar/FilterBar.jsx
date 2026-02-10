// CSS
import "./FilterBar.scss"

import { useState } from "react"
import { ToggleButton, ToggleButtonGroup, Typography } from "@mui/material"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFilter } from "@fortawesome/free-solid-svg-icons"

const FilterBar = ({ items }) => {
  const locations = [...new Set(items.map((item) => item.mainlocation))].filter(
    Boolean,
  )

  const categories = [...new Set(items.map((item) => item.category))].filter(
    Boolean,
  )

  const types = [...new Set(items.map((item) => item.type))].filter(Boolean)

  const [filters, setFilters] = useState({
    location: null,
    category: null,
    type: null,
  })

  const handleChange = (key) => (_, value) => {
    setFilters((prev) => {
      const updated = {
        ...prev,
        [key]: value,
      }

      return updated
    })
  }

  return (
    <section className="container__filterbar">
      <FontAwesomeIcon icon={faFilter} />
      {/* Localisation */}
      <div className="container__filterbar-buttonGroup">
        <p>Localisation</p>
        <ToggleButtonGroup
          size="small"
          exclusive
          value={filters.location}
          onChange={handleChange("location")}
          sx={{ gap: "0.5rem" }}
        >
          {locations.map((loc) => (
            <ToggleButton key={loc} value={loc}>
              {loc}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </div>

      {/* Catégorie */}
      <div className="container__filterbar-buttonGroup">
        <p>Catégorie</p>
        <ToggleButtonGroup
          size="small"
          exclusive
          value={filters.category}
          onChange={handleChange("category")}
        >
          {categories.map((cat) => (
            <ToggleButton key={cat} value={cat}>
              {cat}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </div>

      {/* Type */}
      <div className="container__filterbar-buttonGroup">
        <p>Type</p>
        <ToggleButtonGroup
          size="small"
          exclusive
          value={filters.type}
          onChange={handleChange("type")}
        >
          {types.map((type) => (
            <ToggleButton key={type} value={type}>
              {type}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </div>
    </section>
  )
}

export default FilterBar
