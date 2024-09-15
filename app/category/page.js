"use client";
import { transformResponse } from "@/shared/utils";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function Category() {
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const params = useSearchParams();
  const q = params?.get("l");

  const loadResults = async (searchTerm) => {
    if (searchTerm === "" || !searchTerm) {
      return "";
    }
    const res = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchTerm.toLowerCase()}`
    );
    const json = await res.json();
    setResults(transformResponse(json?.drinks, 100));
  };

  const setPrev = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });

    setPage((prev) => (prev === 1 ? 1 : prev - 1));
  };

  const setNext = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });

    setPage((prev) =>
      prev === Math.floor(results.length / 10) ? prev : prev + 1
    );
  };

  useEffect(() => {
    loadResults(q);
  }, [q]);

  const start = (page - 1) * 10;
  const end = page * 10;
  const last = results.length < 10 ? 1 : Math.floor(results.length / 10);
  return (
    <main className="flex min-h-screen flex-col items-center lg:items-start lg:pl-24 justify-between w-full p-2">
      <div className="flex flex-col h-auto gap-4 lg:gap-8 mt-4 lg:items-center lg:justify-center">
        {results?.slice(start, end)?.map((drink, i) => {
          return (
            <Link
              key={`drink-${i}`}
              href={`/drink?id=${drink.id}`}
              className="rounded-lg w-full"
            >
              <div className="rounded-lg flex h-full items-center">
                <Image
                  className="rounded-tl-2xl rounded-tr-lg rounded-bl-lg rounded-br-2xl"
                  src={drink?.thumb}
                  height={160}
                  width={160}
                  alt={drink?.title}
                />
                <div className="flex flex-row items-start gap-2 w-full justify-center h-full pl-2">
                  <Image
                    src="/drink1.png"
                    height={32}
                    width={32}
                    alt={drink?.isAlcoholic ? "alcoholic" : "non-alcoholic"}
                  ></Image>
                  <p className="text-lg text-green-900 font-bold w-full">
                    {drink?.title}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      {results.length > 10 && (
        <div className="flex flex-row gap-2 self-center my-4">
          <button
            className={`${
              page === 1 ? "bg-gray-500" : "bg-blue-200"
            } p-4 text-3xl font-bold rounded-lg`}
            disabled={page === 1}
            onClick={setPrev}
          >
            &larr;
          </button>
          <button
            className={`${
              page === last ? "bg-gray-500" : "bg-blue-200"
            } p-4 text-3xl font-bold rounded-lg`}
            disabled={page === last}
            onClick={setNext}
          >
            &rarr;
          </button>
        </div>
      )}
    </main>
  );
}
