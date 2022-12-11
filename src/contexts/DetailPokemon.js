import React, { createContext, useContext, useState } from "react";

const DetailPokemonContext = createContext();

export const DetailPokemonProvider = ({ children }) => {
  const [pokemonsName, setPokemonName] = useState("")

  return (
    <DetailPokemonContext.Provider
      value={{
        pokemonsName,
        setPokemonName,
      }}
    >
      {children}
    </DetailPokemonContext.Provider>
  );
};

export const useDetailPokemon = () => {
  return useContext(DetailPokemonContext);
};