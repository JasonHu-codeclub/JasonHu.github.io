import React, {memo, useCallback, useEffect, useMemo, useState} from 'react'
import tw from "twin.macro";
import {useParams} from "react-router-dom";
import ArticleModel from "../models/ArticleModel.ts";
import githubService from "../services/githubService.ts";
import useHandling from "../hooks/useHandling.ts";
import Skeleton from "../components/Skeleton.tsx";
import {format} from "date-fns";
import {t} from "i18next";
import LabelItem from "../components/LabelItem.tsx";
import {createQueryURL} from "../utils.ts";
import IconComments from "~icons/ri/chat-2-line";

const Wrapper = tw.article`mx-auto w-full max-w-screen-lg px-8 py-12 bg-red-300 h-10`
const ParagraphSkeleton = tw.ul`mt-8 space-y-4`;

const Title = tw.h2`text-2xl text-slate-700`
const Info = tw.div`mt-4 mb-8 space-x-4 flex flex-wrap content-center text-sm text-slate-400`

function useArticle() {
    const {id} = useParams();
    const [article, setArticle] = useState<ArticleModel>();


    const [loading, load] = useHandling(
        useCallback(async () => {
            const result = await githubService.getIssue(parseInt(id!, 10));
            setArticle(ArticleModel.from(result));
        }, [id]),
        true,
    );


    useEffect(() => {
        load();
    }, [id]);

    return [loading, article] as const;
}

export default memo(function Article() {
    const [articleLoading, article] = useArticle();
    const createdAt = useMemo(() => {
        return article ? format(new Date(article.createdAt), t('dateFormat')) : '';
    }, ['article']);

    const getLabelLink = useCallback((label: string) => {// generate a URL based on a given label
        return `../${createQueryURL({label, page: 1})}`;
    }, []);//依赖数组是空的，意味着回调函数或效果函数仅在组件的首次渲染时执行一次

    return (
        <Wrapper>
            <article>
                {articleLoading && (
                    <>
                        <Skeleton tw="h-8 w-1/3"/>
                        <ParagraphSkeleton>
                            <Skeleton tw="w-1/2"/>
                            <Skeleton tw="w-full"/>
                            <Skeleton tw="w-4/5"/>
                            <Skeleton tw="w-full"/>
                            <Skeleton tw="w-3/5"/>
                            <Skeleton tw="w-full h-40"/>
                            <Skeleton tw="w-4/5"/>
                            <Skeleton tw="w-full"/>
                            <Skeleton tw="w-3/5"/>
                            <Skeleton tw="w-full"/>
                            <Skeleton tw="w-2/5"/>
                        </ParagraphSkeleton>
                    </>
                )}
                {article && (
                    <>
                        <Title>{article.title}</Title>
                        <Info>
                            <span>{createdAt}</span>
                            <span tw={"flex items-center"}>
                                {article.labels.map((label) => (
                                    <LabelItem key={label.id} label={label} getLink={getLabelLink}/>
                                ))}
                            </span>
                            <span tw="flex items-center">
                                <IconComments/>
                                <span tw="ml-1">{article.comments}</span>
                            </span>
                        </Info>
                        
                    </>
                )}
            </article>
        </Wrapper>
    )
})
