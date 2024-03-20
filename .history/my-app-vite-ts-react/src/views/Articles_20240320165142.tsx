import React from 'react'
import { useState } from 'react';
import tw from 'twin.macro'
import Skeleton from '../components/Skeleton';
import Pagination from '../components/Pagination';
import CategoryModel from '../models/CategoryModel';
import ArticleModel from '../models/ArticleModel';

const Wrapper = tw.main`mx-auto w-full max-w-screen-lg px-8 py-12 bg-red-500`;
const Title = tw.h2`text-2xl text-slate-500`;
const List = tw.div`mt-8`;
const Foot = tw.div`mt-8 flex justify-center`;

export default function Articles() {
  const [category,setCategory] = useState<CategoryModel>();// State is of type CategoryModel or undefined(no initial value )
  const [articles,setArticles] = useState<ArticleModel[]>([]);
  return (
    <Wrapper>
      <Skeleton tw="h-8 w-24">
        <Title>Posts</Title>
      </Skeleton>
      <List></List>
      <Foot>
        <Pagination/>
      </Foot>
    </Wrapper>
  )
}
