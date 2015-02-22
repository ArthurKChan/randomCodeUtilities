function solve(map, miner, exit) {
  var x = miner.x;
  var y = miner.y;
  if(x === exit.x && y === exit.y){
    return [];
  }
  map[x][y] = false;

  if(map[0].length > y+1 && map[x][y+1]){
    console.log("going down")
    var potentialPath = solve(map, {"x":x,"y":y+1}, exit);
    if (potentialPath) {
      map[x][y] = true;
      return ["down"].concat(potentialPath);
    }
  }
  if(y-1 >= 0 && map[x][y-1]){
    console.log("going right")
    var potentialPath = solve(map, {"x":x,"y":y-1}, exit);
    if (potentialPath) {
      map[x][y] = true;
      return ["up"].concat(potentialPath);
    }
  }
  if(map.length > x+1 && map[x+1][y]){
    console.log("going right")
    var potentialPath = solve(map, {"x":x+1,"y":y}, exit);
    if (potentialPath) {
      map[x][y] = true;
      return ["right"].concat(potentialPath);
    }
  }
  if(x-1 >= 0 && map[x-1][y]){
    console.log("going left")
    var potentialPath = solve(map, {"x":x-1,"y":y}, exit);
    if (potentialPath) {
      map[x][y] = true;
      return ["left"].concat(potentialPath);
    }
  }
  if (!(map[0].length > y+1 && map[x][y+1]) && !(y-1 >= 0 && map[x][y-1]) && !(map.length > x+1 && map[x+1][y]) && !(x-1 >= 0 && map[x-1][y])) {
    // dead end
    console.log("dead end")
    map[x][y] = true;
    return false;
  }
}