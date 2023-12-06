import { assert } from "https://deno.land/std@0.208.0/assert/mod.ts";
import { solve6P1, solve6P2 } from "./index.ts";

Deno.test("Test 6.1", async () => {
  const res = await solve6P1("./06/data.test");
  assert(res === 288, `expected 288 but received ${res}`);
});
Deno.test("Test 6.2", async () => {
  const res = await solve6P2("./06/data.2.test");
  assert(res === 71503, `expected 71503 but received ${res}`);
});

// Deno.test("Test 4.2", async () => {
//   const res = await solve4P2("./04/data.test");
//   assert(res === 30, `expected 30 but received ${res}`);
// });
