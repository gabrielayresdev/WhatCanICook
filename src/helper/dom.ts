import { ingredients, setIngredients } from "../menu.js";
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

  generateLoadingCards(amount: number) {
    const card = document.createElement("div");
    card.classList.add("loading");
    card.innerHTML = `
            <div class="image-loading"></div>
            <div class="text-loading">
              <div class="title-loading"></div>
              <div class="p-loading"></div>
            </div>
    `;
    for (let i = 0; i < amount; i++) {
      this.element?.appendChild(card.cloneNode(true));
    }
  }

  removeLoadingCards() {
    const cards = document.querySelectorAll(".loading");
    cards.forEach((card) => {
      card.remove();
    });
  }

  disableBtn(btn: EventTarget) {
    if (btn instanceof HTMLButtonElement) {
      btn.disabled = true;
    }
  }
  enableBtn(btn: EventTarget) {
    if (btn instanceof HTMLButtonElement) {
      btn.disabled = false;
    }
  }
  updateCounter() {
    const amount = document.querySelector(".amount");
    const qtd = document.querySelectorAll(".recipe").length;
    if (amount instanceof HTMLElement) {
      amount.innerHTML = `${
        qtd > 0 ? `${qtd} recipe${qtd > 1 ? "s" : ""} found` : "No recipe found"
      }`;
    }
  }
}
