
document.addEventListener("DOMContentLoaded", () => {
  const theatreId = "569";
  const URL = "https://evening-plateau-54365.herokuapp.com/theatres/569";


fetch(URL)
.then(response => response.json())
.then(movies => movies.showings.forEach(SlapItOnTheDOM))

function SlapItOnTheDOM(movie) {
  const movieCont = document.querySelector('.cards')
  const movieCard = document.createElement('div')

  const movieTitle = movie.film.title
  const movieRuntime = movie.film.runtime
  const movieShowTime = movie.showtime
  const capacity = movie.capacity
  const tickets_sold = movie.tickets_sold
  const remainingTickets = parseInt(capacity-tickets_sold)

  const buttonBuy = document.createElement('div');

  movieCard.innerHTML =   `<div class="card"> <div class="content"><div class="header">${movieTitle}</div> <div class="meta">${movieRuntime} minutes</div><div class="description"><span class="ui label">${movieShowTime}</span>
      ${remainingTickets} remaining tickets</div></div>
      <div class="extra content"><br></div></div>`
  movieCard.className = 'card'
  movieCard.dataset.buttonId = movie.id
  movieCont.appendChild(movieCard)

  if (remainingTickets == 0){
    buttonBuy.innerHTML = `SORRY UNAVAILABLE`
    }
  else {
  buttonBuy.innerHTML += `Buy Tickets`
  buttonBuy.className = ('ui blue button')
  buttonBuy.dataset.id = movie.id;
  buttonBuy.addEventListener('click', () => {
    buyIt(event, movie)
  })}
  movieCard.appendChild(buttonBuy);
  // document.querySelectorAll('.ui blue button').forEach(button => console.log(button))
}

function buyIt (event, movie) {
  const capacity = movie.capacity
  const tickets_sold = parseInt(movie.tickets_sold + 1)
  const remainingTickets = parseInt(capacity-tickets_sold)
  const movieShowTime = movie.showtime

  fetch(`https://evening-plateau-54365.herokuapp.com/tickets`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({"showing_id": movie.id})
  })
  .then(response => response.json())
  .then(movie =>
    event.target.parentNode.children[0].children[0].children[2].innerHTML = `<div class="description"><span class="ui label">${movieShowTime}</span>
        ${remainingTickets} remaining tickets</div>`)
}

})





// DONE:
// As a user, when the page loads I should see a list of movie showings fetched from a remote API.

// As a user, clicking on the 'Buy Ticket' button should purchase a ticket and decrement the remaining tickets by one. This information should be persisted in the remote API.
//
// As a user I should not be able to purchase a ticket for a sold out showing. The 'Buy Ticket' button should be disabled on sold out showings, and the text should change to "sold out".
