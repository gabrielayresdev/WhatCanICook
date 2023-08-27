export function getIngredients(text: string) {
  if (text) {
    let ingredients = text
      .toLocaleLowerCase()
      .trim()
      .split(",")
      .map((item) => item.trim());
    return ingredients;
  } else return [];
}

export function removeEquals(arr: string[]) {
  const result = arr.filter((item, index) => {
    return arr.indexOf(item) === index;
  });
  return result;
}
