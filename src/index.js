document.addEventListener('DOMContentLoaded', function(){
  const theatreId = 557;
  const div = document.getElementsByClassName("ui cards showing");
  const ul = document.getElementById("list")
  // const list = Array.from(div)
  const button = ul.getElementById('button')
  const ticketSpan = document.getElementById("ticket")

  button.addEventListener("click", buyTickets)

    function buyTickets(event){
      event.preventDefault();
      const likes = parseInt(ticketSpan.innerText)
      const newTickets = ticket - 1;

      fetch("https://evening-plateau-54365.herokuapp.com/tickets", {
        method: "POST",
        headers: {"Content-Type": "application/json",
                  "Accept": "application/json"},
        body: JSON.stringify({
          showing_id: event.target.id,
          tickets_sold: newtTckets
        })
      })
        .then(res => res.json())
        .then(data => {
          ticketSpan.innerText = newTickets
        })
    }



  fetch("https://evening-plateau-54365.herokuapp.com/theatres/557")
    .then(res => res.json())
    // .then(data => console.log(data))
    .then(theater => theater.showings.forEach(slap))

    function slap(showing){
        // console.log(showing.id, showing.film.title);
        // console.log(showing.id, showing.film.title, showing.film.runtime, showing.showtime, (showing.capacity - showing.tickets_sold));
        // const ul = document.createElement("ul");
        // console.log(div)
        // console.log(document.getElementsByClassName("ui cards showing"))
          ul.innerHTML += `
                              <li data-id=${showing.id}>
                                <h4>${showing.film.title}</h4>
                                <p>${showing.film.runtime} miniutes</p>
                                <p>${showing.showtime}</p>
                                <span>Remaining Tickets:
                                <span id="ticket" data-id="${showing.id}">${showing.capacity - showing.tickets_sold}</span>
                                </span>
                                <button id="button">Buy Ticket</button>

                              </li>
                              `
        // list.appendChild(ul)
    }
});


// document.addEventListener("DOMContentLoaded", function(){
//   const theatreId = 557;
//   const theatreURL = `https://evening-plateau-54365.herokuapp.com/theatres/${theatreId}`
//   const div = document.getElementsByClassName("ui cards showing");
//   const button = div.getElementById('button')
//   let buyTicket = false
//
//   const ul = document.createElement("ul");
//
// //   button.addEventListener('click', () => {
// //     buyTicket = !buyTicket
// //   if (buyTicket) {
// //     button.style.display = 'block'
// //     // submit listener here
// //   } else {
// //     button.style.display = 'none'
// //   }
// // })
//
//
//
//   function slap(showing){
//     console.log(showing.id, showing.film.title);
//
//     div.appendChild(ul);
//     ul.innerHTML += `<ul id="theater" data-id=${theatreId}>
//                       <li data-id=${showing.id}>
//                         <h4 id=${showing.film.title}></h4>
//                         <p id=${showing.film.runtime}></p>
//                         <p id=${showing.film.showtime}></p>
//                         <span>Remaining Tickets:
//                         <span id="likes" data-id="${showing.id}">"${showings.capacity - showings.tickets_sold}"</span>
//                         </span>
//                         <button id="button">Buy Ticket</button>
//
//                       </li>
//                     </ul>`
//
//   }
//
//   // function getFetch(){
//   //   return fetch("https://evening-plateau-54365.herokuapp.com/theatres/557")
//   //     .then(res => res.json())
//   //     // .then(data => data.forEach(slap))
//   //     .then(data => console.log(data))
//   // }
//
//   function getFetch(){
//     return fetch("https://evening-plateau-54365.herokuapp.com/theatres/557")
//       .then(res => res.json())
//       .then(data => console.log(data))
//       // .then(theater => theater.showings.forEach(slap))
//   }
//
//   getFetch();
// })


// used REPL to try it out
// "https://repl.it/repls/PeacefulEqualEmbed"
