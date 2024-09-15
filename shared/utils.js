export const transformResponse = (json, limit = 10) => {
  if (!json) {
    return [];
  }
  return json?.slice(0, limit)?.map((result) => {
    return {
      id: result.idDrink,
      thumb: result.strDrinkThumb,
      title: result.strDrink,
      ingredients: [
        result.strIngredient1,
        result.strIngredient2,
        result.strIngredient3,
        result.strIngredient4,
        result.strIngredient5,
        result.strIngredient6,
        result.strIngredient7,
        result.strIngredient8,
        result.strIngredient9,
        result.strIngredient10,
        result.strIngredient11,
        result.strIngredient12,
        result.strIngredient13,
        result.strIngredient14,
        result.strIngredient15,
      ].filter((ing) => ing !== null),
      category: result.strCategory,
      isAlcoholic: result.strAlcoholic === "Alcoholic",
    };
  });
};
