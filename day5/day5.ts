interface SeedPlantInfo {
    seedId : number;
    soilId : number;
    fertilizerId: number;
    waterId: number;
    lightId: number;
    temperatureId: number;
    humidityId: number;
    locationId: number;
}

interface MapConverter {
    destinationId : number;
    sourceStartId : number;
    mapRange : number;
}

interface MapInfo {
    mapName : string;
    mapConverters : MapConverter[];
}

function inputToSeedPlantInfo(input : string) : SeedPlantInfo[] {
    var rows = input.split("\n");
    var seeds = rows[0].split("seeds: ")[1].split(" ").map(x => parseInt(x));

    var seedPlantInfo : SeedPlantInfo[] = [];
    var maps : MapInfo[] = [];

    seeds.forEach((seed) => {
        var seedInfo : SeedPlantInfo = {
            seedId : seed,
            soilId : -1,
            fertilizerId : -1,
            waterId : -1,
            lightId : -1,
            temperatureId : -1,
            humidityId : -1,
            locationId : -1
        };

        seedPlantInfo.push(seedInfo);
    });

    rows.shift();

    maps.push(getMapInfo("seed-to-soil", input));
    maps.push(getMapInfo("soil-to-fertilizer", input));
    maps.push(getMapInfo("fertilizer-to-water", input));
    maps.push(getMapInfo("water-to-light", input));
    maps.push(getMapInfo("light-to-temperature", input));
    maps.push(getMapInfo("temperature-to-humidity", input));
    maps.push(getMapInfo("humidity-to-location", input));

    seedPlantInfo.forEach((seedInfo) => {
        seedInfo.soilId = mapInfoToSeed(seedInfo.seedId, maps[0]);
        seedInfo.fertilizerId = mapInfoToSeed(seedInfo.soilId, maps[1]);
        seedInfo.waterId = mapInfoToSeed(seedInfo.fertilizerId, maps[2]);
        seedInfo.lightId = mapInfoToSeed(seedInfo.waterId, maps[3]);
        seedInfo.temperatureId = mapInfoToSeed(seedInfo.lightId, maps[4]);
        seedInfo.humidityId = mapInfoToSeed(seedInfo.temperatureId, maps[5]);
        seedInfo.locationId = mapInfoToSeed(seedInfo.humidityId, maps[6]);
    });

    return seedPlantInfo;
}


export function A(input : string) : number {

    var seedPlantInfo = inputToSeedPlantInfo(input);

    var lowestLocation = seedPlantInfo[0].locationId;
    seedPlantInfo.forEach((seedInfo) => {
        if(seedInfo.locationId < lowestLocation) {
            lowestLocation = seedInfo.locationId;
        }
    });

    return lowestLocation;
}

function mapInfoToSeed(sourceId: number, convertMap: MapInfo) : number {
    
    var destinationId = sourceId;

    convertMap.mapConverters.forEach((converter) => {
        if(sourceId >= converter.sourceStartId && sourceId < converter.sourceStartId + converter.mapRange) {
            destinationId = converter.destinationId - converter.sourceStartId + sourceId;
        }
    });

    return destinationId;
}

function getMapInfo(mapName: string, input: string): MapInfo {
    var lines = input.split("\n");
    let startIndex = getIndexOfSubstring(lines, mapName, 0) + 1;
    let endIndex = getIndexOfSubstring(lines, "", startIndex);
  
    if (endIndex === -1) {
      endIndex = lines.length;
    }
  
    let mapConverters: MapConverter[] = [];
  
    for (var row = startIndex; row < endIndex; row++) {
      var line = lines[row];
  
      var mapConverter = line.split(" ").map(x => parseInt(x));
      var mapConverterInfo: MapConverter = {
        destinationId: mapConverter[0],
        sourceStartId: mapConverter[1],
        mapRange: mapConverter[2],
      };
      mapConverters.push(mapConverterInfo);
    }
  
    var mapInfo: MapInfo = {
      mapName: mapName,
      mapConverters: mapConverters,
    };
  
    return mapInfo;
  }

 

  function getIndexOfSubstring(input: string[], substring: string, startIndex : number) : number {
    for(var i = startIndex; i < input.length; i++) {

        if(substring == "") {
            if(input[i] == "\r\n" || input[i] == "" || input[i] == "\n" || input[i] == "\r" || input[i].length == 0){
                return i;
            }
        }
        else if(input[i].includes(substring)) {
            return i;
        }
    }

    return -1;
  }

export function B(input : string) : number {
    var seedPlantInfo = inputToSeedPlantInfo(input);

    var lowestLocation = seedPlantInfo[0].locationId;
    seedPlantInfo.forEach((seedInfo) => {
        if(seedInfo.locationId < lowestLocation) {
            lowestLocation = seedInfo.locationId;
        }
    });

    return lowestLocation;
}