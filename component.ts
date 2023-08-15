import reconcile from "./reconcile"

interface Component {
    props: any
    state: any
}

class Component {
    constructor(props) {
        this.props = props
        this.state = this.state || {}
    }

    setState(partialState: any) {
        this.state = Object.assign({}, this.state, partialState)
        updateInternalInstance(this._internalInstancee)
    }
    _internalInstancee(_internalInstancee: any) {
        throw new Error("Method not implemented.")
    }
}

function updateInstance(internalInstance) {
    const parentDOM = internalInstance.dom.parentNode
    const element = internalInstance.element
    reconcile(parentDOM, internalInstance, element)
}

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
