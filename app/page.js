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
    <main className="p-4 max-w-7xl mx-auto">
      <Options />
      {SearchRecipe.length !== 0 ? (
        <div className="flex items-center justify-normal gap-8 flex-wrap py-4 px-1">
          {SearchRecipe.map((item) => (
            <ReciepeCard key={item.id} {...item} />
          ))}
        </div>
      ) : AllReciepe.length !== 0 ? (
        <div>No results found.</div>
      ) : (
        <div className="h-[80vh] max-w-7xl mx-auto flex items-center justify-center">
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
