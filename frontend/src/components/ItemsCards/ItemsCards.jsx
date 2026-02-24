import { useDispatch, useSelector } from "react-redux"
import { useState, useMemo } from "react"
import { Card, IconButton, Collapse } from "@mui/material"
import { GridExpandMoreIcon } from "@mui/x-data-grid"

import "./ItemsCards.scss"
import { setSelectedItem } from "../../features/selectedItemSlice"
import StatusBar from "../SubComponents/StatusBar/StatusBar"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import ModalEdit from "../ModalEdit/ModalEdit"

const ItemsCards = ({ items }) => {
  const dispatch = useDispatch()
  const filters = useSelector((state) => state.filters)

  const [openId, setOpenId] = useState(null)
  const [openModalEdit, setOpenModalEdit] = useState(false)

  const handleSelectCard = (item) => {
    dispatch(setSelectedItem(item.toPayload()))
  }

  const handleOpenEditModal = (e, item) => {
    e.stopPropagation()
    dispatch(setSelectedItem(item.toPayload()))
    setOpenModalEdit(true)
  }

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      return (
        (!filters.category || item.category === filters.category) &&
        (!filters.type || item.type === filters.type) &&
        (!filters.location || item.mainlocation === filters.location)
      )
    })
  }, [items, filters])

  return (
    <section className="container__itemsCards">
      {filteredItems.map((item) => {
        const isOpen = openId === item.id

        return (
          <Card
            key={item.id}
            className="container__itemsCards-card"
            onClick={() => handleSelectCard(item)}
          >
            {/* Header */}
            <div className="container__itemsCards-card-header">
              <div
                className={`container__itemsCards-card-header-labelQuantity ${isOpen ? "" : "labelReduced"}`}
              >
                <div className="container__itemsCards-card-header-labelQuantity-label">
                  {item.label}
                </div>
                <div
                  className={`container__itemsCards-card-header-labelQuantity-quantity ${
                    item.quantity === 0 ? "zeroQuantity" : ""
                  }`}
                >
                  {item.quantity}
                </div>
              </div>
              <div className="container__itemsCards-card-header-locationEdit">
                <div>{item.mainlocation}</div>

                <IconButton
                  onClick={(e) => {
                    e.stopPropagation()
                    handleOpenEditModal(e, item)
                  }}
                >
                  <FontAwesomeIcon
                    className="container__itemsCards-card-header-locationEdit-editIcon"
                    icon={faPenToSquare}
                  />
                </IconButton>
              </div>
            </div>

            {/* Body (collapsible) */}
            <Collapse in={isOpen} timeout="auto" unmountOnExit>
              <div className="container__itemsCards-card-body">
                <div>
                  {item.sublocation} | {item.type}
                </div>

                <div className="container__itemsCards-card-body-status">
                  <StatusBar value={item.status} />
                </div>
              </div>
            </Collapse>

            <IconButton
              className="container__itemsCards-card-collapseButton"
              onClick={(e) => {
                e.stopPropagation()
                setOpenId(isOpen ? null : item.id)
              }}
              aria-expanded={isOpen}
              sx={{
                padding: 0,
                transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.25s ease",
              }}
            >
              <GridExpandMoreIcon />
            </IconButton>
          </Card>
        )
      })}
      <ModalEdit
        open={openModalEdit}
        onClose={() => setOpenModalEdit(false)}
   
      />
    </section>
  )
}

export default ItemsCards
