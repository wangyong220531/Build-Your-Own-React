function render(element, parentDOM) {
    if (!parentDOM.lastChild) {
        parentDOM.appendChild(dom)
    } else {
        parentDOM.replaceChild(dom, parentDOM.lastChild)
    }
}
