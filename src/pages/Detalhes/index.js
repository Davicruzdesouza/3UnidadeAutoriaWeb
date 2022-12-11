import React, { useState, useEffect } from "react";
import { Card, Container } from "react-bootstrap";
import { useDetailPokemon } from "../../contexts/DetailPokemon";
import api from "../../service/api";

function Detalhes() {
  const { pokemonsName } = useDetailPokemon();
  const [pokemonData, setPokemonData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  console.log(pokemonsName);

  async function getDetailPokemon() {
    try {
      setIsLoading(true);
      await api.get(pokemonsName).then((response) => {
        //faz algo
        //console.log(response.data);
        const pokemon = response.data;
        console.log(response.data);

        setPokemonData(pokemon);
        setIsLoading(false);
      });
    } catch (error) {
      //caso que der errado
      console.log(error);
    }
  }

  useEffect(() => {
    getDetailPokemon();
  }, []);

  return (
    <Container className="container-detail container-custom">
      <Card style={{ width: "18rem" }}>
        <Card.Img src={pokemonData.sprites?.front_default} />
        <Card.Body>
          <Card.Title>Id: {pokemonData.id}</Card.Title>
          <Card.Title>Name: {pokemonData.name}</Card.Title>
          <Card.Title>Altura: {pokemonData.height}</Card.Title>
          <Card.Title>Peso: {pokemonData.weight}</Card.Title>
          <Card.Title>Comprimento: {pokemonData.base_experience}</Card.Title>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Detalhes;
