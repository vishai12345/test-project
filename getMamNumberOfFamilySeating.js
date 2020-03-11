var getmaxSeatting = (numberOfRows, boockedSeats) => {
    
    // status 0 for available and status 1 for booked 
    var totalSeat = [];
    var localIndex = 0;
    var numberOfFamilysCanSeat = 0;
    for(let i = 1; i<=numberOfRows; i++){
        var newRow = [
            { seat: "a"+i, status: 0 },
            { seat: "b"+i, status: 0 },
            { seat: "c"+i, status: 0 },
            { seat: "d"+i, status: 0 },
            { seat: "e"+i, status: 0 },
            { seat: "f"+i, status: 0 },
            { seat: "g"+i, status: 0 },
            { seat: "h"+i, status: 0 },
            { seat: "i"+i, status: 0 },
            { seat: "j"+i, status: 0 },
        ];
        newRow.map(element=>{
            var a = boockedSeats.indexOf(element.seat);
            if(a !== -1)
                element.status = 1
        });
        totalSeat = totalSeat.concat(newRow);
    }
    for(let i = 1; i<=numberOfRows; i++){
        if(!totalSeat[localIndex+1].status && !totalSeat[localIndex+2].status && !totalSeat[localIndex+3].status && !totalSeat[localIndex+4].status){
            numberOfFamilysCanSeat+=1;
            if(!totalSeat[localIndex+5].status && !totalSeat[localIndex+6].status && !totalSeat[localIndex+7].status && !totalSeat[localIndex+8].status){
                numberOfFamilysCanSeat+=1;
            }
        } else if(!totalSeat[localIndex+3].status && !totalSeat[localIndex+4].status && !totalSeat[localIndex+5].status && !totalSeat[localIndex+6].status) {
            numberOfFamilysCanSeat+=1;
        } else if(!totalSeat[localIndex+1].status && !totalSeat[localIndex+1].status && !totalSeat[localIndex+2].status && !totalSeat[localIndex+3].status){
            numberOfFamilysCanSeat+=1;
        }
    }
    return numberOfFamilysCanSeat
};

var maxNumberOfFamilyCanSeat = getmaxSeatting(5,["b1","b5"]);
console.log(maxNumberOfFamilyCanSeat, "maxNumberOfFamilyCanSeat")