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
      var building = vehicles[i].peoples[0].destination;
      for(var j=0; j<buildings.length; j++){
        if (building === buildings[j].name) {
          building = buildings[j];
        }
      }
      vehicles[i].moveTo(building);
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
