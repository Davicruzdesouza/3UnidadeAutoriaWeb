import React from "react";
import Card from "react-bootstrap/Card";
import api from "../../service/api";
import { useState, useEffect } from "react";

import { Button, Container, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useDetailPokemon } from "../../contexts/DetailPokemon";

import "./styles.css";

function Home() {
  const navigate = useNavigate();
  const [isLoading, setIsLoadind] = useState(false);
  const [pokemons, setPokemons] = useState([]);
  const [nextPage, setNextPage] = useState("");
  const [previous, setPrevious] = useState("");

  const { setPokemonName } = useDetailPokemon();

  async function getPokemons() {
    try {
      setIsLoadind(true);
      const response = await api.get();

      //faz algo
      //console.log(response.data);
      const pokemon = response.data.results;

      setPokemons(pokemon);
      setNextPage(response.data.next);
      setPrevious(response.data.previous);
      setIsLoadind(false);
    } catch (error) {
      //caso que der errado
      console.log(error);
    }
  }

  async function handleNextPage() {
    try {
      setIsLoadind(true);

      const response = await api.get(
        nextPage.replace("https://pokeapi.co/api/v2/pokemon/", "")
      );
      const pokemon = response.data.results;

      setPokemons(pokemon);
      setNextPage(response.data.next);
      if (response.data.previous === null) {
        setPrevious("");
      } else {
        setPrevious(response.data.previous);
      }
      setIsLoadind(false);
    } catch (error) {
      console.log(error);
    }
  }

  async function handlePreviousPage() {
    try {
      setIsLoadind(true);

      const response = await api.get(
        previous.replace("https://pokeapi.co/api/v2/pokemon/", "")
      );
      const pokemon = response.data.results;

      setPokemons(pokemon);
      setNextPage(response.data.next);
      if (response.data.previous === null) {
        setPrevious("");
      } else {
        setPrevious(response.data.previous);
      }
      setIsLoadind(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getPokemons();
  }, []);

  return (
    <Container className="container-custom">
      <Row>
        <Col lg={2}>
          <Button onClick={handlePreviousPage}>Página anterior</Button>
        </Col>
        <Col>
          <Button onClick={handleNextPage}>Próxima página</Button>
        </Col>
      </Row>
      <Row lg={4} md={3}>
        {pokemons.map((pokemon) => (
          <Col>
            <Card className="card-custom">
              <Card.Body>
                <Card.Title>{pokemon.name}</Card.Title>
                <Card.Text>
                  Acesse os detalhes do pokemon {pokemon.name}
                </Card.Text>
                <Button
                  onClick={() => {
                    setPokemonName(pokemon.name);
                    navigate("/detalhes");
                  }}
                >
                  Detalhes
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Home;
