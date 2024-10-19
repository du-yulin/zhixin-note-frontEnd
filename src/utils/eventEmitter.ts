export type Event =
  | 'GENERAL:REQUEST_TIMEOUT'
  | 'GENERAL:NETWORK_ERROR'
  | 'GENERAL:UNKNOWN_ERROR'
  | 'API:400_BAD_REQUEST'
  | 'API:401_UNAUTHORIZED'
  | 'API:403_FORBIDDEN'
  | 'API:404_NOT_FOUND'
  | 'API:500_SERVER_ERROR'


export type EventCallBack = (data?: any) => void

class EventEmitter {
  #eventsMap: Map<Event, Set<EventCallBack>> = new Map()
  on(event: Event | Event[], callback: EventCallBack) {
    if (typeof event === 'string') event = [event]
    event.forEach((e) => {
      const callbacks = this.#eventsMap.get(e)
      if (callbacks) {
        callbacks.add(callback)
      } else {
        this.#eventsMap.set(e, new Set([callback]))
      }
    })
  }
  off(event: Event, callback: EventCallBack) {
    const callbacks = this.#eventsMap.get(event)
    if (callbacks) {
      callbacks.delete(callback)
    }
  }
  emit(event: Event | Event[], data?: any) {
    if (typeof event === 'string') event = [event]
    event.forEach((e) => {
      const callbacks = this.#eventsMap.get(e)
      if (callbacks) {
        callbacks.forEach((callback) => {
          data ? callback(data) : callback()
        })
      }
    })
  }
}

export default new EventEmitter()
