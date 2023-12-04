type Bag = {
    id: number,
    red: number,
    blue: number,
    green: number,
}

enum Color {
    RED = "red",
    BLUE = "blue",
    GREEN = "green"
}

const lines = await Deno.readTextFile("./02/data").then(text => text.split("\r\n"))
const lineToBag = (line :string): Bag => {
    const bagItem: Bag = {
      id: 0,
      red: 0,
      blue: 0,
      green: 0
    }
    bagItem.id = parseInt(line.split(":")[0].replaceAll("Game ", ""))
    const parts = line.split(":")[1].split(",").flatMap(str => str.split(";")).map(part => part.trimStart().split(" ")).map(([p0,p1]) => ({num: parseInt(p0), color: p1 as Color}))
    parts.forEach(({color,num}) => {
        switch (color) {
            case Color.BLUE:
                if (num > bagItem.blue) bagItem.blue = num
                break;
            case Color.GREEN:
                if(num> bagItem.green) bagItem.green = num
                break;
            case Color.RED:
                if(num> bagItem.red) bagItem.red = num
                break;
        }
    })
    return bagItem
}

const res = lines.map(lineToBag)
    .filter(b => b.red <= 12 && b.green <= 13 && b.blue <= 14)
    .reduce((sum, bag) => sum + bag.id, 0)

console.log(res);

const res2 = lines.map(lineToBag)
    .map(bag => bag.blue*bag.green*bag.red)
    .reduce((sum, bag) => sum + bag)

console.log(res2);