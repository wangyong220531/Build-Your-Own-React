// class Component {
//     constructor(props) {
//         this.props = props
//         this.state = this.state || {}
//     }

import reconcile from "./reconcile"

//     setState(partialState) {
//         this.state = Object.assign({}, this.state, partialState)
//         updateInternalInstance(this._internalInstancee)
//     }
// }

export function createPublicInstance(element, internalInstance) {
    const { type, props } = element
    const public_instance = new type(props)
    public_instance._internalInstancee = internalInstance
    return public_instance
}

export function updateInternalInstance(internalInstance) {
    const parentDOM = internalInstance.dom.parentNode
    const element = internalInstance.element
    reconcile(parentDOM, internalInstance, element)
}
