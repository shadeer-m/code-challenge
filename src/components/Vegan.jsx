import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Splide, SplideSlide } from '@splidejs/react-splide'; 
import "@splidejs/splide/dist/css/splide.min.css";
import { Link } from 'react-router-dom';

function Vegan() {

  const [vegan, setVegan] = useState([]);

  useEffect(() => {
      getVegan();
  }, []);

  const getVegan = async () => {

      const check = localStorage.getItem("vegan");
      //save to local storage, then check local storage if there is already data to pull, to avoid maxing out on request calls to API (limit of 150 per day)
      if(check){
          setVegan(JSON.parse(check));
      }else {
          const api = await fetch(
              `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=12&tags=vegan`);
          const data = await api.json();

          localStorage.setItem('vegan', JSON.stringify(data.recipes));
          setVegan(data.recipes);
      }

  };

return (
      <div>
          <Container>
              <h3>Fresh New Vegan Picks!</h3>
              <Splide options={{
                  perPage: 4,
                  arrows: false,
                  drag: "free",
                  gap: "2rem",
              }}>
              {vegan.map((recipe) => {
                  return (
                      <SplideSlide key={recipe.id}>
                          <Card>
                            <Link to={"/recipe/" + recipe.id}>
                              <p>{recipe.title}</p>
                              <img src={recipe.image} alt={recipe.title}></img>
                              <Gradient/>
                              </Link>
                          </Card>
                      </SplideSlide>
                  );
              })};
              </Splide>
          </Container>
      </div>
      );          
}

const Container = styled.div`
  margin: 4rem 0rem;
`;
const Card = styled.div`
  min-height: 15rem;
  border-radius: 2rem;
  overflow: hidden;
  position: relative;
  
  img {
      border-radius: 2rem;
      position: absolute;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
  }

  p {
      position: absolute;
      z-index: 10;
      left: 50%;
      bottom: 0%;
      transform: translate(-50%, 0%);
      color: white;
      width: 100%;
      text-align: center;
      font-weight: 600;
      font-size: 0.9rem;
      height: 30%;
      display: flex;
      justify-content: center;
      align-items: center;

  }
`;

const Gradient = styled.div`
  z-index: 3;
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.75));
`;
export default Vegan