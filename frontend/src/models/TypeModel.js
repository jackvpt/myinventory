export default class TypeModel {
  constructor(data = {}) {
    this.id = data._id || data.id || null

    this.name = data.name ?? ""
  }

  // 🔍 Simple validation
  isValid() {
    return this.name.trim() !== ""
  }

  // 📦 Format ready to send to the API
  toPayload() {
    return {
      name: this.name.trim(),
    }
  }
}
