// CSS
import "./Home.scss"

import Item from "../../components/Item/Item"
import { useItems, useCreateItem } from "../../hooks/useItems"
import Edit from "../../components/Edit/Edit"

export default function Inventory() {
  const { data, isLoading, isError, error } = useItems()
  const { mutate, isPending } = useCreateItem()

  if (isLoading) return <p>Chargement…</p>
  if (isError) return <p>{error.message}</p>

  // const handleAdd = () => {
  //   mutate({
  //     label: "Combinaison légère",
  //     quantity: 5,
  //     location: "Caisson",
  //   })
  // }

  return (
    <section className="container__home">
      <h1>Inventaire</h1>
      {/* <Edit open={true} /> */}
      <div className="container__home-items">
        {data.map((item) => (
          <Item key={item.id} {...item} />
        ))}
      </div>


    </section>
  )
}
