export function emailValidator(email: String) {
  const mailRegex = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
  return mailRegex.test(email);
}
