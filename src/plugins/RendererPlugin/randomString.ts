export default function randomString(length: number) {
  var text = '';
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  text = possible.charAt(Math.floor(Math.random() * 52));
  for (var i = 0; i < length - 1; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}
