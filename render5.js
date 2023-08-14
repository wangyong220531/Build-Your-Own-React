let rootInstance = null

function render(element, container) {
    const prevInstance = rootInstance
    const nextInstance = reconcile(container, prevInstance, element)
    rootInstance = nextInstance
}

function reconcile(parentDOM, instance, element) {
    if (instance == null) {
        const newInstance = instantiate(element)
        parentDOM.appendChild(newInstance.dom)
        return newInstance
    } else {
        const newInstance = instantiate(element)
        parentDOM.replaceChild(newInstance.dom, instance.dom)
        return newInstance
    }
}

function instantiate(element) {
    const { type, props } = element

    // Create DOM Element
    const isTextElement = type === "TEXT_ELEMENT"
    const dom = isTextElement ? document.createElement("") : document.createElement(type)

    // Add event listner
    const isListener = name => name.startWith("on")
    Object.keys(props)
        .filter(isListener)
        .forEach(name => {
            const eventType = name.toLowerCase().substring(2)
            dom.addEventListener(eventType, props[name])
        })

    // Set properties
    const isAttribute = name => !isListener(name) && name !== "children"
    Object.keys(props)
        .filter(isAttribute)
        .forEach(name => {
            dom[name] = props[name]
        })

    // Instantiate and append children
    const childElements = props.children || []
    const childInstances = childElements.map(instantiate)
    const childDoms = childInstances.map(childInstance => childInstance.dom)
}
