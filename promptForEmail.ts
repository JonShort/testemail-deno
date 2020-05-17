let promptForEmail = async (): Promise<string> => {
  // Arbitrary 128 max size - could increase if required
  let resBuf = new Uint8Array(128);
  let Decoder = new TextDecoder();
  let Encoder = new TextEncoder();

  // Prompt user for input
  Deno.stdout.write(Encoder.encode("Enter the email to be aliased:\r\n"));

  try {
    await Deno.read(Deno.stdin.rid, resBuf);
  } catch (err) {
    console.log("Error occurred! Exiting...", err);
    Deno.exit();
  }

  // Decode input - strip newlines, null characters, and spaces
  let email = Decoder.decode(resBuf).replace(/\r?\n|\r|\0| /g, "");

  if (email.length === 0) {
    console.log("No email provided, exiting...");
    Deno.exit();
  }

  return email;
};

export default promptForEmail;
