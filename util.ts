export const readLinesOfFile = async (filePath: string) =>
  await Deno.readTextFile(filePath).then((text) => text.split("\r\n"));
