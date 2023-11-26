import { API_HOST } from "@/config";
import { createContext, useContext, ReactNode, useReducer, useEffect, useState } from "react"

const GlobalContext = createContext({});
const LOADING = 'LOADING'
const GET_POKEMON = 'GET_POKEMON'
const GET_ALL_POKEMON = 'GET_ALL_POKEMON'
const GET_SEARCH = 'GET_SEARCH'
const GET_POKEMON_DATABASE = 'GET_POKEMON_DATABASE'
const NEXT = 'NEXT'

const reducer = (state:{}, action:any) => {
    switch(action.type){
        case LOADING:
            return {...state, loading:true}
        case GET_ALL_POKEMON:
            return {...state, allPokemon:action.payload, loading:false}
    }
    return state;
}

export const GlobalProvider = ({children}: {children:ReactNode}) => {
    const initialState = {
        allPokemon: [],
        pokemon:{},
        pokemonDataBase:{},
        search: [],
        next:"",
        loading: false,
    }

    const [state, dispatch] = useReducer(reducer, initialState)
    const [allPokemonData, setAllPokemonData] = useState<{}[]>([]);

    const allPokemon = async () => {
        dispatch({type: LOADING})
        const res = await fetch(`${API_HOST.url}?limit=20`)
        const data = await res.json();
        dispatch({type: GET_ALL_POKEMON, payload: data.results})

        //fetch character data
        const allPokemonData = [];
        for (const pokemon of data.results){
            const res = await fetch(pokemon.url)
            const detailPokemon = await res.json();
            allPokemonData.push(detailPokemon);
        }

        setAllPokemonData(allPokemonData);
    }

    useEffect(() => {
        allPokemon()
    }, [])
    return (
        <GlobalContext.Provider value={{...state, allPokemonData}}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => {
  return useContext(GlobalContext);
}
