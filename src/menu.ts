import Dom from "./helper/Dom";
import { getIngredients, removeEquals } from "./helper/handleText";
import { findByIngredients, request } from "./request/api";

const button = document.getElementById("addBtn");
let ingredients: string[] = [];
export function setIngredients(newArray: string[]) {
  ingredients = newArray;
  document.querySelector(".no-recipe")?.classList.add("active");
  document.querySelector(".recipes")?.classList.remove("active");
  const list = document.querySelector(".recipes .list");
  if (list instanceof HTMLElement) list.innerHTML = "";
}

async function handleClick(event: MouseEvent) {
  event.preventDefault();
  const input = document.querySelector<HTMLInputElement>("#input");
  if (input) {
    setIngredients(
      removeEquals([...ingredients, ...getIngredients(input.value)])
    );
    if (ingredients.length > 0) {
      const dom = new Dom(".list");
      dom.generateIngredientsElements(ingredients);
      input.value = "";
      input.focus();
    }
  }
}

function initMenu() {
  button?.addEventListener("click", handleClick);
}

export { ingredients, initMenu };
