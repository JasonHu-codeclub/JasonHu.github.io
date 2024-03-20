import React from 'react'
import tw from 'twin.macro'
import Skeleton from '../components/Skeleton';
import Pagination from '../components/Pagination';
const Wrapper = tw.main`mx-auto w-full max-w-screen-lg px-8 py-12 bg-red-500`;
const Title = tw.h2`text-2xl text-slate-500`;
const List = tw.div`mt-8`;
const Foot = tw.div`mt-8 flex justify-center`;




export default function Articles() {
  return (
    <Wrapper>
      <Skeleton tw="h-8 w24">
        <Title></Title>
      </Skeleton>
      <List></List>
      <Foot>
        <Pagination/>
      </Foot>
    </Wrapper>
  )
}
