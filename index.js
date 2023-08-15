"use strict"
Object.defineProperty(exports, "__esModule", { value: true })
import render_1 from "./render.js"
var app = {
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
                    onClick: function () {
                        return alert("Hi")
                    },
                    children: [{ type: "TEXT ELEMENT", props: { nodeValue: "click me" } }]
                }
            }
        ]
    }
}
;(0, render_1)(app, document.getElementById("root"))
