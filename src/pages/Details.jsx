import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Splide, SplideSlide } from '@splidejs/react-splide'; 
import "@splidejs/splide/dist/css/splide.min.css";
import { Link } from 'react-router-dom';


function Details() {

    const [searchedRecipes, setSearchedRecipes] = useState([]);
    let params = useParams();

    //get recipes using search params
    const getDetails = async (name) => {
    const data = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${name}&number=100`
    );
    const recipes = await data.json();
    setSearchedRecipes(recipes.results);

  };

  useEffect(() => {
    getDetails(params.search);
  }, [params.search]);

    return (
    <Container>
        <Splide options={{
            perPage: 5,
            gap: "0.5rem",
        }}>
        {searchedRecipes.map((item) => {
            return (
               <SplideSlide key={item.id}>
                <Card >
                    <Link to={"/recipe/" + item.id}>
                        <p>{item.title}</p>
                        <img src={item.image} alt="" />
                    </Link>
                </Card>
                </SplideSlide>  
            )
        })}
        </Splide>
    </Container>
  )
}


const Container = styled.div`
    margin: 5rem 0rem;
`;
const Card = styled.div`
    min-height: 23rem; 
    border-radius: 3rem;
    overflow: hidden;
    position: relative;
    
    img {
        border-radius: 2rem 2rem 2rem 2rem;
        position: absolute;
        left: 0;
        object-fit: cover;
    }

    p {
        position: absolute;
        z-index: 10;
        left: 50%;
        bottom: 0%;
        transform: translate(-50%, 0%);
        color: #000000;
        width: 100%;
        text-align: center;
        font-weight: 600;
        font-size: 1rem;
        height: 40%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;



export default Details