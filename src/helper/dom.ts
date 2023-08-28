import { ingredients, setIngredients } from "../menu";
export default class Dom {
  private element: HTMLElement | null;

  constructor(selector: string) {
    this.element = document.querySelector(selector);
  }

  generateIngredientsElements(ingredients: string[]) {
    if (this.element instanceof HTMLElement) {
      this.element.innerHTML = "";

      ingredients.forEach((ingredient) => {
        if (this.element) {
          const div = document.createElement("div");
          div.classList.add("ingredient");
          div.innerHTML = ingredient;
          div.addEventListener("click", this.removeIngredients);
          this.element.appendChild(div);
        }
      });
    }
  }

  removeIngredients = (event: MouseEvent) => {
    // Using an arrow function
    let element: HTMLElement;
    if (event.target instanceof HTMLElement) element = event.target;
    const aux = ingredients.filter(
      (ingredient) =>
        element?.innerText.toLowerCase() !== ingredient.toLowerCase()
    );
    setIngredients(aux);
    this.generateIngredientsElements(ingredients);
  };
}
