"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var render_1 = require("./render");
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
                    onClick: function () { return alert("Hi"); },
                    children: [{ type: "TEXT ELEMENT", props: { nodeValue: "click me" } }]
                }
            }
        ]
    }
};
(0, render_1.default)(app, document.getElementById("root"));
