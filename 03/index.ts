type Point = {
    x:number,
    y:number,
    gearPos?: Point
}
const lines = await Deno.readTextFile("./03/data").then(text => text.split("\r\n"))

let res = 0;

const checkIfSpecial = (c: string) => c.match(/^[^a-zA-Z0-9.]/)
const checkIfNumber = (c: string) => c.match(/\d/)
const checkSurrounding = (p:Point) => {
    const res = []
    if(checkIfNumber(lines.at(p.y-1)?.at(p.x-1) || "")) res.push({x:p.x-1, y: p.y-1})
    if(checkIfNumber(lines.at(p.y-1)?.at(p.x) || "")) res.push({x:p.x, y: p.y-1})
    if(checkIfNumber(lines.at(p.y-1)?.at(p.x+1) || "")) res.push({x:p.x+1, y: p.y-1})

    if(checkIfNumber(lines.at(p.y)?.at(p.x-1) || "")) res.push({x:p.x-1, y: p.y})
    if(checkIfNumber(lines.at(p.y)?.at(p.x+1) || "")) res.push({x:p.x+1, y: p.y})
    
    if(checkIfNumber(lines.at(p.y+1)?.at(p.x-1) || "")) res.push({x:p.x-1, y: p.y+1})
    if(checkIfNumber(lines.at(p.y+1)?.at(p.x) || "")) res.push({x:p.x, y: p.y+1})
    if(checkIfNumber(lines.at(p.y+1)?.at(p.x+1) || "")) res.push({x:p.x+1, y: p.y+1})
    return {res, gearPos: p.gearPos}
}

const getNumberOfPos = (pos:Point) => {
    let startX = pos.x
    const line = lines[pos.y]
    
    while(true) {
        if(checkIfNumber(line.at(startX-1)|| "")) startX = startX-1
        else break
    }
    return {res: parseInt(line.slice(startX).split(".")[0]), gearPos: pos.gearPos}
}

const specialChars = lines.flatMap((line, i) => [...line].flatMap((c,j) =>checkIfSpecial(c) !== null?{j,c}:{j:-1}).filter(({j}) => j !== -1).flatMap(({j,c}) => ({x:j,y:i,gearPos: c === "*"?{x:j,y:i}:undefined})))

const r1 = specialChars.flatMap(checkSurrounding)
    .flatMap(r => r.res.filter((hit,_,arr) => !arr.find(rHit => hit.x -1 === rHit.x && hit.y === rHit.y))
    .map(getNumberOfPos).map(p => p.res)).reduce(((a,b) => a+b))

console.log(r1);

const r2 = specialChars.filter(c => c.gearPos !== undefined)
    .flatMap(checkSurrounding)
    .flatMap(r => r.res.filter((hit,_,arr) => !arr.find(rHit => hit.x -1 === rHit.x && hit.y === rHit.y))
    .map((h) => ({x:h.x,y:h.y,gearPos: r.gearPos}))
    .map(getNumberOfPos))
    .filter((c,_,arr) => arr.filter(a => a.gearPos?.x === c.gearPos?.x && a.gearPos?.y === c.gearPos?.y).length === 2)
    .reduce(((a,b,i,arr) => i%2===0?a+(b.res*arr[i+1].res):a),0)

console.log(r2);