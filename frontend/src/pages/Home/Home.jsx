// CSS
import "./Home.scss"

import { useItems } from "../../hooks/useItems"
import Edit from "../../components/Edit/Edit"
import ItemsDataGrid from "../../components/ItemsDataGrid/ItemsDataGrid"
import FilterBar from "../../components/FilterBar/FilterBar"
import ItemsCards from "../../components/ItemsCards/ItemsCards"

export default function Inventory() {
  const { data, isLoading, isError, error } = useItems()

  if (isLoading) return <p>Chargement…</p>
  if (isError) return <p>{error.message}</p>

  return (
    <section className="container__home">
      <h1>Inventaire</h1>
      <div className="container__home__layout">
        <div className="container__home__layout-actions">
          <Edit open={true} />
        </div>
        <div className="container__home__layout-items">
          <FilterBar items={data} />
          <div className="container__home__layout-items-cards">
            <ItemsCards items={data} />
          </div>
          <div className="container__home__layout-items-grid">
            <ItemsDataGrid items={data} />
          </div>
        </div>
      </div>
    </section>
  )
}
