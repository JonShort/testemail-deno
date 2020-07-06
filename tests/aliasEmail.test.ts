import { assertThrows, assert } from "https://deno.land/std/testing/asserts.ts";

import aliasEmail from "../src/aliasEmail.ts";

Deno.test("aliasEmail - should throw if invalid email provided", () => {
  assertThrows(() => aliasEmail("invalid"));
});

Deno.test("aliasEmail - should alias provided email with epoch time", () => {
  const aliased = aliasEmail("name@example.com");

  assert(/name\+\d+@example.com/.test(aliased));
});
