const theatreId = null;

function slapMovieOnList(data){
  let cardListContainer = document.querySelector(".showings")
  let cardDiv = document.createElement("div")
  cardDiv.className = "card"
  let cardDivContent = document.createElement("div")
  cardDivContent.className = "content"
  let cardDivHeader = document.createElement("div")
  cardDivHeader.className = "header"
  cardDivHeader.innerText = data.film.title
  let cardDivMeta = document.createElement("div")
  cardDivMeta.className = "meta"
  cardDivMeta.innerText = `${data.film.runtime} minutes`
  let cardDivDescription = document.createElement("div")
  cardDivDescription.className = "description"
  let cardDivDescriptionSpan = document.createElement("span")
  cardDivDescriptionSpan.className = "ui label"
  cardDivDescriptionSpan.innerText = data.showtime
  cardDivDescription.appendChild(cardDivDescriptionSpan)
  cardDivDescription.innerText = `${data.capacity-data.tickets_sold} remaining tickets`
  let cardDivExtraContent = document.createElement("div")
  cardDivExtraContent.className = "extra content"
  let cardDivBlueButton = document.createElement("div")
  cardDivBlueButton.className = "ui blue button"
  cardDivBlueButton.innerText = "Buy Ticket"

  if (cardDivDescription.innerText === "0 remaining tickets"){
      cardDivBlueButton.classList.remove("button")
      cardDivBlueButton.innerText = "Sold Out"
  }

  cardDivBlueButton.dataset.movieId = data.id
  cardDivBlueButton.dataset.movieTickets = data.tickets_sold
  cardDivBlueButton.dataset.movieCapacity = data.capacity
  cardDivExtraContent.appendChild(cardDivBlueButton)



  cardDivContent.appendChild(cardDivHeader)
  cardDivContent.appendChild(cardDivMeta)
  cardDivContent.appendChild(cardDivDescription)
  cardDivContent.appendChild(cardDivExtraContent)
  cardDiv.appendChild(cardDivContent)
  cardListContainer.appendChild(cardDiv)
}

// <div class="card">
//   <div class="content">
//     <div class="header">
//       (Film Title)
//     </div>
//     <div class="meta">
//       (Runtime) minutes
//     </div>
//     <div class="description">
//       <span class="ui label">
//         (Showtime)
//       </span>
//       (Num Tickets) remaining tickets
//     </div>
//   </div>
//   <div class="extra content">
//     <div class="ui blue button">Buy Ticket</div>
//   </div>
// </div>

function movieListClick(event){
  console.log("hi")
}

let movieListContainer = document.querySelector(".showings")

function movieListDelegate(){
  movieListContainer.addEventListener("click", function(event){
    if (event.target.classList.contains("button")) {
      let selfId = parseInt(event.target.dataset.movieId)
      currCapacity = parseInt(event.target.dataset.movieCapacity)
      currTickets = parseInt(event.target.dataset.movieTickets)
      currTarget = event.target
      newSoldTickets = currTickets+1
      let newCurrentTickets = currCapacity-currTickets
      let currTicketDisplay = event.target.parentElement.parentElement.childNodes[2]
      let newTicketDisplay = currTicketDisplay
      newTicketDisplay.innerText = `${newCurrentTickets-1} remaining tickets`

      // let currTickets = event.target.parentElement.parentElement.childNodes[2]
      if (currTickets !== currCapacity) {
        fetch("https://evening-plateau-54365.herokuapp.com/tickets",{
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            showing_id: selfId
          })
        })
        .then(function(){
          newTicketDisplay
          currTarget.dataset.movieTickets = newSoldTickets
          if (currTickets === currCapacity) {
            currTarget.classList.remove("button")
            currTarget.innerText = "Sold Out"
          }
        })
        .catch(function(){
          console.log("hi")
        })
      }
    }
  })
}

function fetchMovieList(){
  fetch("https://evening-plateau-54365.herokuapp.com/theatres/560")
    .then(res => res.json())
    .then(data => data.showings.forEach(slapMovieOnList))
}

document.addEventListener("DOMContentLoaded", function(){
  fetchMovieList()
  movieListDelegate()
})
