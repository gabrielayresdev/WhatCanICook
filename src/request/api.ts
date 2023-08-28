const base = "https://api.spoonacular.com/recipes/";
const key = "99d1e5d154f14ce2ab43cf9a5007d320";

export function findByIngredients(ingredients: string[], amount: number) {
  const url = new URL(`${base}/findByIngredients`);
  url.searchParams.set("apiKey", key);
  url.searchParams.set("ingredients", ingredients.join(","));
  url.searchParams.set("number", "" + amount);
  return url;
}

export function findRecipes(name: string, amount: number) {
  return `${base}/complexSearch?apiKey=${key}&query=${name}&number=${amount}`;
}

export async function request<T>(url: string): Promise<T | undefined> {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}
