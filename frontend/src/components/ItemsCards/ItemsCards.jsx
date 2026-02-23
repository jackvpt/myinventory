import { useDispatch, useSelector } from "react-redux"
import { useState, useMemo } from "react"
import { Card, IconButton, Collapse } from "@mui/material"
import { GridExpandMoreIcon } from "@mui/x-data-grid"

import "./ItemsCards.scss"
import { setSelectedItem } from "../../features/selectedItemSlice"
import StatusBar from "../SubComponents/StatusBar/StatusBar"

const ItemsCards = ({ items }) => {
  const dispatch = useDispatch()
  const filters = useSelector((state) => state.filters)

  const [openId, setOpenId] = useState(null)

  const handleSelectCard = (item) => {
    dispatch(setSelectedItem(item.toPayload()))
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
            {/* HEADER */}
            <div className="container__itemsCards-card-header">
              <div className="container__itemsCards-card-header-labelQuantity">
                {isOpen ? (
                  item.label
                ) : (
                  <div className="container__itemsCards-card-header-labelQuantity-labelReduced">
                    {item.label}
                  </div>
                )}
                <div
                  className={`container__itemsCards-card-header-labelQuantity-quantity ${
                    item.quantity === 0 ? "zeroQuantity" : ""
                  }`}
                >
                  {item.quantity}
                </div>
              </div>
              <div>{item.mainlocation}</div>
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
    </section>
  )
}

export default ItemsCards
