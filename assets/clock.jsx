const rootDom = document.getElementById("root")

function tick() {
    const time = new Date().toLocaleTimeString()
    const clockTime = <h1>{time}</h1>
    render(clockTime, rootDom)
}

tick()
setInterval(tick, 1000)
