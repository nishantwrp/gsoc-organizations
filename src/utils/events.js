export class EventBus {
  static _subscriberMap = {}

  static emit(eventName, payload) {
    if (!this._subscriberMap[eventName]) return
    this._subscriberMap[eventName].forEach(fn => fn(payload))
  }

  static subscribe(eventName, callback) {
    if (!this._subscriberMap[eventName]) this._subscriberMap[eventName] = []
    this._subscriberMap[eventName].push(callback)
  }
}
