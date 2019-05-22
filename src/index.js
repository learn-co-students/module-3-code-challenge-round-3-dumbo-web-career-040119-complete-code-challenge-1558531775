const theatreId = 561; //assigned Id
const cardShowing = document.getElementsByClassName('ui cards showings')[0];
let currentShowing = null;

document.addEventListener('DOMContentLoaded',function(){
    console.log('loaded')
    getShowings();
})
function getShowings(){
    fetch(`https://evening-plateau-54365.herokuapp.com/theatres/${theatreId}`)
    .then(resp => resp.json())
    .then(data => {
    //console.log(data.showings);// showings
        data.showings.forEach(showing => {
            createCards(showing);
        })
    })
}

function buyTicketForMovie(){
    console.log(currentShowing.id);
    console.log(currentShowing.capacity);
    console.log(currentShowing.tickets_sold);
    
    fetch(`https://evening-plateau-54365.herokuapp.com/tickets`,{
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            showing_id: currentShowing.id
        })
    })
    .then(resp => resp.json())
    .then(data => {
        console.log(data)});
        console.log(currentShowing);
}

function createCards(showing){
    console.log(showing);
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
                    let spanCapacity = document.createElement('span');
                    spanCapacity.innerText = `Capacity: ${showing.capacity}`;
                divDescription.appendChild(spanShowtime);
                //divDescription.innerHTML += `Capacity: ${showing.capacity}`;
                divDescription.appendChild(spanCapacity);
                let divExtraContent = document.createElement('div');
                    let buyTicket = document.createElement('div');
                    buyTicket.className = "ui blue button";
                    buyTicket.innerText = "Buy Ticket";
                    buyTicket.addEventListener('click',function(){
                        //deals with buy ticket button
                        showing.capacity = parseInt(showing.capacity) - 1
                        spanCapacity.innerText = `Capacity: ${showing.capacity}`
                        currentShowing = showing; //stores instance of showing globally

                        buyTicketForMovie();
                    })
                divExtraContent.appendChild(buyTicket);
            divContent.appendChild(divHeader);
            divContent.appendChild(divRuntime);
            divContent.appendChild(divDescription);
            divContent.appendChild(divExtraContent);
            //cardShowing.appendChild(divContent);
        card.appendChild(divContent);
        cardShowing.appendChild(card);
}
