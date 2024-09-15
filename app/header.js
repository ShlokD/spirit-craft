"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
export default function Header() {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const handleSearch = (ev) => {
    ev.preventDefault();
    if (searchTerm === "") return;
    router.push(`/search?q=${searchTerm}`);
    setSearchTerm("");
  };

  return (
    <header className="bg-green-200 p-4">
      <div className="flex gap-8 items-center">
        <div className="w-2/12 flex flex-col gap-2">
          <Link href="/">
            <Image src="/favicon.png" height="48" width="48" alt="" />
            <h1 className="text-2xl font-bold">Spirit Craft</h1>
          </Link>
        </div>
        <form className="w-10/12 flex flex-col" onSubmit={handleSearch}>
          <label className="font-bold" htmlFor="drink-search">
            Search for drinks or ingredients
          </label>
          <input
            id="drink-search"
            autoComplete="off"
            type="search"
            className="p-2 my-2 rounded-lg"
            placeholder="Margherita/Vodka/Mango"
            value={searchTerm}
            onChange={(ev) => setSearchTerm(ev.target.value)}
          />
        </form>
      </div>
    </header>
  );
}
