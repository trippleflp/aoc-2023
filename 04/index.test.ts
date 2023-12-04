import { assert } from "https://deno.land/std@0.208.0/assert/mod.ts";
import { solve4P1, solve4P2 } from "./index.ts";

Deno.test("Test 4.1", async () => {
  const res = await solve4P1("./04/data.test");
  assert(res === 13, `expected 13 but received ${res}`);
});

Deno.test("Test 4.2", async () => {
  const res = await solve4P2("./04/data.test");
  assert(res === 30, `expected 30 but received ${res}`);
});
