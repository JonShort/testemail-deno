import { aliasEmail } from "./aliasEmail.ts";
import { promptForEmail } from "./promptForEmail.ts";

export let main = async () => {
  // grab email from args, prompt user if not provided
  let email = Deno.args[0] ?? await promptForEmail();

  let aliased = aliasEmail(email);

  let Encoder = new TextEncoder();
  await Deno.stdout.write(Encoder.encode(`${aliased}\r\n`));
};

await main();
