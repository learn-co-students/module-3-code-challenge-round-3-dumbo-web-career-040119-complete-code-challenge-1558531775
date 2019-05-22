const theatreId = 566;

// let newUiCardShowDiv = document.createElement('div')
// newUiCardShowDiv.className = 'ui_card_showing'
// document.body.appendChild(newUiCardShowDiv)
let uiCardShowingDiv = document.getElementById('ui_cards')

const createShowCardHTML = (show) => {

    return `<div class="card">
    <div class="content">
      <div class="header">
        ${show.film.title}
      </div>
      <div class="meta">
        ${show.film.runtime}
      </div>
      <div class="description">
        <span class="ui label">
          ${show.showtime}
        </span>
        ${((show.capacity) - (show.tickets_sold))} remaining tickets
      </div>
    </div>
    <div class="extra content">
      <div data-id='${show.id}' class="ui blue button" data-tickets_sold-id='${show.tickets_sold}'>Buy Ticket</div>
    </div>
  </div>`
} 

const showFetch = () => {
fetch(`https://evening-plateau-54365.herokuapp.com/theatres/${theatreId}`)
.then(res => res.json())
.then((theatre) => {
    //console.log(parsedRes)
    theatre.showings.forEach((show) => {
        //console.log(show)
        //let showHTML = createShowCardHTML(show)
        uiCardShowingDiv.innerHTML += createShowCardHTML(show)
        //return uiCardShowingDiv.append(showHTML)
    })
})
}
showFetch()

uiCardShowingDiv.addEventListener('click', (event) => {
    let showId = event.target.dataset.id
    

    if (event.target.className === 'ui blue button') {
        //console.log('you clicked the buy button')
        event.target.dataset.tickets_soldId++
        let soldTicket = event.target.dataset.tickets_soldId
        let ticketsLeft = (20 - soldTicket)
        //debugger
        fetch(`https://evening-plateau-54365.herokuapp.com/tickets`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              },
            body: JSON.stringify({
                'showing_id': `${showId}`,
                'tickets_sold': `${soldTicket}`
            })
        }).then(res => res.json())
        .then(ticketSold => `event.target.innerText` = ticketsLeft)
    }
})

