// CSS
import "./Home.scss"

import Item from "../../components/Item/Item"
import { useItems } from "../../hooks/useItems"
import Edit from "../../components/Edit/Edit"
import ItemsDataGrid from "../../components/ItemsDataGrid/ItemsDataGrid"

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
         <ItemsDataGrid items={data} />
        </div>
      </div>
    </section>
  )
}
