import { readLinesOfFile } from "../util.ts";

export async function solve6P1(dataFilePath: string) {
  const [times, distances] = (await readLinesOfFile(dataFilePath)).map((l) =>
    l.split(":")[1].trim().split(" ").map((s) => parseInt(s.trim())).filter(
      (s) => !isNaN(s)
    )
  );
  const res: Array<number> = []
  for (let i = 0; i < times.length; i++) {
    const time = times[i]
    const distance = distances[i]
    
    for (let t = 1; t < time; t++) {
        const calcDist = t + (time-t-1)*t
        if(calcDist > distance) res[i] = (res[i]||0)+1;
    }
  }
  return res.reduce((a,b) => a*b)
//   console.log(time, distance);
}

export async function solve6P2(dataFilePath: string) {
    const [times, distances] = (await readLinesOfFile(dataFilePath)).map((l) =>
      l.split(":")[1].trim().split(" ").map((s) => parseInt(s.trim())).filter(
        (s) => !isNaN(s)
      )
    );
    const res: Array<number> = []
    for (let i = 0; i < times.length; i++) {
      const time = times[i]
      const distance = distances[i]
      
      for (let t = 0; t <= time; t++) {
          const calcDist = t + (time-t-1)*t
          if(calcDist > distance) res[i] = (res[i]||0)+1;
      }
    }
    return res.reduce((a,b) => a*b)
  //   console.log(time, distance);
  }
solve6P1("./06/data").then(console.log);
// edit testdata; eliminate spaces
solve6P2("./06/data.2").then(console.log);
