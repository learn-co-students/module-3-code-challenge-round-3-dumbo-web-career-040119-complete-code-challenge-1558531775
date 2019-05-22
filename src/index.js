const theatreId = 568;

// const url = "https://evening-plateau-54365.herokuapp.com/theatres/568"

let currentRuntime = null;

function getMovies(){
    return fetch("https://evening-plateau-54365.herokuapp.com/theatres/568")
    .then(resp => resp.json())
    .then(data => (showMovies(data)))
}

function showMovies(data){
    console.log(data)
data.showings.forEach(el =>{


const list = document.querySelector(".showings")
const card = document.createElement("div")
card.className = "card"
const content = document.createElement("content")
content.className = "content"
const header = document.createElement("div")
header.className = header
header.innerText = el["film"].title

content.append(header)
list.append(card)

const runtime = document.createElement("div")
runtime.className = "meta"
runtime.innerText = el["film"].runtime
const description = document.createElement("div")
description.className = "description"
const spanShowtime = document.createElement("span")
spanShowtime.className = "ui label"
spanShowtime.innerText = el.showtime
description.append(spanShowtime)
const extra = document.createElement("div")
extra.className = "extra content"
button = document.createElement("button")
button.className="ui blue button"
button.innerText = "Buy Ticket"

button.addEventListener("click", function(event){
    let currentRuntime = runtime
    update(event, runtime)
})

card.append(content, runtime, description, extra, button)
list.append(card)

// data.showings.film(el => {
//     console.log(el)
// const content = document.createElement("content")
// content.className = "content"
// const header = document.createElement("div")
// header.className = header
// header.innerText = el.title
})


// const runtime = document.createElement("div")
// runtime.className = "meta"
// runtime.innerText = el.runtime
// const description = document.createElement("div")
// description.className = "description"
// const spanShowtime = document.createElement("span")
// spanShowtime.className = "ui label"
// spanShowtime.innerText = el.showtime
// description.append(spanShowtime)
// const extra = document.createElement("div")
// extra.className = "extra content"
// button = document.createElement("button")
// button.className="ui"
// card.append(content, header)
// list.append(div)



// data.showings.film.forEach(el => {
//     console.log(el)
// // const content = document.createElement("content")
// // content.className = "content"
// // const header = document.createElement("div")
// // header.className = header
// // header.innerText = el.title
// })

// data.showings.film(el => {
// const content = document.createElement("content")
// content.className = "content"
// const header = document.createElement("div")
// header.className = header
// header.innerText = el.title
// })
}

function update(e, data){
    let data = parseInt(e.target.innerText)
    let ticket = data - 1
    e.target.innerText = `${ticket}`

    fetch(`https://evening-plateau-54365.herokuapp.com/tickets}/${theatreId}`, {
        method: "PATCH", 
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
            body: JSON.stringify({showing_id: ticket })
      })

 }

document.addEventListener("DOMContentLoaded", function(){
    getMovies()
})





