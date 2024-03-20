import React from "react";
import tw from "twin.macro";
const Wrapper = tw.div`flex flex-col justify-center h-20 border-t border-dotted border-gary-300`
const Row = tw.div`flex `;
const Left = tw.div`hidden lg:block w-36 text-sm text-slate-400 text-right`;
const Right = tw.div`ml-4 flex-1 min-w-0 truncate`;
export default function ArticleItem() {
  return (
    <Wrapper>
      <Row>
        <Left>Left组件</Left>
        <Right>Right组件</Right>
      </Row>
      <Row>
        <Left>Left组件</Left>
        <Right>Right组件</Right>
      </Row>
    </Wrapper>
  );
}
