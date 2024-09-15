"use client";
import { transformResponse } from "@/shared/utils";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function Search() {
  const [results, setResults] = useState([]);
  const [status, setStatus] = useState("READY");
  const params = useSearchParams();
  const q = params?.get("q");

  const loadResults = async (searchTerm) => {
    if (searchTerm === "" || !searchTerm) {
      return "";
    }
    setStatus("LOADING");
    const res = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`
    );
    const json = await res.json();
    setResults(transformResponse(json?.drinks, 8));
    setStatus("DONE");
  };

  useEffect(() => {
    loadResults(q);
  }, [q]);

  if (results.length === 0) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between w-full p-2">
        {status === "LOADING"
          ? "Finding Drinks"
          : "No results found. Please try another query"}
      </main>
    );
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between w-full p-2">
      <div className="flex flex-col lg:flex-row lg:flex-wrap gap-4 lg:gap-8 mt-4 lg:items-baseline lg:justify-center">
        {results?.map((drink, i) => {
          return (
            <Link
              key={`drink-${i}`}
              href={`/drink?id=${drink.id}`}
              className="rounded-lg w-full lg:w-1/3"
            >
              <div className="relative rounded-lg flex lg:w-1/2">
                <Image
                  className="rounded-tl-2xl rounded-tr-lg rounded-bl-lg rounded-br-2xl"
                  src={drink?.thumb}
                  height={160}
                  width={160}
                  alt={drink?.title}
                />
                <div className="flex flex-col items-center w-2/3 gap-2 pl-2 pt-2">
                  <div className="flex flex-row items-start gap-2 w-full">
                    <Image
                      src={
                        drink?.isAlcoholic
                          ? "/drink1.png"
                          : "/non-alcoholic.png"
                      }
                      height={32}
                      width={32}
                      alt={drink?.isAlcoholic ? "alcoholic" : "non-alcoholic"}
                    ></Image>
                    <p className="text-lg text-green-900 font-bold w-full">
                      {drink?.title}
                    </p>
                  </div>
                  <div className="flex flex-row items-center gap-2 w-full mt-2">
                    <Image src="/shaker.png" height={32} width={32} alt="" />
                    <p className="text-sm text-green-600 w-full">
                      {drink?.ingredients?.slice(0, 3).join(",")}
                    </p>
                  </div>
                  <div className="flex flex-row bg-green-200 p-2 gap-2 font-bold items-center w-full">
                    <p>{drink?.isAlcoholic ? "Alcoholic" : "Non-Alcoholic"}</p>
                    <p>{drink?.category}</p>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
