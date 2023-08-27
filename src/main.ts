import { getIngredients } from "./helper/handleText";
import { findByIngredients, request } from "./request/api";

export {};

const button = document.querySelector("button");
let ingredients: string[] = [];

async function handleClick(event: MouseEvent) {
  event.preventDefault();
  const input = document.querySelector<HTMLInputElement>("#adicionar");
  if (input) {
    ingredients = [...ingredients, ...getIngredients(input.value)];
    const data = await request(findByIngredients, ingredients, 10);
    console.log(data);
  }
}

button?.addEventListener("click", handleClick);
