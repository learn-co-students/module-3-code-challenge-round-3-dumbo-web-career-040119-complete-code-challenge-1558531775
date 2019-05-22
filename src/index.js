document.addEventListener('DOMContentLoaded', (event)=>{
  const theatreId = 567;
  const cardShowings = document.querySelector('.ui cards showings')

fetch("https://evening-plateau-54365.herokuapp.com/theatres/567")
.then(response => response.json())
.then(theaters => theaters.forEach(listOfTheaters))
//Need to forEach and reach the nested array for the showings but I'm not sure how to access it. 



function listOfTheaters(theaters){
  console.log(theaters)
    const newDiv = document.createElement('div')
    newDiv.innerHTML = `<div class="card">
      <div class="content">
        <div class="header">
        </div>
        <div class="meta">
          (Runtime) minutes
        </div>
        <div class="description">
          <span class="ui label">
            (Showtime)
          </span>
          (Num Tickets) remaining tickets
        </div>
      </div>
      <div class="extra content">
        <div class="ui blue button">Buy Ticket</div>
      </div>
    </div>`
    cardShowings.append(newDiv)
}



})
