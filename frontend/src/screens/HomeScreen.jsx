import React from "react";
import Hero from "../components/Hero";
import Header from "../components/header";
import { Container } from "react-bootstrap";

const HomeScreen = () => {
  return (
    <>
      <Header />
      <Container>
        <Hero />
      </Container>
    </>
  );
};

export default HomeScreen;
