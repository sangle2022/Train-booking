

  function findAvailableSeats(seats,nums){
    let ans=[],row=seats[0].row

    for(let i=0;i<seats.length;i++){
        // checking no of seats is equal to nu of seats which is requested to book
     if(nums==ans.length){
      return ans
      }
    //   Find the available seat in one row
      else if(row===seats[i].row){
        ans.push(seats[i])
      }
      else {
        
        row=seats[i].row
        
        ans=[]
        ans.push(seats[i])
      }
      
    }
    //  row is not availble for booking seats in one row 
   
      for(let el of seats){
        if(ans.length===nums){
          return ans
        }
        ans.push(el)
      }
    
    return ans
    
  }

  function markSeatsAsBooked(seats, bookedSeats) {
    for (let i = 0; i < bookedSeats.length; i++) {
        //  Matching the available seate and mark as booked
      seats.find((o) => {
        if (o.number === bookedSeats[i].number) {
            // replacing false value by  true
          return (o.isBooked = true);
        }
      });
    }
    return seats
  }

  function markAllSeatsAsAvailabale(seats) {
    for (let el of seats) {
        el.isBooked=false
    }
    
    return seats
  }

  module.exports={
    markSeatsAsBooked,findAvailableSeats,markAllSeatsAsAvailabale
  }
