import { readLinesOfFile } from "../util.ts";

type Scratchcard = {
  id: number;
  winningNumbers: Array<number>;
  myNumbers: Array<number>;
};

const parseScratchcard = (line: string): Scratchcard => {
  const id = parseInt(line.replace("Card", "").trimStart().replace(":", ""));
  const [winningNumbers, myNumbers] = line
    .split(":")[1]
    .split("|")
    .map((n) => n.trim())
    .map((n) =>
      n
        .split(" ")
        .map((num) => parseInt(num))
        .filter((num) => !isNaN(num))
    );
  return {
    id,
    myNumbers,
    winningNumbers,
  };
};

const numOfWinnigcards = (scracthCard: Scratchcard) =>
  scracthCard.myNumbers.filter((num) =>
    scracthCard.winningNumbers.find((win) => win === num)
  ).length;

export async function solve4P1(dataFilePath: string): Promise<number> {
  const lines = await readLinesOfFile(dataFilePath);
  const scratchCards = lines.map(parseScratchcard);
  return scratchCards
    .map(numOfWinnigcards)
    .map((matches) => Math.floor(Math.pow(2, matches) / 2))
    .reduce((a, b) => a + b);
}

export async function solve4P2(dataFilePath: string): Promise<number> {
  const lines = await readLinesOfFile(dataFilePath);
  const scratchCards = lines.map(parseScratchcard);
  const copiesSet = new Map<number, number>();

  scratchCards.forEach((s) => {
    const winningCards = numOfWinnigcards(s);
    copiesSet.set(s.id, (copiesSet.get(s.id) || 0) + 1);
    Array(winningCards)
      .fill(1)
      .map((x, y) => x + y + s.id)
      .forEach((c) =>
        copiesSet.set(c, (copiesSet.get(c) || 0) + copiesSet.get(s.id)!)
      );
  });
  return [...copiesSet.values()].reduce((a, b) => a + b);
}

solve4P1("./04/data").then(console.log);
solve4P2("./04/data").then(console.log);
