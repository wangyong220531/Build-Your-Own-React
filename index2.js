import render from "./index.js"

const app = {
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
                    onClick: e => alert("Hi"),
                    children: [{ type: "TEXT ELEMENT", props: { nodeValue: "click me" } }]
                }
            }
        ]
    }
}

render(app, document.getElementById("root"))
