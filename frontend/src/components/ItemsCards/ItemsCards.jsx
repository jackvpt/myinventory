// CSS
import { useDispatch, useSelector } from "react-redux"
import "./ItemsCards.scss"

import { Card } from "@mui/material"
import { setSelectedItem } from "../../features/selectedItemSlice"
import StatusBar from "../SubComponents/StatusBar/StatusBar"

const ItemsCards = ({ items }) => {
  const dispatch = useDispatch()
    const filters = useSelector((state) => state.filters)


  const handleSelectCard = (itemId) => {
    dispatch(
      setSelectedItem(items.find((item) => item.id === itemId).toPayload()),
    )
  }

    const filteredItems = items.filter((item) => {
    return (
      (filters.category ? item.category === filters.category : true) &&
      (filters.type ? item.type === filters.type : true) &&
      (filters.location ? item.mainlocation === filters.location : true)
    )
  })

  return (
    <section className="container__itemsCards">
      {filteredItems.map((item) => (
        <Card
          key={item.id}
          className="container__itemsCards-card"
          onClick={() => handleSelectCard(item.id)}
        >
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
            <div className="container__itemsCards-body-status">
              <StatusBar value={item.status} />
            </div>
          </div>
        </Card>
      ))}
    </section>
  )
}

export default ItemsCards
