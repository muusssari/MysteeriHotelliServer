export function generateRandom5LengthGuid() {
  return (Math.random() + 1).toString(36).substring(7);
}