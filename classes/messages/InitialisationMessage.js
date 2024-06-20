import { Message } from "../Message.js"

export class InitialisationMessage extends Message {
  constructor(content) {
    super()
    this.content = content
  }

  toJSON() {
    return JSON.stringify({
      type: this.type,
      content: this.content
    })
  }
}
