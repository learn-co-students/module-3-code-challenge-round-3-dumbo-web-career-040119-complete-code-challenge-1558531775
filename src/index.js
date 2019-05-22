const theatreId = 563;

document.addEventListener("DOMContentLoaded", () => {
  allTheatres()
})

const theatresUrl = "https://evening-plateau-54365.herokuapp.com/theatres/563"

function allTheatres(){
  fetch(theatresUrl)
  .then(res => res.json())
  .then(data => {
    // console.log(data);
    data.showings.forEach(showing => {
      const div = document.querySelector('.ui.cards.showings')
      // debugger
      // console.log(div);
      div.innerHTML +=
      `<div data-showing-id="${showing.id} class="card">
        <div class="content">
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
                ${showing.capacity - showing.tickets_sold} remaining tickets
              </div>
              </div>
            <div class="extra content">
          <div data-showing-capacity=${showing.capacity} data-showing-id=${showing.id} data-showing-tickets-sold=${showing.tickets_sold} class="ui blue button">Buy Ticket</div>
        </div>
      </div>`

      div.addEventListener("click", buyTicket)

    })
  })
}

function buyTicket(event){
  // console.log('hi');
  const showingId = event.target.dataset.showingId
  // debugger
  // const showingTicketsSold = event.target.dataset.showingTicketsSold
  // const ticketsSold = parseInt(event.target.dataset.showingTicketsSold)
  // // debugger
  // const capacity = event.target.dataset.showingCapacity
  //  const capacityNum = parseInt(event.target.dataset.showingCapacity)
  //
  // const newTicketsSold = capacityNum - ticketsSold
  // debugger
  // debugger
  const ticketsUrl = "https://evening-plateau-54365.herokuapp.com/tickets/"

  if (event.target.dataset.showingId) {
    fetch(ticketsUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        showing_id: showingId
      })
    })
    .then(res => res.json())
    .then(data => {
      // debugger
      // const
      //logic: if data is 422 error and is sold out, then blue button turns grey that says sold out
      // if (data === {error: "That showing is sold out"}) {
      //
      // };
    })
  }
}
