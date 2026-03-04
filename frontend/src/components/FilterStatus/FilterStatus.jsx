// CSS
import "./FilterStatus.scss"

import { faFilter } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useSelector } from "react-redux"

const FilterStatus = () => {
  const filters = useSelector((state) => state.filters)
  const hasFilters = Object.values(filters).some(Boolean)

  if (!hasFilters) return null

  return (
    <div className="container__filterStatus">
      <FontAwesomeIcon icon={faFilter} />
      {filters.category && (
        <div className="container__filterStatus-filter">
          Catégorie: {filters.category}
        </div>
      )}
      {filters.location && (
        <div className="container__filterStatus-filter">
          Localisation: {filters.location}
        </div>
      )}
      {filters.type && (
        <div className="container__filterStatus-filter">
          Type: {filters.type}
        </div>
      )}
    </div>
  )
}

export default FilterStatus
