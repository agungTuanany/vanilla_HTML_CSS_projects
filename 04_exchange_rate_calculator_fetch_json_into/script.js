function calculate() {
    // fetch always return a promise so we catch promise with then
    fetch("item.json")
        .then (res => res.json())
        // .then (data => console.log (data))
        .then (data => document.body.innerHTML = data[0].text)
}

calculate()
