"use client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

const transformDrinkResponse = (response) => {
  if (!response) {
    return {};
  }
  const ingredients = [
    response.strIngredient1,
    response.strIngredient2,
    response.strIngredient3,
    response.strIngredient4,
    response.strIngredient5,
    response.strIngredient6,
    response.strIngredient7,
    response.strIngredient8,
    response.strIngredient9,
    response.strIngredient10,
    response.strIngredient11,
    response.strIngredient12,
    response.strIngredient13,
    response.strIngredient14,
    response.strIngredient15,
  ].filter((ing) => ing !== null);
  const quantities = [
    response.strMeasure1,
    response.strMeasure2,
    response.strMeasure3,
    response.strMeasure4,
    response.strMeasure5,
    response.strMeasure6,
    response.strMeasure7,
    response.strMeasure8,
    response.strMeasure9,
    response.strMeasure10,
    response.strMeasure11,
    response.strMeasure12,
    response.strMeasure13,
    response.strMeasure14,
    response.strMeasure15,
  ].filter((ing) => ing !== null);
  console.log(ingredients, quantities);
  return {
    title: response?.strDrink,
    image: response?.strDrinkThumb,
    ingredients: ingredients.map((ing, index) => {
      return { name: ing, quantity: quantities[index] };
    }),
    method: response?.strInstructions,
    glass: response?.strGlass,
  };
};

export default function Drink() {
  const params = useSearchParams();
  const id = params?.get("id");
  const [status, setStatus] = useState("READY");
  const [drink, setDrink] = useState({});

  const loadDrink = async (drinkId) => {
    setStatus("LOADING");
    const res = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`
    );
    const json = await res.json();
    setDrink(transformDrinkResponse(json?.drinks?.[0]));
    setStatus("DONE");
  };

  useEffect(() => {
    loadDrink(id);
  }, [id]);

  if (Object.values(drink).length === 0) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-2">
        {status === "LOADING"
          ? "Loading..."
          : "Drink details not found. Please try another drink"}
      </main>
    );
  }

  return (
    <main className="flex flex-col min-h-screen p-2 gap-2 w-full">
      <div className="w-full relative p-2 flex flex-col">
        <div
          className="w-full lg:w-2/3 lg:self-center rounded-tl-2xl rounded-tr-lg rounded-bl-lg rounded-br-2xl"
          style={{
            height: "256px",
            backgroundImage: `url(${drink?.image})`,
            backgroundSize: "cover",
          }}
        ></div>
        <h2 className="absolute bottom-0 mb-4 lg:self-center lg:w-1/3 text-center text-white text-2xl p-2 opacity-80 font-bold bg-green-900">
          {drink?.title}
        </h2>
      </div>

      <div className="flex flex-col gap-2 p-2 mt-4">
        <p className="text-2xl font-bold text-green-900">Glass</p>
        <p className="text-lg">{drink?.glass}</p>
      </div>
      <hr className="border-green-900 w-full" />

      <div className="flex flex-col gap-2 p-2 mt-4">
        <p className="text-2xl font-bold text-green-900">Ingredients</p>
        {drink?.ingredients?.map((ingredient, i) => {
          return (
            <div
              key={`ingredient-${i}`}
              className="flex flex-row gap-4 items-center justify-between w-full text-lg"
            >
              <p className="font-bold">{ingredient.name}</p>
              <p>{ingredient.quantity}</p>
            </div>
          );
        })}
      </div>
      <hr className="border-green-900 w-full" />
      <div className="flex flex-col gap-2 p-2 mt-4">
        <p className="text-2xl font-bold text-green-900">Method</p>
        <p className="text-lg">{drink?.method}</p>
      </div>
    </main>
  );
}
