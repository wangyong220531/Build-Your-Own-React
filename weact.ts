export interface Ele {
    type: string
    props: {
        id?: string
        type?: string
        value?: string
        href?: string
        nodeValue?: string
        children?: Ele[]
        onClick?: () => void
    }
}

function Test() {
    let rootInstance = null
    const TEXT_ELEMENT = "TEXT_ELEMENT"

    function createElement(type: string, config: { nodeValue: string; children?: Ele[] }, ...args: never[]) {
        const props = Object.assign({}, config)
        const hasChildren = args.length > 0
        const rawChildren = hasChildren ? [].concat(...args) : []
        props.children = rawChildren.filter(c => c != null && c !== false).map(c => (typeof c !== "string" ? c : createTextElement(c)))
        return { type, props }
    }

    function createTextElement(value: string) {
        return createElement(TEXT_ELEMENT, { nodeValue: value })
    }

    function render(element: Ele, container) {
        const prevInstance = rootInstance
        const nextInstance = reconcile(container, prevInstance, element)
        rootInstance = nextInstance
    }

    function reconcile(parentDom: HTMLElement, instance: any, element: Ele) {
        if (instance == null) {
            const newInstance = instantiate(element)
            parentDom.appendChild(newInstance.dom)
            return newInstance
        } else if (element == null) {
            parentDom.removeChild(instance.dom)
            return null
        } else if (instance.element.type !== element.type) {
            const newInstance = instantiate(element)
            parentDom.replaceChild(newInstance.dom, instance.dom)
            return newInstance
        } else if (typeof element.type === "string") {
            updateDomProperties(instance.dom, instance.element.props, element.props)
            instance.childInstances = reconcileChildren(instance, element)
            instance.element = element
            return instance
        } else {
            instance.publicInstance.props = element.props
            const childElement = instance.publicInstance.render()
            const oldChildInstance = instance.childInstance
            const childInstance = reconcile(parentDom, oldChildInstance, childElement)
            instance.dom = childInstance.dom
            instance.childInstance = childInstance
            instance.element = element
            return instance
        }
    }

    function reconcileChildren(instance: any, element: Ele) {
        const dom = instance.dom
        const childInstances = instance.childInstances
        const nextChildElements = element.props.children || []
        const newChildInstances: any[] = []
        const count = Math.max(childInstances.length, nextChildElements.length)
        for (let i = 0; i < count; i++) {
            const childInstance = childInstances[i]
            const childElement = nextChildElements[i]
            const newChildInstance = reconcile(dom, childInstance, childElement)
            newChildInstances.push(newChildInstance)
        }
        return newChildInstances.filter(instance => instance != null)
    }

    function instantiate(element: Ele) {
        const { type, props } = element
        const isDomElement = typeof type === "string"

        if (isDomElement) {
            const isTextElement = type === TEXT_ELEMENT
            const dom: HTMLElement | Text = isTextElement ? document.createTextNode("") : document.createElement(type)
            updateDomProperties(dom, [], props)
            const childElements = props.children || []
            const childInstances = childElements.map(instantiate)
            const childDoms = childInstances.map(childInstance => childInstance.dom)
            childDoms.forEach((childDom: HTMLElement) => dom.appendChild(childDom))
            const instance = { dom, element, childInstances }
            return instance
        } else {
            const instance = {}
            const publicInstance = createPublicInstance(element, instance)
            const childElement = publicInstance.render()
            const childInstance = instantiate(childElement)
            const dom = childInstance.dom
            Object.assign(instance, { dom, element, childInstance, publicInstance })
            return instance
        }
    }

    function updateDomProperties(dom: HTMLElement | Text, prevProps: any, nextProps: any) {
        const isEvent = (name: string) => name.slice(0, 2) === "on"
        const isAttribute = (name: string) => !isEvent(name) && name != "children"

        Object.keys(prevProps)
            .filter(isEvent)
            .forEach(name => {
                const eventType = name.toLowerCase().substring(2)
                dom.removeEventListener(eventType, prevProps[name])
            })

        Object.keys(prevProps)
            .filter(isAttribute)
            .forEach(name => {
                dom[name] = null
            })

        Object.keys(nextProps)
            .filter(isAttribute)
            .forEach(name => {
                dom[name] = nextProps[name]
            })

        Object.keys(nextProps)
            .filter(isEvent)
            .forEach(name => {
                const eventType = name.toLowerCase().substring(2)
                dom.addEventListener(eventType, nextProps[name])
            })
    }

    function createPublicInstance(element, internalInstance) {
        const { type, props } = element
        const publicInstance = new type(props)
        publicInstance.__internalInstance = internalInstance
        return publicInstance
    }

    interface Component {
        props: any
        state: any
        __internalInstance: any
    }

    class Component {
        constructor(props) {
            this.props = props
            this.state = this.state || {}
        }

        setState(partialState) {
            this.state = Object.assign({}, this.state, partialState)
            updateInstance(this.__internalInstance)
        }
    }

    function updateInstance(internalInstance) {
        const parentDom = internalInstance.dom.parentNode
        const element = internalInstance.element
        reconcile(parentDom, internalInstance, element)
    }

    return {
        createElement,
        render,
        Component
    }
}

const Weact = Test()

export default Weact
