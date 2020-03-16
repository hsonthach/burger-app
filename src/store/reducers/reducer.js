import * as actionTypes from "../actions";
const initialState = {
  ingredients: { bacon: 0, cheese: 0, meat: 0, salad: 0 },
  totalPrice: 0
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
  let newState = { ...state };
  switch (action.type) {
    case actionTypes.SET_INGREDIENTS:
      ingredients = action.ingredients;
      newState.ingredients = ingredients;
      console.log(newState);
      return newState;
    case actionTypes.ADD_INGREDIENT:
      ingredients = { ...state.ingredients };
      for (const name in ingredients) {
        if (name === action.ingredientType) {
          ingredients[name]++;
          additionalPrice = INGREDIENT_PRICES[name];
        }
      }
      return {
        ...state,
        ingredients,
        totalPrice: state.totalPrice + additionalPrice
      };

    default:
      return state;
  }
};
export default reducer;
