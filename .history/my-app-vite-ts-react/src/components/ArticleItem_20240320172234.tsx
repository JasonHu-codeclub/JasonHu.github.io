import React from "react";
import tw from "twin.macro";
const Wrapper = tw.div`flex flex-col justify-center h-20 border-t border-dotted border-gary-300`
const Row = tw.div`flex `;
export default function ArticleItem() {
  return (
    <Wrapper>
      <Row>
        <Left></Left>
        <Right></Right>
      </Row>
      <Row>
        <Left></Left>
        <Right></Right>
      </Row>
    </Wrapper>
  );
}
