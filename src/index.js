const theatreId = 565;

document.addEventListener("DOMContentLoaded", function(){

  fetch("https://evening-plateau-54365.herokuapp.com/theatres/565")
  .then(resp => resp.json())
  .then(showings => showings.showings.forEach(displayShowing))
})

function displayShowing(showing){

  const showingsDiv = document.querySelector(".ui.cards.showings")

  const movieShowing = document.createElement("div")
  movieShowing.class = "card"
  movieShowing.innerHTML = `<div class="content">
    <div class="header">
      ${showing.film.title}
    </div>
    <div class="meta">
      ${showing.film.runtime} minutes
    </div>
    <div class="description">
      <span class="ui label">
        ${showing.showtime}
      </span>
      ${showing.capacity - showing.tickets_sold} tickets remaining
    </div>
  </div>
  <div class="extra content">
    <div class="ui blue button">Buy Ticket</div>
  </div>
</div>`

  movieShowing.id = `${showing.id}`
  showingsDiv.appendChild(movieShowing)

  const buyTicketButton = movieShowing.querySelector("div.ui.blue.button")
  buyTicketButton.dataset.ticketsRemaining = `${showing.capacity - showing.tickets_sold}`
  buyTicketButton.addEventListener("click", function(){
    buyTicket(showing)
  })
}

function buyTicket(showing){
  console.log(showing)

  if (showing.capacity - showing.tickets_sold < 1){
    soldOut(showing);
  } else {
  let configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      showing_id: `${showing.id}`
    })
  }

  fetch(`https://evening-plateau-54365.herokuapp.com/tickets`, configObj)
  .then(resp => resp.json())
  .then(ticket => updateShowing(showing))
}
}

function updateShowing(showing){
  const targetShowingCard = document.getElementById(`${showing.id}`)
  const targetBuyButton = targetShowingCard.querySelector('div.ui.blue.button')
  const ticketsRemainingDisplay = targetShowingCard.querySelector("div.description")
  const ticketsLeft = targetBuyButton.dataset.ticketsRemaining

  console.log(ticketsLeft)

  ticketsRemainingDisplay.innerHTML = `
  <span class="ui label">
    ${showing.showtime}
  </span>
  //fix it here
  ${(ticketsLeft - 1)} tickets remaining
  `

  targetBuyButton.dataset.ticketsRemaining = ticketsLeft -1
  console.log(targetBuyButton.dataset.ticketsRemaining)
}

function soldOut(showing){
  const targetShowingCard = document.getElementById(`${showing.id}`)
  const buyTicketButton = targetShowingCard.querySelector("div.ui.blue.button")
  alert("We're sorry, but that showing is sold out.")
  buyTicketButton.innerText = "Sold Out"
}
