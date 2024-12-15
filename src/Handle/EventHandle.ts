type EventCallback<T = any> = (...args: T[]) => void;

export class EventManager<TEventMap extends Record<string, any>> {
    private listeners: Map<keyof TEventMap, EventCallback[]> = new Map();

    public on<K extends keyof TEventMap>(
        event: K,
        callback: (...args: Parameters<TEventMap[K]>) => void
    ) {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, []);
        }
        this.listeners.get(event)!.push(callback);
    }

    public ons<K extends keyof TEventMap>(
        events: K[],
        callback: (args: Record<K, Parameters<TEventMap[K]>>) => void
    ) {
        const eventResults: Partial<Record<K, Parameters<TEventMap[K]>>> = {};
        const checkAllEvents = () => events.every((event) => eventResults.hasOwnProperty(event));

        events.forEach((event) => {
            this.on(event, (...args: Parameters<TEventMap[K]>) => {
                eventResults[event] = args;
                if (checkAllEvents()) {
                    callback(eventResults as Record<K, Parameters<TEventMap[K]>>);
                }
            });
        });
    }

    public emit<K extends keyof TEventMap>(
        event: K,
        ...args: Parameters<TEventMap[K]>
    ) {
        const callbacks = this.listeners.get(event);
        if (callbacks) {
            callbacks.forEach((callback) => callback(...args));
        }
    }
}
