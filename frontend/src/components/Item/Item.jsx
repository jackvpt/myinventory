// CSS
import "./Item.scss"

import { useDispatch } from "react-redux"
import { setSelectedItem } from "../../features/selectedItemSlice"

const Item = ({ item, header= false }) => {
  const dispatch = useDispatch()

  const handleSelectItem = () => {
    dispatch(setSelectedItem({ ...item }))
  }

  return (
    <div className="container__item" onClick={handleSelectItem}>
      <div className="container__item-category">{item.category}</div>
      <div className="container__item-type">{item.type}</div>
      <div className="container__item-label">{item.label}</div>
      <div className="container__item-mainlocation">{item.mainlocation}</div>
      <div className="container__item-sublocation">{item.sublocation}</div>
      <div className="container__item-quantity">{item.quantity}</div>
      <div title={item.notes} className="container__item-notes">{item.notes}</div>
    </div>
  )
}

export default Item
