var Sudoku = function(data) 
{
  //   Private methods
  // -------------------------



  //   Public methods
  // -------------------------
  return {
    isValid: function() {
      if (Math.pow(data.length, 0.5) % 1 !== 0) {
        return false;
      }

      if (data.length === 1 && data[0][0] !== 1) {
        return false;
      }
      // rows
      for (var rowIndex=0; rowIndex<data.length; rowIndex++) {
        var digits = {};
        var count = 0;
        var row = data[rowIndex];

        if (data.length !== row.length) {
          return false;
        }

        for (var i=0; i<row.length; i++) {
          if (digits[row[i]] || !row[i]) {
            return false;
          }
          if (row[i] < 1 && row[i] > data.length) {
            return false
          }
          digits[row[i]] = true;
          count++;
        }
        if (count !== data.length) {
          return false;
        }
      }
      // columns
      for (var colIndex=0; colIndex<data.length; colIndex++) {
        var digits = {};
        var count = 0;
        for (var i=0; i<data.length; i++) {
          if (digits[data[i][colIndex]] || !data[i][colIndex]) {
            return false;
          }
          digits[data[i][colIndex]] = true;
          count++;
        }
        if (count !== data.length) {
          return false;
        }
      }
      // small squares
      var sqrt = Math.pow(data.length, 0.5);
      for (var i=0; i<data.length; i+=sqrt) {
        for (var j=0; j<data.length; j+=sqrt) {
          var digits = {};
          var count = 0;
          for (var k=0; k<sqrt; k++) {
            for (var l=0; l<sqrt; l++) {
              if (digits[data[i+k][j+l]] || !data[i+k][j+l]) {
                return false;
              }
              digits[data[i+k][j+l]] = true;
              count++;
            }
          }
          if (count !== data.length) {
            return false;
          }
        }
      }

      return true;
    }
  };
};
