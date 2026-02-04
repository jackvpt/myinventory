// CSS
import "./Item.scss"

const Item = ({ item }) => {
  return (
    <div className="container__item">
      <div className="container__item-type">{item.type}</div>
      <div className="container__item-label">{item.label}</div>
      <div className="container__item-mainlocation">{item.mainlocation}</div>
      <div className="container__item-sublocation">{item.sublocation}</div>
      <div className="container__item-quantity">{item.quantity}</div>
    </div>
  )
}

export default Item
