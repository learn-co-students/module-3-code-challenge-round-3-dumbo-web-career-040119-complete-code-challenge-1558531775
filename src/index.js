const theatreId = ('https://evening-plateau-54365.herokuapp.com/theatres/576');
const allTheatres = document.querySelector('.ui cards showings')



fetch(theatreId)
.then(response => response.json())
.then(theatres => theatres.forEach((theatre) => {
    allTheatres.innerHTML = `<div class="card">
    <div class="content">
      <div class="header">
        ${theatre.film}
      </div>
      <div class="meta">
        ${theatre.runtime} minutes
      </div>
      <div class="description">
        <span class="ui label">
          ${theatre.showtime}
        </span>
        ${theatre.capacity} remaining tickets
      </div>
    </div>
    <div class="extra content">
      <div class="ui blue button">Buy Ticket</div>
    </div>
  </div>`
}))


// const createCards = (theatre) => {
//     `<div class="card">
//     <div class="content">
//       <div class="header">
//         ${theatre.film}
//       </div>
//       <div class="meta">
//         ${theatre.runtime} minutes
//       </div>
//       <div class="description">
//         <span class="ui label">
//           ${theatre.showtime}
//         </span>
//         ${theatre.capacity} remaining tickets
//       </div>
//     </div>
//     <div class="extra content">
//       <div class="ui blue button">Buy Ticket</div>
//     </div>
//   </div>`
//   return createCards(theatre)
// }
