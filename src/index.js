const theatreId = 562;

document.addEventListener('DOMContentLoaded', () => {
  getMovies()
});

function getMovies() {
  const showingDiv = document.getElementById('mainDiv')
  fetch("https://evening-plateau-54365.herokuapp.com/theatres/579")
  .then(res => res.json())
  .then(theatres => {
    theatres.showings.forEach(showing => {

      const showingId = showing.id
      const capacity = showing.capacity
      const ticketsSold = showing.tickets_sold
      const seatsRemaining = (capacity - ticketsSold)
      const runtime = showing.film.runtime
      const title = showing.film.title
      const showtime = showing.showtime

      const cardDiv = document.createElement("div");
      cardDiv.className = "card"
      cardDiv.id = `film-${showingId}`

      const contentDiv = document.createElement("div");
      contentDiv.className = "content"

      const headerDiv = document.createElement("div")
      headerDiv.className = "header"
      headerDiv.id = `title-${showingId}`
      headerDiv.innerText = title
      contentDiv.appendChild(headerDiv)

      const metaDiv = document.createElement("div")
      metaDiv.className = "meta"
      metaDiv.id = `runtime-${showingId}`
      metaDiv.innerText = `${runtime} minutes`
      contentDiv.appendChild(metaDiv)

      const descriptionDiv = document.createElement("div")
      descriptionDiv.className = "description"
      descriptionDiv.innerHTML =
      `<span id="showtime-${showingId}" class="ui label">
        ${showtime}
      </span>
      <span id="tickets-${showingId}">${seatsRemaining}</span> remaining tickets`
      contentDiv.appendChild(descriptionDiv)

      const extraDiv = document.createElement("div")
      extraDiv.className = "extra content"
      const buttonDiv = document.createElement("div")
      buttonDiv.className = "ui blue button"
      buttonDiv.id = `button-${showingId}`

      if (seatsRemaining === 0) {
        buttonDiv.innerText = "Sold Out"
      } else {
        buttonDiv.innerText = "Buy Ticket"
        buttonDiv.addEventListener('click', buyTicket)
      }
      buttonDiv.dataset.id = `${showingId}`
      extraDiv.appendChild(buttonDiv)

      cardDiv.appendChild(contentDiv)
      cardDiv.appendChild(extraDiv)

      mainDiv.appendChild(cardDiv)
    })
  })
}

function buyTicket(event) {
  const currentShowingId = event.target.dataset.id
  const currentTicketsRemaining = document.getElementById(`tickets-${currentShowingId}`)
  const buyButton = document.getElementById(`button-${currentShowingId}`)

  fetch("https://evening-plateau-54365.herokuapp.com/tickets", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      showing_id: currentShowingId
    })
  })
  .then(res => res.json())
  .then(data => {
    const newTicketsRemaining = parseInt(currentTicketsRemaining.innerText) - 1
    currentTicketsRemaining.innerText = newTicketsRemaining
    if (currentTicketsRemaining.innerText === "0") {
      event.target.innerText = "Sold Out"
      buyButton.removeEventListener("click", buyTicket)
    }
  })
}
