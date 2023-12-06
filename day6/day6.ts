
interface RaceTime {
    time: number;
    previousRecord: number;
    waysOfBeatingRace: number;
}

export function A(input: string): number {

    var races : RaceTime[] = [];

    var rows = input.split("\n");
    var time = rows[0]?.match(/\d+/g)?.map(x => parseInt(x)) || [];
    var distance = rows[1]?.match(/\d+/g)?.map(x => parseInt(x)) || [];

    if(time.length != distance.length ) {
        throw "time and distance must be same length";
    }

    for(let i = 0; i < time.length; i++) {
        let raceTime: RaceTime = {
            time: time[i],
            previousRecord: distance[i],
            waysOfBeatingRace: getWaysOfBeatingRace(time[i], distance[i]),
        };

        races.push(raceTime);
    }

    var longestDistance = 1;
    races.forEach(race => {
        console.log(longestDistance);
        longestDistance *= race.waysOfBeatingRace;
    })

    return longestDistance;
}

function getWaysOfBeatingRace(time: number, previousRecord: number) : number {
    
    interface TimeDistance {
        time: number;
        distance: number;
    }

    var timeDistance : TimeDistance[] = [];
    
    for(let i = 0; i < time; i++) {
        let timeDistanceItem : TimeDistance = {
            time: i,
            distance: (time-i)*i
        };

        timeDistance.push(timeDistanceItem);
    }

    var beatingTime = 0;
    timeDistance.forEach(timeDistanceItem => {
        if(timeDistanceItem.distance > previousRecord) {
            beatingTime++;
        }
    });

    return beatingTime;
}

export function B(input: string): number {
    return 0;
}