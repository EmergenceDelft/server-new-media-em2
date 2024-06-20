export class Message {
  constructor(type, content) {
    this.type = type
    this.content = content
  }

  toJSON() {
    return JSON.stringify({
      type: this.type,
      content: this.content
    })
  }
}
