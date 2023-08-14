function render(element, parentDom) {
    const { type, props } = element
    const dom = createElement(type)

    const isListener = name => name.startsWith("on")
    Object.keys(props)
        .filter(isListener)
        .forEach(name => {
            const eventType = name.toLocaleLowerCase().substring(2)
            dom.addEventListener(eventType, props[name])
        })
    const isAttribute = name => !isListener(name) && name !== "children"
}
