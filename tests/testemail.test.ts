import {
  assert,
  assertEquals,
  assertThrowsAsync,
} from "https://deno.land/std/testing/asserts.ts";

// clear or create test cache
let clearCache = async () =>
  await Deno.writeFile("tests/.cache", new TextEncoder().encode(""));

Deno.test("main - should exit with error if executed with invalid email as arg", async () => {
  await clearCache();

  let outbuf = await Deno.open("tests/.cache", { write: true });

  let p = Deno.run({
    cmd: ["deno", "run", "./testemail.ts", "jon"],
    stdout: outbuf.rid,
    stderr: outbuf.rid,
  });

  let status = await p.status();

  assertEquals(status?.success, false);

  Deno.close(p.rid);
  Deno.close(outbuf.rid);
});

Deno.test("main - should execute successfully with valid email as arg", async () => {
  await clearCache();

  let outbuf = await Deno.open("tests/.cache", { write: true });

  let p = Deno.run({
    cmd: ["deno", "run", "./testemail.ts", "jon@example.com"],
    stdout: outbuf.rid,
  });

  let status = await p.status();

  assertEquals(status?.success, true);

  Deno.close(p.rid);
  Deno.close(outbuf.rid);
});

Deno.test("main - should exit with error if executed with invalid email from stdin prompt", async () => {
  await clearCache();

  let inbuf = await Deno.open("tests/.invalid_email", { read: true });
  let outbuf = await Deno.open("tests/.cache", { write: true });

  let p = Deno.run({
    cmd: ["deno", "run", "./testemail.ts"],
    stderr: outbuf.rid,
    stdin: inbuf.rid,
    stdout: outbuf.rid,
  });

  let status = await p.status();

  console.log(status);

  assertEquals(status?.success, false);

  Deno.close(p.rid);
  Deno.close(inbuf.rid);
  Deno.close(outbuf.rid);
});

Deno.test("main - should execute successfully with valid email from stdin prompt", async () => {
  await clearCache();

  let inbuf = await Deno.open("tests/.valid_email", { read: true });
  let outbuf = await Deno.open("tests/.cache", { write: true });

  let p = Deno.run({
    cmd: ["deno", "run", "./testemail.ts"],
    stdin: inbuf.rid,
    stdout: outbuf.rid,
  });

  let status = await p.status();

  assert(status?.success);

  Deno.close(p.rid);
  Deno.close(inbuf.rid);
  Deno.close(outbuf.rid);
});

Deno.test("main - should write aliased email to stdout (arg)", async () => {
  await clearCache();

  let outbuf = await Deno.open("tests/.cache", { read: true, write: true });

  let p = Deno.run({
    cmd: ["deno", "run", "./testemail.ts", "jon@example.com"],
    stdout: outbuf.rid,
  });

  await p.status();
  p.close();

  let written = await Deno.readTextFile("tests/.cache");

  assert(/jon\+\d+@example.com/.test(written));

  Deno.close(outbuf.rid);
});

Deno.test("main - should write aliased email to stdout (prompt stdin)", async () => {
  await clearCache();

  let inbuf = await Deno.open("tests/.valid_email", { read: true });
  let outbuf = await Deno.open("tests/.cache", { read: true, write: true });

  let p = Deno.run({
    cmd: ["deno", "run", "./testemail.ts"],
    stdin: inbuf.rid,
    stdout: outbuf.rid,
  });

  await p.status();
  p.close();

  let written = await Deno.readTextFile("tests/.cache");

  assert(/valid\+\d+@example.com/.test(written));

  Deno.close(inbuf.rid);
  Deno.close(outbuf.rid);
});
