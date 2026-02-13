// CSS
import { useDispatch } from "react-redux"
import "./ItemsCards.scss"

import { Card } from "@mui/material"
import { setSelectedItem } from "../../features/selectedItemSlice"

const ItemsCards = ({ items }) => {
  const dispatch = useDispatch()

  const handleSelectCard = (itemId) => {
    dispatch(setSelectedItem(items.find((item) => item.id === itemId).toPayload()))
  }
  return (
    <section className="container__itemsCards">
      {items.map((item) => (
        <Card key={item.id} className="container__itemsCards-card" onClick={() => handleSelectCard(item.id)}>
          <div className="container__itemsCards-header">
            <div className="container__itemsCards-header-labelQuantity">
              <div>{item.label}</div>
              <div className="container__itemsCards-header-labelQuantity-quantity">
                {item.quantity}
              </div>
            </div>
            <div>{item.location}</div>
          </div>
          <div className="container__itemsCards-body">
            <div>
              {item.category} | {item.type}
            </div>
            <div>{item.status}</div>
          </div>
        </Card>
      ))}
    </section>
  )
}

export default ItemsCards
