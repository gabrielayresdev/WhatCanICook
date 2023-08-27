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
      const data = await request(findByIngredients, ingredients, 10);
      console.log(data);
    }
  }
}

button?.addEventListener("click", handleClick);

export { ingredients };
