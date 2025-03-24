import React from "react";
import styled from "styled-components/native";
import { NasaSlider } from "./components/NasaSlider";

const Home: React.FC = () => {
  return (
    <Container>
      <NasaSlider />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: #000000;
`;

export default Home;
