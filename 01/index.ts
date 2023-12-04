

// const lines = await Deno.readTextFile("./01/data.2.test").then(text => text.split("\r\n"))
const lines = await Deno.readTextFile("./01/data.2").then(text => text.split("\r\n"))

function findCalibrationDigits(line: string) {
    console.log(line);
        
    const digitLine = line.replaceAll(/\D/g, "")
    
    const res = parseInt(digitLine.charAt(0) + digitLine.charAt(digitLine.length-1))

    return res
    
    
}

const digitsArr = [
    "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"
]

function findCalibrationDigitsTwo(line: string){
    let digitLine = ""


    for (let i = 0; i < line.length; i++) {
        if(line.charAt(i).match(/\d/g)) digitLine =digitLine.concat(line.charAt(i))
        const foundDigit = digitsArr.findIndex(digit => line.slice(i).startsWith(digit))+1
        if(foundDigit !== 0) digitLine = digitLine.concat(foundDigit.toString()) 
        console.log(digitLine);
        
    }
    return findCalibrationDigits(digitLine)
}
// const res = lines.reduce((r,l) => r+findCalibrationDigits(l),0)
// console.log(res);

const res2 = lines.reduce((r,l) => r+findCalibrationDigitsTwo(l),0)
console.log(res2);
