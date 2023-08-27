const base = "https://api.spoonacular.com/recipes/";
const key = "99d1e5d154f14ce2ab43cf9a5007d320";

export function findByIngredients(ingredients: string, amount: number) {
  return `${base}/findByIngredients?apiKey=${key}&ingredients=${ingredients}&number=${amount}`;
}

export function findRecipes(name: string, amount: number) {
  return `${base}/complexSearch?apiKey=${key}&query=${name}&number=${amount}`;
}

export async function request<T>(
  callback: (...args: any[]) => string,
  ...args: any[]
): Promise<T | undefined> {
  const url = callback(...args);
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}
