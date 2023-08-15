export function updateDomProperties(dom: HTMLElement, preProps: any, nextProps: any) {
    const isEvent = (name: string) => name.slice(0, 2) === "on"
    const isAttribute = (name: string) => !isEvent(name) && name !== "children"

    Object.keys(preProps)
        .filter(isEvent)
        .forEach(name => {
            const eventType = name.toLowerCase().substring(2)
            dom.addEventListener(eventType, preProps[name])
        })

    Object.keys(preProps)
        .filter(isAttribute)
        .forEach(name => {
            dom[name] = null
        })

    Object.keys(nextProps)
        .filter(isAttribute)
        .forEach(name => {
            dom[name] = nextProps[name]
        })

    Object.keys(nextProps)
        .filter(isEvent)
        .forEach(name => {
            const eventType = name.toLowerCase().substring(2)
            dom.addEventListener(eventType, nextProps[name])
        })
}
