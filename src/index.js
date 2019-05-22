/////////////////////////////////////////
//Global Contstants
////////////////////////////////////////
const url = `https://evening-plateau-54365.herokuapp.com/theatres/559/`
const theatreId = 559;
const ticketURL = `https://evening-plateau-54365.herokuapp.com/tickets`

/////////////////////////////////////////
//Fetches All Movie Showings From API
////////////////////////////////////////
function loadMovies(){
  fetch(url)
  .then(res => res.json())
  .then(data => data.showings.forEach(showMovieCard))

/////////////////////////////////////////
//Creates A Single Movie Card From API  
////////////////////////////////////////
function showMovieCard(movie){
  const cardDiv = document.querySelector(".showings")
  const ticketsRemaining = movie.capacity - movie.tickets_sold
  const div = document.createElement("div")
  div.className = `card`
  div.dataset.movieId = movie.id
  div.innerHTML += `  <div class="content">
  <div class="header">
    ${movie.film.title}
  </div>
  <div class="meta">
    ${movie.film.runtime} 
  </div>
  <div class="description">
    <span class="ui label">
      ${movie.showtime}
    </span>
    <span class="movie-${movie.id}">
    ${ticketsRemaining}
    </span>
  </div>
</div>
<div class="extra content">
  <div class="ui blue button" id="${movie.id}">Buy Ticket</div>
</div>`
  cardDiv.appendChild(div)

  const buyButton = document.getElementById(`${movie.id}`)

  if(ticketsRemaining === 0){
    buyButton.className = ""
    buyButton.innerHTML = `<p>Sold Out</p>`
  }

  
  buyButton.addEventListener("click", ()=>{
    purchaseTicket(movie)
  })
}}

/////////////////////////////////////////
//Posts To API to Buy A Ticket
////////////////////////////////////////
function purchaseTicket(movie){

  fetch(ticketURL,{
    method:"POST",
    headers:{
      "Content-Type":"application/json",
      "Accept":"application/json"
    },
    body:JSON.stringify({ showing_id: movie.id})
  })
  .then(res => res.json())
  .then(data => {
    if(data.error){
      soldOut(movie)
    } else {
      ticketUpdater(movie)
    }
  })
}

/////////////////////////////////////////
//Disables Buy Button After A Purchase
////////////////////////////////////////
function soldOut(movie) {
  const buyButton = document.getElementById(`${movie.id}`)
  buyButton.className = ""
  buyButton.innerHTML = `<p>Sold Out</p>`
}

/////////////////////////////////////////
//Updates Remaining Tickets After Purchase
////////////////////////////////////////
function ticketUpdater(movie){
  const span = document.querySelector(`.movie-${movie.id}`)

  let ticketCount = span.innerTex
  span.innerText = ticketCount -1
}

/////////////////////////////////////////
//Loads Content After DOM is Loaded
////////////////////////////////////////
document.addEventListener("DOMContentLoaded", ()=>{
  loadMovies()
})

/*
You will be building out an application that allows a user to purchase movie tickets.

* As a user, when the page loads I should see a list of movie showings fetched from a remote API.

* As a user, clicking on the 'Buy Ticket' button should purchase a ticket and decrement the remaining tickets by one. This information should be persisted in the remote API.

* As a user I should not be able to purchase a ticket for a sold out showing. The 'Buy Ticket' button should be disabled on sold out showings, and the text should change to "sold out". 

https://evening-plateau-54365.herokuapp.com/theatres/559
 */