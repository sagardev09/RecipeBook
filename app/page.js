"use client"
import { useAppContext } from "@/context/GlobalContext";
import { useEffect } from "react";
import ReciepeCard from "./_components/ReciepeCard";
import { Vortex } from "react-loader-spinner";
import Options from "./_components/Options";

export default function Home() {
  const { fetchAllReceiepe, AllReciepe, SearchRecipe } = useAppContext();

  useEffect(() => {
    fetchAllReceiepe();
  }, []);

  return (
    <main className="p-4">
      <Options />
      {SearchRecipe.length !== 0 ? (
        <div className="flex items-center justify-normal gap-8">
          {SearchRecipe.map((item) => (
            <ReciepeCard key={item.id} {...item} />
          ))}
        </div>
      ) : AllReciepe.length !== 0 ? (
        <div>No results found.</div>
      ) : (
        <div className="h-screen w-screen flex items-center justify-center">
          <Vortex
            visible={true}
            height="80"
            width="80"
            ariaLabel="vortex-loading"
            wrapperStyle={{}}
            wrapperClass="vortex-wrapper"
            colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
          />
        </div>
      )}
    </main>
  );
}
