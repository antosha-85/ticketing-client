import styled from "@emotion/styled";
import Confetti from "react-confetti";
import { useState, useEffect } from "react";
import React from 'react';

import Layout from "components/Layout.jsx";
import Row from "../components/prebuilt/Row";

const Container = styled.div`
  width: 575px;
  margin: 30px auto 0 auto;
  text-align: center;
  color: red;
`;

const Title = styled.div`
  font-size: 58px;
`;

const Message = styled.div`
  margin-top: 40px;
  font-size: 24px;
`;

export default () => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    }, 100);
  });

  return (
      <Container>
        <Confetti width={width} height={height} numberOfPieces={450} />
        <Title>Congrats!</Title>
        <Message>Stripe has successfully processed your payment</Message>
      </Container>
  );
};
