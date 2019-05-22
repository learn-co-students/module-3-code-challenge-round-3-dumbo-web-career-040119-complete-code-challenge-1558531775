const theatreId = 573;

document.addEventListener('DOMContentLoaded', function(e) {

const allShowDiv = document.querySelector('.showings')



  function getAllShowings() {
    fetch("https://evening-plateau-54365.herokuapp.com/theatres/573")
    .then(res => res.json())
    .then(data => {
      data.showings.forEach(slapItOnTheDom)})
// console.log(data.showings)
    // debugger
  }

  function slapItOnTheDom(showing) {
    // console.log(showing.id)

    const tickets_remaining = parseInt(showing.capacity) - parseInt(showing.tickets_sold)

    // console.log(tickets_remaining)

    allShowDiv.innerHTML += `<div class="card">
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
          ${tickets_remaining} remaining tickets
        </div>
      </div>
      <div class="extra content">
        <div class="ui blue button" data-id=${showing.id}>Buy Ticket</div>
      </div>
    </div>`

    const buyBtn = document.querySelector('.button')
    // console.log(buyBtn)
    // debugger

    buyBtn.addEventListener("click", function(event) {

      const showingId = buyBtn.dataset.id
      console.log(showingId)

      let tickets_sold = parseInt(showing.tickets_sold)

      let tickets_remaining = parseInt(showing.capacity) - parseInt(showing.tickets_sold)

      if (tickets_remaining > 0) {

        tickets_sold += 1

      } else {
        return null
      }

      fetch("https://evening-plateau-54365.herokuapp.com/tickets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          showing_id: showingId,
          tickets_sold: tickets_sold
        })
      })
      .then(res => res.json())
      .then(showing => {
        tickets_remaining = parseInt(showing.capacity) - parseInt(showing.tickets_sold)
      })

    })


  }


getAllShowings()

});
