function turn(vehicles,peoples,buildings){
  for(var i=0; i<vehicles.length; i++){
    if (vehicles[i].peoples.length === 0) {
      vehicles[i].moveTo(buildings[i]);
      if (sameSpot(vehicles[i],buildings[i])){
        // pick up everyone at current building
        for(var j=0; j<peoples.length; j++){
          if (sameSpot(vehicles[i], peoples[j]) && vehicles[i].peoples.length < 4) {
            vehicles[i].pick(peoples[j]);
          }
        }
      }
    }
    if (vehicles[i].peoples.length > 0) {

      // pick a location based off ppl
      // currentDestination = loc
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
      // go to location
      vehicles[i].moveTo(currentDestination);

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

function getDist(p1, p2){
  return Math.pow((Math.pow(p1.x-p2.x, 2) + Math.pow(p1.y-p2.y, 2)), 0.5)
};
