import Dom from "./helper/Dom";
import { getIngredients, removeEquals } from "./helper/handleText";
import { findByIngredients, request } from "./request/api";

const button = document.getElementById("addBtn");
let ingredients: string[] = [];
export function setIngredients(newArray: string[]) {
  ingredients = newArray;
}

async function handleClick(event: MouseEvent) {
  event.preventDefault();
  const input = document.querySelector<HTMLInputElement>("#input");
  if (input) {
    ingredients = removeEquals([
      ...ingredients,
      ...getIngredients(input.value),
    ]);
    if (ingredients.length > 0) {
      const dom = new Dom(".list");
      dom.generateIngredientsElements(ingredients);
      input.value = "";
      input.focus();
      const data = await request<Recipe>(findByIngredients, ingredients, 10);
      console.log(data);
    }
  }
}
button?.addEventListener("click", handleClick);

interface Ingredient {
  aisle: string;
  amount: number;
  id: number;
  image: string;
  meta: any[];
  name: string;
  original: string;
  originalName: string;
  unit: string;
  unitLong: string;
  unitShort: string;
}
interface Recipe {
  id: number;
  image: string;
  imageType: string;
  likes: number;
  missedIngredientCount: number;
  missedIngredients: Ingredient[];
  title: string;
  unusedIngredients: Ingredient[];
  usedIngredientCount: number;
  usedIngredients: Ingredient[];
}

export { ingredients };
