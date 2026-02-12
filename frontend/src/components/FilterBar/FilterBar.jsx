// CSS
import "./FilterBar.scss"

import { ToggleButton, ToggleButtonGroup, Typography } from "@mui/material"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleXmark, faFilter } from "@fortawesome/free-solid-svg-icons"
import { useDispatch, useSelector } from "react-redux"
import { resetFilters, setFilters } from "../../features/filtersSlice"

const FilterBar = ({ items }) => {
  const dispatch = useDispatch()
  const filters = useSelector((state) => state.filters)

  const locations = [...new Set(items.map((item) => item.mainlocation))].filter(
    Boolean,
  )

  const categories = [...new Set(items.map((item) => item.category))].filter(
    Boolean,
  )

  const types = [...new Set(items.map((item) => item.type))].filter(Boolean)

  const handleChange = (key) => (_, value) => {
    const updated = {
      ...filters,
      [key]: value,
    }

    dispatch(setFilters(updated))
  }

  const buttonStyle =(theme) => ({
    textTransform: "none",
    px: 2,
    borderRadius: "2px",

    backgroundColor: theme.palette.primary.main,
    color: "#fff",

    transition: "all 0.2s ease",

    "&:hover": {
      backgroundColor: theme.palette.custom.c2,
    },

    "&.Mui-selected": {
      backgroundColor: theme.palette.custom.c1,
      color: "#fff",

      "&:hover": {
        backgroundColor: theme.palette.custom.c2,
      },
    },
  })

  return (
    <section className="container__filterbar">
      <div className="container__filterbar-icons">
        <FontAwesomeIcon icon={faFilter} />
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="resetIcon"
          onClick={() => dispatch(resetFilters())}
        />
      </div>
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
            <ToggleButton key={loc} value={loc} sx={buttonStyle}>
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
          {categories.map((category) => (
            <ToggleButton key={category} value={category} sx={buttonStyle}>
              {category}
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
            <ToggleButton key={type} value={type} sx={buttonStyle}>
              {type}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </div>
    </section>
  )
}

export default FilterBar
