import { useItems, useCreateItem } from "../../hooks/useItems"

export default function Inventory() {
  const { data, isLoading, isError, error } = useItems()
  const { mutate, isPending } = useCreateItem()

  if (isLoading) return <p>Chargement…</p>
  if (isError) return <p>{error.message}</p>

  const handleAdd = () => {
    mutate({
      name: "Clavier",
      quantity: 5,
    })
  }

  return (
    <>
      <h1>Inventaire</h1>

      <ul>
        {data.map((item) => (
          <li key={item.id}>
            {item.label} — {item.quantity} - {item.location}
          </li>
        ))}
      </ul>

      <button onClick={handleAdd} disabled={isPending}>
        Ajouter un item
      </button>
    </>
  )
}
