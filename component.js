class Component {
    constructor(props) {
        this.props = props
        this.state = this.state || {}
    }

    setState(partialState) {
        this.state = Object.assign({}, this.state, partialState)
        updateInternalInstance(this._internalInstancee)
    }
}

function createPublicInstance(element, internalInstance) {
    const { type, props } = element
    const public_instance = new type(props)
    public_instance._internalInstancee = internalInstance
    return public_instance
}

function updateInternalInstance(internalInstance) {
    const parentDOM = internalInstance.dom.parentNode
    const element = internalInstance.element
    reconcile(parentDOM, internalInstance, element)
}
