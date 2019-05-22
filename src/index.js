const theaterId = 571;




function buyTicket(event){
  fetch('https://evening-plateau-54365.herokuapp.com/tickets'), {
    method: "POST",
    headers: {
      "Content-Type":"application/json",
      "Accept":"application/json"
    },
    body: JSON.stringify({ showing_id: parseInt(`event.target.dataset.showingId`)})
 }.then(res => res.json())
   .then(data => console.log(data))

}

function addToDom(data){
  console.log(data)
  const remainingTickets = data.capacity - data.tickets_sold
  const showings = document.querySelector('.showings')
  showings.innerHTML += `
  <div class="card">
   <div class="content">
    <div class="header">
     ${data.film.title}
    </div>
   <div class="meta">
     ${data.film.runtime} minutes
   </div>
   <div class="description">
     <span class="ui label">
       ${data.showtime}
     </span>
     ${remainingTickets} remaining tickets
   </div>
 </div>
 <div class="extra content" id="extra">
 <div class="ui blue button">Buy Ticket</div>
 </div>
</div>
`

const buyButton = document.querySelector('.button')
buyButton.dataset.showingId = `${data.id}`
buyButton.addEventListener("click", buyTicket)
// const buyTicketChildDiv = document.createElement('div')
// buyTicketChildDiv.className = "ui blue button"
// buyTicketChildDiv.addEventListener("click", buyTicket)
// buyTicketParentDiv.appendChild(buyTicketChildDiv)
}
// const buyTicketButtons = document.querySelectorAll('.button')
// buyTicketButtons.forEach(button => button.addEventListener("click", buyTicket))

function loadTheaters(){
  fetch(`https://evening-plateau-54365.herokuapp.com/theatres/${theaterId}`)
  .then(res => res.json())
  .then(data => data.showings.forEach(addToDom))
}

loadTheaters();
