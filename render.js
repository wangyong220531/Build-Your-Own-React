"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function render(element, parentDom) {
    var type = element.type, props = element.props;
    var isTextElement = type === "TEXT ELEMENT";
    var dom = isTextElement ? document.createTextNode("") : document.createElement(type);
    var isListener = function (name) { return name.slice(0, 2) === "on"; };
    Object.keys(props)
        .filter(isListener)
        .forEach(function (name) {
        var eventType = name.toLowerCase().substring(2);
        dom.addEventListener(eventType, props[name]);
    });
    var isAttribute = function (name) { return !isListener(name) && name != "children"; };
    Object.keys(props)
        .filter(isAttribute)
        .forEach(function (name) {
        dom[name] = props[name];
    });
    var childElements = props.children || [];
    childElements.forEach(function (childElement) { return render(childElement, dom); });
    parentDom === null || parentDom === void 0 ? void 0 : parentDom.appendChild(dom);
}
exports.default = render;
