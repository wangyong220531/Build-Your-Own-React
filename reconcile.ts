import instantiate from "./instantiate"

export default function reconcile(parentDOM, instance, element) {
    if (instance === null) {
        const newInstance = instantiate(element)
        parentDOM.appendChild(newInstance.dom)
        return newInstance
    }
    if (element === null) {
        parentDOM.removeChild(instance.dom)
        return null
    }
    if (instance.element.type !== element.type) {
        const newInstance = instantiate(element)
        parentDOM.replaceChild(newInstance.dom, instance.dom)
        return newInstance
    }
    // if (typeof element.type === "string") {
    //     updateDomProperties(instance.dom, instance.element.props, element.props)
    //     instance.childInstances = reconcileChildren(instance, element)
    //     instance.element = element
    //     return instance
    // }
    
    // Update composite instance
    instance.publicInstance.props = element.props
    const childElement = instance.publicInstance.render()
    const oldChildInstance = instance.childInstance
    const childInstance = reconcile(parentDOM, oldChildInstance, childElement)
    instance.dom = childInstance.dom
    instance.childInstance = childInstance
    instance.element = element
    return instance
}
