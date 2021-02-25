
const hall=document.querySelector('.hall');
const seats=document.querySelectorAll('.row .seat:not(.occupied)');
var movieselected=document.getElementById('movie-selected');
let total_price=0;
var price=+movieselected.value;
var count=0;

populateUI();

// set at local storga
function setMovieDataInStorage(movieIndex,moviePrice){
    localStorage.setItem('movieIndex',movieIndex);
    localStorage.setItem('moviePrice',moviePrice);
}

setMovieDataInStorage(movieselected.selectedIndex,movieselected.value);

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
    //console.log(selectedSeatsIndex);
    localStorage.setItem('selectedSeats',JSON.stringify(selectedSeatsIndex));
}

function populateUI(){
   // console.log("-----from PopulateUI-----");
    var nodes=JSON.parse(localStorage.getItem('selectedSeats'));
    
    var arraynodes=[...seats];
    
    if(nodes!==null && nodes.length>0){

        nodes.forEach((seatindex,index)=>{
            nodes[index]=arraynodes[seatindex];
        })

        arraynodes.forEach((seat,index)=>{ 
            if(nodes.indexOf(seat)>-1){
                seat.classList.add('selected');

            }
        })
    }

    const selectedMovieIndex=localStorage.getItem('movieIndex');
    console.log(selectedMovieIndex);
    movieselected.selectedIndex=selectedMovieIndex;
    const selectedMoviePrice=localStorage.getItem('moviePrice');
    // console.log(selectedMoviePrice);
    movieselected.value=selectedMoviePrice;
    // updateselectedmovie();
    
    //console.log("-----from PopulateUI-----");
}



// select movie
movieselected.addEventListener('change', function(e){
    price=+e.target.value;
    setMovieDataInStorage(e.target.selectedIndex,e.target.value);
    console.log("movie index and price ",e.target.selectedIndex,e.target.value);
    updateselectedmovie();
})

// console.log(seats);
hall.addEventListener('click',e =>{
    if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
        e.target.classList.toggle('selected');
        updateselectedmovie();
    }
})

// onload page , call :--> updateselectedmovie()
updateselectedmovie();

