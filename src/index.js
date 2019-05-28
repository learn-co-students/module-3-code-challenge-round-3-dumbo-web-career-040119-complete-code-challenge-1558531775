document.addEventListener('DOMContentLoaded', () => {
  const theatreId = 581;
  const GET_URL = 'https://evening-plateau-54365.herokuapp.com/theatres/581'
  const showingsList = document.querySelector('.showings')

  getShowings()

  function getShowings(){
    fetch(GET_URL)
    .then(resp => resp.json())
    .then(theater => theater.showings.forEach(makeCard))
  }

  // delegate event listener
  showingsList.addEventListener("click", () => {
    if (event.target.id === 'buy-ticket') {
      const showingId = event.target.dataset.showingId
      buyTicket(showingId)
    }
  })

  // create card for each showing
  function makeCard(showing){

    const newCard = document.createElement('div')
    newCard.className = 'card'

    const capacity = parseInt(showing.capacity)
    const sold = parseInt(showing.tickets_sold)
    const remaining = capacity - sold

    newCard.innerHTML =
    ` <div class="content" id=card-showing-id-${showing.id}>
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
          <span id='showing-id-${showing.id}'>${remaining} remaining tickets
        </div>
      </div>`

    // logic for button control
    if (remaining === 0) {
      const extra = document.createElement('div')
      extra.classList.add('extra')
      extra.classList.add('content')
      extra.innerText = 'SOLD OUT'

      newCard.appendChild(extra)

    } else {

      const buyBtn = document.createElement('div')
      buyBtn.classList.add('extra')
      buyBtn.classList.add('content')
      buyBtn.id = `extra-showing-id-${showing.id}`
      buyBtn.innerHTML = `<div class="ui blue button" id='buy-ticket' data-showing-id=${showing.id} >Buy Ticket</div>`

      newCard.appendChild(buyBtn)
    }

    showingsList.appendChild(newCard)
  }
  // when button clicked, update database
  function buyTicket(showingId){

    fetch('https://evening-plateau-54365.herokuapp.com/tickets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        showing_id: showingId
      })
    })
    .then(resp => resp.json())
    .then(updateDom(showingId))
  }

  // after successful database post, update dom
  function updateDom(showingId){
    // laughably bad code I started with:
    // const oldRemaining = parseInt(event.target.parentElement.parentElement.parentElement.querySelector('#remaining').innerText)
    
    const oldRemaining = document.querySelector(`#showing-id-${showingId}`)
    const newRemaining = parseInt(oldRemaining.innerText) - 1

    oldRemaining.innerText = newRemaining  + ' remaining tickets'

    if (newRemaining === 0) {

      const extraContent = document.createElement('div')
      extraContent.classList.add('extra')
      extraContent.classList.add('content')
      extraContent.innerHTML = 'SOLD OUT'

      const cardDiv = showingsList.querySelector(`#extra-showing-id-${showingId}`)
      cardDiv.querySelector('#buy-ticket').remove()

      cardDiv.appendChild(extraContent)
    }
  }
})
