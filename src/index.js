const theatreId = 572;
const theatreUrl = "https://evening-plateau-54365.herokuapp.com/theatres/572"
const newTicketUrl = `https://evening-plateau-54365.herokuapp.com/tickets`

let allShowingsDiv = document.querySelector(".showings")
let showingCounter = 0


document.addEventListener("DOMContentLoaded", () =>{
	loadTicketsFromAPI();
})

function loadTicketsFromAPI(){

	fetch(theatreUrl)
	.then(res => res.json())
	.then(theatre => theatre.showings.forEach(showing => makeShowingCard(showing)))
}

function makeShowingCard(theatre){
	// debugger
	console.log(theatre)
	let remainingTix = theatre.capacity - theatre.tickets_sold
	const newCard = document.createElement("div")
	newCard.className = "card"
	newCard.innerHTML += `
		  <div class="content">
		    <div class="header">
		      ${theatre.film.title}
		    </div>
		    <div class="meta">
		      ${theatre.film.runtime} minutes
		    </div>
		    <div class="description">
		      <span class="ui label">
		        ${theatre.showtime}
		      </span>
		      <span class="tix-${theatre.id}"">${remainingTix}</span> remaining tickets
		    </div>
		  </div>
		  <div class="extra content">
		    
		  </div>
	`
	const buyTicketButton = document.createElement("div")
	buyTicketButton.className = "ui blue button"
	buyTicketButton.innerText = "Buy Ticket"
	buyTicketButton.id = `buy-${theatre.id}`
	//for display: if capacity > 0 , display: block, 
	// else 
	//	display: hidden
	//	buyTicketButton.innerHTML = "Sold Out"
	allShowingsDiv.appendChild(newCard)
	
	buyTicketButton.dataset.showingID = theatre.id
	buyTicketButton.dataset.capacity = theatre.capacity
	buyTicketButton.dataset.ticketsSold = theatre.tickets_sold
	newCard.querySelector(".extra").appendChild(buyTicketButton)
	// debugger
	if (parseInt(theatre.tickets_sold) === parseInt(theatre.capacity)){
		buyTicketButton.innerHTML = "Sold Out"
	} else {
		buyTicketButton.style.display = "block"
	}
	// 
	// debugger
	console.log("RIGHT BEFORE BUYTIKET")
	let spanTix = document.querySelector(`.tix-${buyTicketButton.dataset.showingID}`)
		console.log(spanTix)
	buyTicketButton.addEventListener("click", buyTicket)
	
}

function buyTicket(){
	let myShowingID = event.target.dataset.showingID 

 	event.target.dataset.ticketsSold = parseInt(event.target.dataset.ticketsSold) + 1
 	//this is why my likes wasn't working, needed parseint and increment up here
 	// event.target.dataset.capacity -= 1 

 	let myCapacity = event.target.dataset.capacity
	let myTicketsSold = event.target.dataset.ticketsSold
	let spanTix = document.querySelector(`.tix-${myShowingID}`)
	console.log(spanTix)
	// debugger

	fetch(newTicketUrl, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Accept": "application/json"
		},
		body: JSON.stringify({tickets_sold: myTicketsSold, showing_id: myShowingID})
	})
	.then(res => res.json())
	.then(function(ticket){
		console.log("in fetch still", ticket)
		// let buyTicketButton = document.querySelector(`#buy-${myShowingID}`)
		let spanTix = document.querySelector(`.tix-${ticket.showing_id}`)
		// console.log(spanTix)
		// spanTix.innerText = ""
		spanTix.innerText = myCapacity - myTicketsSold
		// console.log(spanTix)
				
	})
	
	
	// debugger
	// if(myCapacity === myTicketsSold){
	// 	event.target.innerHTML = "Sold Out"
	// }else {
	// 	spanTix.innerText = myCapacity - myTicketsSold
	// }
}





















// 