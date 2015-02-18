// function arcValidator
// input: start
//        end
//        arcs (array of {start:char, end:char})
// output:
//          true -> there is a path from start to end (or start == end)
//          false -> there is no path from start to end

var sampleArcs = {
  "1": [{s:"a",e:"b"}],
  "2": [{s:"a",e:"b"},{s:"b",e:"c"}],
  "3": [{s:"a",e:"b"},{s:"b",e:"c"},{s:"c",e:"a"}],
  "4": [{s:"a",e:"b"},{s:"b",e:"c"},{s:"c",e:"a"},{s:"c",e:"d"},{s:"d",e:"e"}],
  "5": [{s:"a",e:"b"},{s:"b",e:"c"},{s:"c",e:"a"},{s:"c",e:"d"},{s:"d",e:"e"},{s:"e",e:"f"},{s:"f",e:"g"},{s:"g",e:"h"},{s:"h",e:"d"},{s:"h",e:"i"}]
};

