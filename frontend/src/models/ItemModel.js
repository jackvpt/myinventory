export default class ItemModel {
  constructor(data = {}) {
    this.id = data._id || data.id || null

    this.category = data.category ?? ""
    this.type = data.type ?? ""
    this.label = data.label ?? ""
    this.quantity = Number(data.quantity ?? 0)

    this.mainlocation = data.mainlocation ?? ""
    this.sublocation = data.sublocation ?? ""

    this.location =
      this.mainlocation + (this.sublocation ? ` - ${this.sublocation}` : "")

    this.notes = data.notes ?? ""
    this.createdAt = data.createdAt ? new Date(data.createdAt) : null

    this.updatedAt = data.updatedAt ? new Date(data.updatedAt) : null
  }

  // 🔍 Simple validation
  isValid() {
    return (
      this.category.trim() !== "" &&
      this.type.trim() !== "" &&
      this.label.trim() !== "" &&
      this.mainlocation.trim() !== "" &&
      this.quantity >= 0
    )
  }

  // 📦 Format ready to send to the API
  toPayload() {
    return {
      category: this.category.trim(),
      type: this.type.trim(),
      label: this.label.trim(),
      quantity: this.quantity,
      mainlocation: this.mainlocation.trim(),
      sublocation: this.sublocation?.trim() || undefined,
      notes: this.notes.trim() || undefined,
    }
  }
}
