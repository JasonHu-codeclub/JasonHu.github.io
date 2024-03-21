import React, { useMemo, useTransition } from "react";
import { useState } from "react";
import tw from "twin.macro";
import Skeleton from "../components/Skeleton";
import Pagination from "../components/Pagination";
import CategoryModel from "../models/CategoryModel";
import ArticleModel from "../models/ArticleModel";
import ArticleItem from "../components/ArticleItem";
import { useTranslation } from "react-i18next";
import useHandling from "../hooks/useHandling";
const Wrapper = tw.main`mx-auto w-full max-w-screen-lg px-8 py-12 bg-slate-200`;
const Title = tw.h2`text-2xl text-slate-500`;
const List = tw.div`mt-8`;
const Foot = tw.div`mt-8 flex justify-center`;

export default function Articles(props:ArticlesProps) { 
  const { t } = useTranslation();
  const [category, setCategory] = useState<CategoryModel>(); // State is of type CategoryModel or undefined(no initial value )
  const [articles, setArticles] = useState<ArticleModel[]>([]);
  const total = category?.articles ?? 0;//文章总数，如果category为null或者undefined，则直接赋值0
  const title = useMemo(() => {
    return category ? t(`tab.${category.title.toLowerCase()}`) : "";
  }, [category]);
  const [loadingArticles,setLoadingArticles] = useHandling(
    useCallback(async () =>  {
      if(category?.number !== props.milestones){
        
      }
    },[])
  )
  return (
    <Wrapper>
      <Skeleton tw="h-8 w-24">
        <Title>{title}</Title>
      </Skeleton>
      <List>
        <ArticleItem />
      </List>
      <Foot>
        <Pagination />
      </Foot>
    </Wrapper>
  );
}
