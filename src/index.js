const theatreId = 561; //assigned Id
const cardShowing = document.getElementsByClassName('ui cards showings')[0];

document.addEventListener('DOMContentLoaded',function(){
    console.log('loaded')
    getShowings();
})
function getShowings(){
    fetch(`https://evening-plateau-54365.herokuapp.com/theatres/${theatreId}`)
.then(resp => resp.json())
.then(data => {
    console.log(data.showings);// showings
    data.showings.forEach(showing => {
        createCards(showing);
    })
})
}

function createCards(showing){
    let card = document.createElement('div');
        card.className = "card";
            let divContent = document.createElement('div');
            divContent.className = "content";
                let divHeader = document.createElement('div');
                divHeader.innerText = `Title: ${showing.film.title}`;
                let divRuntime = document.createElement('div');
                divRuntime.className = "meta";
                divRuntime.innerText = `Runtime: ${showing.film.runtime}`;
                let divDescription = document.createElement('div');
                divDescription.className = "description";
                // divDescription.innerText = `Capacity: ${showing.capacity}`;
                    let spanShowtime = document.createElement('span');
                    spanShowtime.className = "ui label";
                    spanShowtime.innerText = showing.showtime;
                divDescription.appendChild(spanShowtime);
                divDescription.innerHTML += `Capacity: ${showing.capacity}`;
                let divExtraContent = document.createElement('div');
                    let buyTicket = document.createElement('div');
                    buyTicket.className = "ui blue button";
                    buyTicket.innerText = "Buy Ticket";
                divExtraContent.appendChild(buyTicket);
            divContent.appendChild(divHeader);
            divContent.appendChild(divRuntime);
            divContent.appendChild(divDescription);
            divContent.appendChild(divExtraContent);
            //cardShowing.appendChild(divContent);
        card.appendChild(divContent);
        cardShowing.appendChild(card);
}
