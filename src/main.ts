import { Dom } from "./helper/Dom";
import { getIngredients } from "./helper/handleText";
import { findByIngredients, request } from "./request/api";

export {};

const button = document.getElementById("addBtn");
let ingredients: string[] = [];

async function handleClick(event: MouseEvent) {
  event.preventDefault();
  const input = document.querySelector<HTMLInputElement>("#input");
  if (input) {
    ingredients = [...ingredients, ...getIngredients(input.value)];
    const dom = new Dom(".list");
    dom.generateIngredientsElements(ingredients);
    input.value = "";
    input.focus();
    const data = await request(findByIngredients, ingredients, 10);
    console.log(data);
  }
}

button?.addEventListener("click", handleClick);
