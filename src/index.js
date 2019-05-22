
const theatreId = 574;
document.addEventListener("DOMContentLoaded", function(){

  const getDiv = document.querySelector('.ui-cards-showings')

  // console.log(getDiv)

function getAllMovies(){
  fetch('https://evening-plateau-54365.herokuapp.com/theatres/574')
  .then( res => res.json())
  .then(movie => {movie.showings.forEach(display)})
}

function display(showing){
  console.log(showing.id)
  // debugger
  getDiv.innerHTML += `<div data-id="${showing.id}" class="card" >
  <div class="content">
    <div class="header">
      ${showing.film.title}
    </div>
    <div class="meta">
      ${showing.film.runtime}
    </div>
    <div class="description">
      <span class="ui label">
        ${showing.showtime}
      </span>
      ${showing.tickets_sold}
    </div>
  </div>
  <div class="extra content">
    <div class="ui blue button">Buy Ticket</div>
  </div>
</div>`

}

getDiv.addEventListener('click', buyTicket)

function buyTicket(event){
  event.target.classList.contains('ui blue button')
  const showingId = event.target.dataset.id
  const ticketsSpan = event.target.querySelector('span')
  const newTickets = parseInt(ticketsSpan)-1

  fetch('https://evening-plateau-54365.herokuapp.com/tickets',{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      tickets_sold: newTickets
    })
  }).then(res => res.json())
    .then(data => display(data))
}











getAllMovies()

  //
})
