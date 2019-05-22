document.addEventListener('DOMContentLoaded', (event) => {

const theatreId = null;
    // console.log('DOM loaded');
const listDiv = document.querySelector('#showings')

function getAllMovies() {
  fetch('https://evening-plateau-54365.herokuapp.com/theatres/575')
  .then(response => response.json())
  .then(slapItOnTheDom)
  // .then(data => {data = console.log(data)})

  // .then(slapItOnTheDom)
  // .then(showings => {showings.forEach(slapItOnTheDom)})
}


function slapItOnTheDom(films) {
  listDiv.innerHTML = ""
  // console.log(films)
  films.showings.forEach(function(film){
    console.log(film, showings[film]);
    const filmDiv = `
    <div class="card">
    <div class="content">
      <div class="header">
        "${film.title}"
      </div>
      <div class="meta">
        "${film.runtime}"
      </div>
      <div class="description">
        <span class="ui label">
          "${film.runtime}"
        </span>
        "${film.capacity}"
      </div>
    </div>
    <div class="extra content">
      <div data-id = "${film.id}"class="ui blue button">Buy Ticket</div>
    </div>
  </div>
    `
    listDiv.innerHTML += filmDiv
  })
}










getAllMovies()

});
