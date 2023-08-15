import { Ele } from "./index"

export default function createElement(type: string, config: { nodeValue: string; children?: Ele[] }, ...args: never[]) {
    const props = Object.assign({}, config)
    const hasChildren = args.length > 0
    const rawChildren = hasChildren ? [].concat(...args) : []
    props.children = rawChildren.filter(c => c !== null && c !== false).map(c => (typeof c !== "string" ? c : creatTextElement(c)))
    return { type, props }
}

function creatTextElement(value: string) {
    const TEXT_ELEMENT = "TEXT ELEMENT"
    return createElement(TEXT_ELEMENT, { nodeValue: value })
}
