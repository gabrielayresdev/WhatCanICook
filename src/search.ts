import Dom from "./helper/Dom";
import { ingredients } from "./menu";
import { findByIngredients, request } from "./request/api";

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

const button = document.getElementById("search");
const load = document.getElementById("load");
function initSearch() {
  async function handleClick({ target }: MouseEvent) {
    if (ingredients.length > 0) {
      const dom = new Dom(".recipes .list");
      dom.generateLoadingCards(10);
      if (target) {
        dom.disableBtn(target);
      }

      document.querySelector(".recipes")?.classList.add("active");
      document.querySelector(".no-recipe")?.classList.remove("active");
      const url = findByIngredients(ingredients, 10);
      const data = await request<Recipe[]>(url.href);
      if (data) {
        handleData(data);
      }
      dom.removeLoadingCards();
      if (target) {
        dom.enableBtn(target);
      }
    }
  }

  function handleData(data: Recipe[]) {
    const list = document.querySelector(".recipes .list");

    data.forEach((recipe) => {
      const elem = document.createElement("div");
      elem.classList.add("recipe");
      elem.innerHTML = `
        <div class="image-container">
            <img
            src=${recipe.image}
            alt="Image of ${recipe.title}"
            />
        </div>
        <div class="text-container">
            <h3 class="name">${recipe.title}</h3>
            <p class="used">${
              recipe.unusedIngredients.length > 0
                ? `Uses ${
                    ingredients.length - recipe.unusedIngredients.length
                  } ingredient${
                    ingredients.length - recipe.unusedIngredients.length > 1
                      ? "s"
                      : ""
                  }`
                : `Uses all ${ingredients.length} ingredients`
            }</p>
            <span class="needed">${
              recipe.missedIngredientCount > 0
                ? `You need ${recipe.missedIngredientCount} more ingredient${
                    recipe.missedIngredientCount > 1 ? "s" : ""
                  }`
                : ``
            }</span>
            <div class="like">
            <span>${recipe.likes}</span>
            <img
                src="assets/heart-regular.svg"
                class="heart"
                alt="Like recipe"
            />
            </div>
        </div>
        `;
      list?.appendChild(elem);
    });
  }

  async function loadMore({ target }: MouseEvent) {
    const url = findByIngredients(
      ingredients,
      10 + document.querySelectorAll(".recipe").length
    );

    const dom = new Dom(".recipes .list");
    dom.generateLoadingCards(10);
    if (target) {
      dom.disableBtn(target);
    }

    const data = await request<Recipe[]>(url.href);
    if (data) {
      handleData(data.slice(document.querySelectorAll(".recipe").length));
    }
    dom.removeLoadingCards();
    if (target) {
      dom.enableBtn(target);
    }
  }

  button?.addEventListener("click", handleClick);
  load?.addEventListener("click", loadMore);
}

export { initSearch };
