import { Ele } from "./index"
import { createPublicInstance } from "./component"
import reconcile from "./reconcile"

let rootInstance = null

function render(element, container) {
    const prevInstance = rootInstance
    const nextInstance = reconcile(container, prevInstance, element)
    rootInstance = nextInstance
}

interface Dom {
    dom?: HTMLElement
}

export default function instantiate(element: Ele) {
    const { type, props } = element
    const isDomElement = typeof type === "string"

    if (isDomElement) {
        const isTextElement = type === "TEXT_ELEMENT"
        const dom = isTextElement ? document.createElement("") : document.createElement(type)

        const isListener = (name: string) => name.slice(0, 2) === "on"
        Object.keys(props)
            .filter(isListener)
            .forEach(name => {
                const eventType = name.toLowerCase().substring(2)
                dom.addEventListener(eventType, props[name])
            })

        const isAttribute = (name: string) => !isListener(name) && name !== "children"
        Object.keys(props)
            .filter(isAttribute)
            .forEach(name => {
                dom[name] = props[name]
            })

        const childElements = props.children || []
        const childInstances = childElements.map(instantiate)
        const childDoms = childInstances.map(childInstance => childInstance.dom)
        childDoms.forEach((childDom: HTMLElement) => dom.appendChild(childDom))

        const instance = { dom, element, childInstances }
        return instance
    } else {
        const instance: Dom = {}
        const publicInstance = createPublicInstance(element, instance)
        const childElement = publicInstance.render()
        const childInstance = instantiate(childElement)
        const dom = childInstance.dom
        Object.assign(instance, { dom, element, childInstance, publicInstance })
        return instance
    }
}
