"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { transformResponse } from "@/shared/utils";
const liquors = [
  "Gin",
  "Vodka",
  "Whiskey",
  "Bourbon",
  "Wine",
  "Champagne",
  "Beer",
];

const letters = "abcdefghijklmnopqrstuvwxyz";
const cocktailDBURL = "https://www.thecocktaildb.com/api/json/v1/1";

const getData = async () => {
  const letter = letters[Math.floor(Math.random() * letters.length)];
  const url = `${cocktailDBURL}/search.php?f=${letter}`;
  const res = await fetch(url, { next: { revalidate: 0 } });
  const json = await res.json();
  const drinks = transformResponse(json?.drinks);
  return {
    drinks,
  };
};

export default function Home() {
  const [drinks, setDrinks] = useState([]);

  const loadDrinks = async () => {
    const { drinks } = await getData();
    setDrinks(drinks);
  };

  useEffect(() => {
    loadDrinks();
  }, []);
  return (
    <main className="flex flex-col p-2 w-full min-h-screen">
      <p className="font-bold">By Liquor</p>
      <div
        style={{
          scrollSnapAlign: "center",
          scrollSnapType: "x mandatory",
        }}
        className="flex overflow-x-auto py-4 px-1 w-full gap-4 my-2"
      >
        {liquors.map((liquor, i) => {
          return (
            <Link
              className="bg-pink-100 p-4 font-bold"
              href={`/category?l=${liquor}`}
              key={`liquor-${i}`}
            >
              {liquor}
            </Link>
          );
        })}
      </div>
      <div className="flex flex-wrap">
        {drinks?.map((drink, i) => {
          return (
            <Link
              key={`drink-${i}`}
              href={`/drink?id=${drink.id}`}
              className="rounded-tl-2xl rounded-tr-lg rounded-bl-lg rounded-br-2xl w-1/2 p-2"
            >
              <div className="relative rounded-lg flex flex-col items-center">
                <Image
                  className="rounded-tl-2xl rounded-tr-lg rounded-bl-lg rounded-br-2xl"
                  src={drink?.thumb}
                  height={256}
                  width={256}
                  alt={drink?.title}
                />
                <div className="absolute bottom-0 bg-black rounded-bl-lg rounded-br-2xl text-white opacity-80 text-center px-10 w-full lg:w-1/3 py-6">
                  <p className="text-xl">{drink?.title}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
