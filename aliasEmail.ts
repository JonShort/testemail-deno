let aliasEmail = (email: string): string => {
  // validate email
  let emailRegex = new RegExp(
    "^([A-Za-z0-9!#$%&'*+/=?^_`{|}~.-])+@([A-Za-z0-9-])+([.]([A-Za-z0-9-]+))+[A-Za-z]$",
  );

  if (!emailRegex.test(email)) {
    console.log(`Looks like ${email} is an invalid email! exiting...`);
    Deno.exit();
  }

  let [start, end] = email.split("@");

  let epochTime = new Date().getTime();

  return `${start}+${epochTime}@${end}`;
};

export default aliasEmail;
