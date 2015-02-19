function turn(vehicles,peoples,buildings){
  for(var i=0; i<vehicles.length; i++){
    // Handle Empty Cars
    if (vehicles[i].peoples.length === 0) {
      var nearestOccupiedBuilding = buildings[findNearestOccupiedBuilding(vehicles[i],peoples,buildings)];
      vehicles[i].moveTo(nearestOccupiedBuilding);
      if (sameSpot(vehicles[i],nearestOccupiedBuilding)){
        // pick up everyone at current building with similar destinations
        var peoplesToGrab = getSameDestinationPeople(peoples, vehicles[i]);
        for(var j=0; j<peoplesToGrab.length; j++){
          if (vehicles[i].peoples.length < 4){
            vehicles[i].pick(peoples[peoplesToGrab[j]]);
          }
        }
      }
    }
    // Handle partially and fully filled cars
    if (vehicles[i].peoples.length > 0) {
      // choose nearest destination
      var currentDestination = null;
      var currentDestinationDist = Number.POSITIVE_INFINITY;
      for(var j=0; j<vehicles[i].peoples.length; j++){
        var buildingName = vehicles[i].peoples[j].destination;
        for(var k=0; k<buildings.length; k++){
          if (buildingName === buildings[k].name) {
            var dist = getDist(vehicles[i], buildings[k]);
            if (dist < currentDestinationDist) {
              currentDestinationDist = dist;
              currentDestination = buildings[k];
            }
          }
        }
      }
      vehicles[i].moveTo(currentDestination);
      // pick up everyone at current spot who share current customers destinations
      for(var j=0; j<peoples.length; j++){
        if (sameSpot(vehicles[i], peoples[j]) && vehicles[i].peoples.length < 4) {
          for(var k=0; k<vehicles[i].peoples.length; k++){
            if(peoples[j].destination === vehicles[i].peoples[k].destination){
              vehicles[i].pick(peoples[j]);
            }
          }
        }
      }

    }
  }
};

function sameSpot(p1, p2){
  if (p1.x === p2.x && p1.y === p2.y) {
    return true;
  } else {
    return false;
  }
};

function findNearestOccupiedBuilding(vehicle, peoples, buildings){
  var locations = [];
  for(var i=0; i<buildings.length; i++){
    locations[i] = getSameDestinationPeople(peoples,buildings[i]);
  }
  var nearestOccupiedBuilding = {
    dist: Number.POSITIVE_INFINITY,
    index: null
  };
  for(var i=0; i<buildings.length; i++){
    var dist = getDist(vehicle, buildings[i]);
    if (dist < nearestOccupiedBuilding.dist && locations[i].length > 0) {
      nearestOccupiedBuilding.dist = dist;
      nearestOccupiedBuilding.index = i;
    }
  }
  return nearestOccupiedBuilding.index;
};

function getDist(p1, p2){
  return Math.pow((Math.pow(p1.x-p2.x, 2) + Math.pow(p1.y-p2.y, 2)), 0.5)
};

function getSameDestinationPeople(peoples, location){
  var peopleToPick = {
    //destination: [indices of peoples]
  };
  var listOf4 = [];
  // filter for location
  for(var i=0; i<peoples.length; i++){
    if (sameSpot(peoples[i], location)) {
      peopleToPick[peoples[i].destination] = peopleToPick[peoples[i].destination] || [];
      peopleToPick[peoples[i].destination].push(i);
    }
  }
  for(var i=4; i>0; i--){
    for(var j in peopleToPick){
      if (peopleToPick[j].length >= i){
        listOf4 = listOf4.concat(peopleToPick[j]);
      }
    }
  }
  return listOf4.slice(0,4);
};
