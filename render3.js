function render(element, parentDom) {
    const { type, props } = element

    // Create dom element
    const isTextElement = type === "TEXT ELEMENT"
    const dom = isTextElement ? document.createElement("") : document.createComment(type)

    // Add event listener
    const isListener = name => name.startWith("on")
    Object.keys(props)
        .filter(isListener)
        .forEach(name => {
            const eventType = name.toLowerCase().substring(2)
            dom.addEventListener(eventType, props[name])
        })

    // Set attribute
    const isAttribute = name => !isListener(name) && name !== "children"
    Object.keys(props)
        .filter(isAttribute)
        .forEach(name => {
            dom[name] = props[name]
        })

    // Render children
    const childElements = props.children || []
    childElements.forEach(childElement => render(childElement, dom))

    // Append to parent
    parentDom.appendChild(dom)
}
