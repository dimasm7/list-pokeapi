import { CardPokemon } from "@/components/molecules"
import { useGlobalContext } from "@/context/global";
import { useEffect, useState } from "react";

interface IPokemon{
  id:number,
  name:string,
  sprites:any
}

const Home = () => {
  const {allPokemonData}:any = useGlobalContext();
  
  return (
    <div className="container mx-auto px-4 pt-8">
      <div className="wrapper-card grid">
        {allPokemonData ? (
          allPokemonData.map((res:IPokemon, key:number) => (
            <CardPokemon key={res.id} type="link" image={res.sprites.other.home.front_default} name={res.name} />
          ))
          ):(
            <h1>Loading...</h1>   
          )
        }
      </div>
    </div>
  )
}
export default Home