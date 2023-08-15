import { Ele } from "./index"

export default function render(element: Ele, parentDom: HTMLElement | Text | null) {
    const { type, props } = element
    const isTextElement = type === "TEXT ELEMENT"
    const dom = isTextElement ? document.createTextNode("") : document.createElement(type)

    const isListener = (name: string) => name.slice(0,2) === "on"
    Object.keys(props)
        .filter(isListener)
        .forEach(name => {
            const eventType = name.toLowerCase().substring(2)
            dom.addEventListener(eventType, props[name])
        })

    const isAttribute = (name: string) => !isListener(name) && name != "children"
    Object.keys(props)
        .filter(isAttribute)
        .forEach(name => {
            dom[name] = props[name]
        })

    const childElements = props.children || []
    childElements.forEach((childElement: Ele) => render(childElement, dom))

    parentDom?.appendChild(dom)
}
