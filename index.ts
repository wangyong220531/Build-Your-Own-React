import Weact from "./weact"

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

const app: Ele = {
    type: "div",
    props: {
        id: "container",
        children: [
            { type: "input", props: { value: "foo", type: "text" } },
            {
                type: "a",
                props: {
                    href: "/bar",
                    children: [{ type: "TEXT ELEMENT", props: { nodeValue: "bar" } }]
                }
            },
            {
                type: "span",
                props: {
                    onClick: () => alert("Hi"),
                    children: [{ type: "TEXT ELEMENT", props: { nodeValue: "click me" } }]
                }
            }
        ]
    }
}

Weact.render(app, document.getElementById("root"))
