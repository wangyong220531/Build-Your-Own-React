const TEXT_ELEMENT = "TEXT ELEMENT"

function createElement(type, config, ...args) {
    const props = Object.assign({}, config)
    const hasChildren = args.length > 0
    const rawChildren = hasChildren ? [].concat(...args) : []
    props.children = rawChildren.filter(c => c !== null && c !== false).map(c => (c instanceof Object ? c : creatTextElement(c)))
    return { type, props }
}

function creatTextElement(value) {
    return createElement(TEXT_ELEMENT, { nodeValue: value })
}
