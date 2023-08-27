export class Dom {
  private element: HTMLElement | null;

  constructor(selector: string) {
    this.element = document.querySelector(selector);
  }

  generateIngredientsElements(ingredients: string[]) {
    if (this.element instanceof HTMLElement) {
      this.element.innerHTML = "";

      ingredients.forEach((ingredient) => {
        if (this.element) {
          this.element.innerHTML += `<div class="list">
                <div class="ingredient">${ingredient}</div>
              </div>`;
        }
      });
    }
  }
}
