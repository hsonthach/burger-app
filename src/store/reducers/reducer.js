import * as actionTypes from "../actions";
const initialState = {
  ingredients: { bacon: 0, cheese: 0, meat: 0, salad: 0 },
  totalPrice: 4
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};
const reducer = (state = initialState, action) => {
  let ingredients;
  let additionalPrice = 0;
  let decreasePrice = 0;
  let newState = { ...state };
  let funcs = action.funcs;
  let params;
  switch (action.type) {
    case actionTypes.SET_INGREDIENTS:
      ingredients = action.ingredients;
      newState.ingredients = ingredients;
      break;
    case actionTypes.ADD_INGREDIENT:
      ingredients = { ...state.ingredients };
      for (const name in ingredients) {
        if (name === action.ingredientType) {
          ingredients[name]++;
          additionalPrice = INGREDIENT_PRICES[name];
        }
      }
      newState = {
        ...state,
        ingredients,
        totalPrice: state.totalPrice + additionalPrice
      };
      break;
    case actionTypes.REMOVE_INGREDIENT:
      ingredients = { ...state.ingredients };
      for (const name in ingredients) {
        if (name === action.ingredientType) {
          ingredients[name]--;
          decreasePrice = INGREDIENT_PRICES[name];
        }
      }
      newState = {
        ...state,
        ingredients,
        totalPrice: state.totalPrice - decreasePrice
      };
      break;
    default:
      return state;
  }
  if (funcs)
    funcs.forEach(el => {
      params = el.params.map(param => {
        return newState[param];
      });
      el.method(...params);
    });
  return newState;
};
export default reducer;
