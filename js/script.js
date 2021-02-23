
const hall=document.querySelector('.hall');
const seats=document.querySelectorAll('.row .seat:not(.occupied)');
var movieselected=document.getElementById('movie-selected');
let total_price=0;
var price=+movieselected.value;
console.log(price);
var count=0;


// count selected movie
function updateselectedmovie(){
    var selectednodes=document.querySelectorAll('.row .seat.selected');
    // console.log("seat selected : ",count);
    count=selectednodes.length;
    total_price=count*price;
    var note=document.getElementById('note');
    note.innerText="Total Ticket Count : " + count + " Total Price : " + total_price;
}

// select movie
movieselected.addEventListener('change', function(e){
    price=+e.target.value;
    updateselectedmovie();
})

// console.log(seats);
hall.addEventListener('click',e =>{
    if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
        e.target.classList='seat selected';
        updateselectedmovie();
    }
})