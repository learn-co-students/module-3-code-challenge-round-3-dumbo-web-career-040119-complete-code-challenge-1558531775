// Defining paths
const theatreId = 558;
const URL = `https://evening-plateau-54365.herokuapp.com/`;
const theatreURL = URL + `theatres/${theatreId}`;
const ticketsURL = URL + `tickets`;

// Get showings from API
fetch(theatreURL)
.then(res => res.json())
.then(doc => doc.showings.forEach(showing => putShowingsOnDom(showing)))

// Display showings -> points to createContentHTML function
function putShowingsOnDom(showing) {
  const body = document.querySelector('div.ui.cards.showings');
  const card = document.createElement('div');
  card.className = 'card';

  createContentHTML(card, showing);
  body.appendChild(card);
};

// Creates main content -> points to createExtraDiv function
function createContentHTML(card, showing) {
  const content = document.createElement('div');
  content.className = 'content';

  content.innerHTML = `
    <div class="header">${showing.film.title}</div>
    <div class="meta">${showing.film.runtime} minutes</div>
    <div class="description">
      <span class="ui label">${showing.showtime}</span>
      ${showing.capacity - showing.tickets_sold} remaining tickets
    </div>`;

  card.appendChild(content);
  createExtraDiv(card, showing);
};

// Creates button for selling tickets
function createExtraDiv(card, showing) {
  //create extra div
  const div = document.createElement('div');
  div.className = 'extra content';

  div.innerHTML = `
  <div class="extra content">
  </div>`;

  checkForTickets(div, card, showing);
  card.appendChild(div);
};

// Checks tickets remaining ->
// Displays purchase button if tickets remain, else displays 'Sold Out'
function checkForTickets(div, card, showing) {
  const tickets = parseInt(showing.capacity - showing.tickets_sold);
  if (tickets > 0) {
    const button = document.createElement('button');
    button.className = 'ui blue button';
    button.innerText = 'Buy Ticket';
    button.addEventListener('click', (event) => {
      sellTicket(event, card, showing)
    });

    div.appendChild(button);
  }
  else {
    div.innerText = 'Sold Out'
  };
}

// Sends post request to ticketsURL -> points to updateShowing function
function sellTicket(event, card, showing) {
  const showing_id = showing.id;

  fetch(ticketsURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({showing_id})
  }).then(res => res.json())
  .then(ticket => {
    showing.tickets_sold += 1
    if (showing.tickets_sold == showing.capacity) {
      alert("Congrats lucky duck! You got the last ticket!")
    }
    updateShowing(card, showing)
  });
};

// Resets card HTML and points back to createContentHTML function
function updateShowing(card, showing) {
  const content = card.querySelector('.content')
  card.innerHTML = ''
  createContentHTML(card, showing)
}
