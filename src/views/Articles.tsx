import {useCallback, useEffect, useMemo} from "react";
import { useState } from "react";
import tw from "twin.macro";
import Skeleton from "../components/Skeleton.tsx";
import Pagination from "../components/Pagination";
import CategoryModel from "../models/CategoryModel";
import ArticleModel from "../models/ArticleModel";
import ArticleItem from "../components/ArticleItem";
import ArticleSkeleton from '../components/ArticleSelecton.tsx';
import { useTranslation } from "react-i18next";
import useHandling from "../hooks/useHandling";
import githubService from '../services/githubService'
import {useLocation, useNavigate} from "react-router-dom";
import useQuery from "../hooks/useQuery.ts";
import {createQueryURL} from "../utils.ts";
const Wrapper = tw.main`mx-auto w-full max-w-screen-lg px-8 py-12 `;
const Title = tw.h2`text-2xl text-slate-500`;
const List = tw.div`mt-8`;
const Foot = tw.div`mt-8 flex justify-center`;

export type ArticlesProps = {
    milestone:number;
}

function useArticlesQuery(){
    const {labels,page} = useQuery();
    return useMemo(
        ()=>({
            label:labels??undefined,
            page:parseInt(page ?? '1',10),
            pageSize:parseInt(import.meta.env.VITE_ARTICLE_PAGE_SIZE,10)
        })
        ,[labels,page]
    )
}

export default function Articles(props:ArticlesProps) {
    const { t } = useTranslation();
    const [category, setCategory] = useState<CategoryModel>(); // State is of type CategoryModel or undefined(no initial value )
    const [articles, setArticles] = useState<ArticleModel[]>([]);
    const total = category?.articles ?? 0;//文章总数，如果category为null或者undefined，则直接赋值0
    const navigate = useNavigate();
    const title = useMemo(() => {
        return category ? t(`tab.${category.title.toLowerCase()}`) : "";
    }, [category]);
    const query = useArticlesQuery();
    const location = useLocation();
    const getArticleLink = useCallback((id:number) =>`${location.pathname}/${id}`,[location]);
    const getLabelLink = useCallback((labels:string) => {
        return createQueryURL({labels,page:1})
    },[])
    const [loadingArticles,setLoadingArticles] = useHandling(
        useCallback(async () =>  {
            if(category?.number !== props.milestone){
                const milestones = await githubService.listMilestones();
                console.log('输出milestone:',milestones);
                const milestone = milestones.find(m=>m.number === props.milestone);
                if(!milestone){
                    navigate('/404')
                    return;
                }
                setCategory(CategoryModel.from(milestone));
            }
            const list = await githubService.listIssues({
                milestone:props.milestone,
                ...query,
            })
            setArticles(list.map(ArticleModel.from));
        },[props.milestone,query]),
    )
    useEffect(() => {
        setLoadingArticles();
    }, [props.milestone, query]);

    const onPageChange = useCallback((page:number) => {
        navigate(createQueryURL({page,labels:query.label}))
    },
    [query.label,props.milestone])

    return (
        <Wrapper>
            <Skeleton tw="h-8 w-24">
                <Title>{title}</Title>
            </Skeleton>
            <List>
                {loadingArticles ? Array.from({length:8}).map((_, i) => <ArticleSkeleton key={i} />):articles.map((article) => (
                    <ArticleItem
                        key={article.id}
                        article={article}
                        getLink={getArticleLink}
                        getLabelLink={getLabelLink}
                    />

                ))}
            </List>
            <Foot>
                <Pagination
                    page={query.page}
                    pageSize={query.pageSize}
                    total={total}
                    onChange={onPageChange}
                />
            </Foot>
        </Wrapper>
    );
}
