export default class LocationModel {
  constructor(data = {}) {
    this.id = data._id || data.id || null

    this.name = data.name ?? ""
    this.sublocations = data.sublocations ?? []

    this.createdAt = data.createdAt ? new Date(data.createdAt) : null

    this.updatedAt = data.updatedAt ? new Date(data.updatedAt) : null
  }

  // 🔍 Simple validation
  isValid() {
    return this.name.trim() !== ""
  }

  // 📦 Format ready to send to the API
  toPayload() {
    return {
      name: this.name.trim(),
      sublocations: this.sublocations?.trim() || undefined,
    }
  }
}
