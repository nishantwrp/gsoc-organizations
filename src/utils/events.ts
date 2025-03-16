type EventCallBack<T = any> = (payload: T) => void

export class EventBus {
  // Define a static map to store event subscribers
  private static _subscriberMap: Record<string, EventCallBack[]> = {}

  /**
   * Emit an event with a payload to all subscribers.
   * @param eventName - The name of the event to emit.
   * @param payload - The data to pass to the subscribers.
   */
  static emit<T = any>(eventName: string, payload: T): void {
    if (!this._subscriberMap[eventName]) return
    this._subscriberMap[eventName].forEach(callback => callback(payload))
  }
  /**
   * Subscribe to an event.
   * @param eventName - The name of the event to subscribe to.
   * @param callback - The function to call when the event is emitted.
   */
  static subscribe<T = any>(
    eventName: string,
    callback: EventCallBack<T>
  ): void {
    if (!this._subscriberMap[eventName]) this._subscriberMap[eventName] = []
    this._subscriberMap[eventName].push(callback)
  }
}
