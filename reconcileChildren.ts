import reconcile from "./reconcile"

export default function reconcileChildren(instance: any, element: any) {
    const dom = instance.dom
    const childInstances = instance.childInstances
    const nextChildElement = element.props.children || []
    const newChildInstances: any[] = []
    const count = Math.max(childInstances.length, nextChildElement.length)
    for (let i = 0; i < count; i++) {
        const childElement = nextChildElement[i]
        const childInstance = childInstances[i]
        const newChildInstance = reconcile(dom, childInstance, childElement)
        newChildInstances.push(newChildInstance)
    }
    return newChildInstances.filter(instance => instance !== null)
}
