export function getIngredients(text: string) {
  let ingredients = text.trim().split(",");
  return ingredients;
}
