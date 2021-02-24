
const hall=document.querySelector('.hall');
const seats=document.querySelectorAll('.row .seat:not(.occupied)');
var movieselected=document.getElementById('movie-selected');
let total_price=0;
var price=+movieselected.value;
console.log(price);
var count=0;
// set at local storga
function setMovieDataInStorage(movieIndex,moviePrice){
    localStorage.setItem('movieIndex',movieIndex);
    localStorage.setItem('moviePrice',moviePrice);
}


// count selected movie
function updateselectedmovie(){
    var selectedNodes=document.querySelectorAll('.row .seat.selected');
    // console.log("seat selected : ",count);
    count=selectedNodes.length;
    total_price=count*price;
    var note=document.getElementById('note');
    note.innerText="Total Ticket Count : " + count + " Total Price : " + total_price;

    const selectedSeatsIndex=[...selectedNodes].map(function(seat){
        return [...seats].indexOf(seat);
        // selectedNodes is type of nodes ! by doing ... 3 dots it gives same information in array format
        // map is used to return something for each item of array 
        // here its return index of each selected seat ! 
    }); 
                // this is string down below
    localStorage.setItem('selectedSeats',JSON.stringify(selectedSeatsIndex));
}

// select movie
movieselected.addEventListener('change', function(e){
    price=+e.target.value;
    setMovieDataInStorage(e.target.selectedIndex,e.target.value);
    updateselectedmovie();
})

// console.log(seats);
hall.addEventListener('click',e =>{
    if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
        e.target.classList.toggle('selected');
        updateselectedmovie();
    }
})