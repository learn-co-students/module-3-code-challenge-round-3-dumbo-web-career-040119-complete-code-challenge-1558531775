document.addEventListener('DOMContentLoaded', (event) => {
  console.log("good to go!")
});



const theaterId = "https://evening-plateau-54365.herokuapp.com/theatres/577";

const ulTag = document.querySelector('#showings')


const createHTMLCard = (venue) => {
  ulTag.innerHTML += `<div dataset-id="venue.id" class="card">
  <div class="content">
    <div class="header">
      ${venue.title}
    </div>
    <div class="meta">
      ${venue.runtime} minutes
    </div>
    <div class="description">
      <span class="ui label">
        (Showtime)
      </span>
      (Num Tickets) remaining tickets
    </div>
  </div>
  <div class="extra content">
    <div id = "buy-button" class="ui blue button">Buy Ticket</div>
  </div>
</div>`
}

fetch(theaterId)
  .then(res => res.json())
  .then(theaters => {
    // console.log(theaters);
    let theater = Object.values(theaters)
    // console.log(theater);
    theater.forEach(venue => {
      console.log(venue)

      createHTMLCard(venue)
    })
  })
// addded a ticket sale on the DOM
ulTag.addEventListener('click', event => {
  console.log("ulTag clicked")
  if (event.target === "") {
    console.log("button clicked");
    const button = event.target
    const divTag = button.parentElement.querySelector('ulTag')
    console.log(divTag);
    let updatedTickets = parseInt()
    // updateTicketsOnServer(id, updatedTickets)
  }
});
// updating the server
const updateTicketsOnServer = (id, ) => {
  fetch("https://evening-plateau-54365.herokuapp.com/theatres/577", {
    method: "POST",

    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },

    body: JSON.stringify({
      // tickets_sold: updatedTickets
      // showing_id: //venue.id

    })
  })
}
