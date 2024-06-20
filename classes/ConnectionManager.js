export class ConnectionManager {
  constructor() {
    this.connections = new Map()
  }

  addConnection(macAddress, ws) {
    this.connections.set(macAddress, ws)
  }

  removeConnection(macAddress) {
    this.connections.delete(macAddress)
  }

  getConnection(macAddress) {
    return this.connections.get(macAddress)
  }

  getAllConnections() {
    return Array.from(this.connections.values())
  }

  getAllConnectionsExcept(macAddress) {
    return Array.from(this.connections.entries())
      .filter(([key]) => key !== macAddress)
      .map(([, ws]) => ws)
  }

  broadcastMessage(macAddresses, message) {
    macAddresses.forEach((macAddress) => {
      const ws = this.getConnection(macAddress)
      if (ws) {
        ws.send(message.toJSON())
      }
    })
  }

  sendMessage(macAddress, message) {
    const ws = this.getConnection(macAddress)
    if (ws) {
      ws.send(message.toJSON())
    }
  }
}
