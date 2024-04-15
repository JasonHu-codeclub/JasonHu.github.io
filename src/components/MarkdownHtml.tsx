import {memo, useEffect, useRef, useState} from "react";
import tw, {styled} from "twin.macro";
import {Root,createRoot} from "react-dom/client";//Root 是一个类型，代表 React 18 引入的根实例，它由 createRoot 函数创建。
import MarkdownIt from 'markdown-it';
import {SANDBOX_TEMPLATES} from "@codesandbox/sandpack-react";
import {highlight} from "../utils.ts";
import Playground, {PlaygroundProps} from "./Playground.tsx";
type ReactRootElement = HTMLDivElement & {reactRoot?: Root}
export type MarkdownHtmlProps =  {
    markdown:string;
    playground?:boolean
}
const Container = styled.div`
    ${tw`bg-transparent!`}
  > pre{//div的直接子元素才能
      ${tw`rounded shadow-md border border-gray-200 bg-white dark:bg-slate-800 dark:border-gray-800`}
    }
`;

const parseArgs = (raw: string): Record<string, string> => {
    const re = /(?<key>\w+)="(?<value>[^"]*)"/g;
    const args: Record<string, string> = {};

    for (const matched of raw.matchAll(re)) {
        const { key, value } = matched.groups!;
        args[key] = value;
    }

    const [lang] = raw.split(' ', 1);
    if (lang) args.lang = lang;

    return args;
};

const toHtml = (markdown: string, playground?: boolean) => {
    if (!markdown) return '';

    const md = new MarkdownIt({ highlight });
    const defaultFence = md.renderer.rules.fence;

    md.renderer.rules.fence = (tokens, idx, options, env, self) => {
        const { content, info } = tokens[idx];
        const args = parseArgs(info);

        if (playground && Object.keys(SANDBOX_TEMPLATES).includes(args.template)) {
            const el = document.createElement('div');

            Object.assign(el.dataset, {
                playground: true,
                code: content,
                template: args.template,
                autorun: args.autorun !== 'false',
            });

            return el.outerHTML;
        }

        return defaultFence?.(tokens, idx, options, env, self) || '';
    };

    return md.render(markdown);
};

export default memo(function MarkdownHtml(props:MarkdownHtmlProps){
    const {markdown,playground} = props;
    const container = useRef<HTMLDivElement>(null);
    const playgrounds = useRef<Root[]>([]);
    const [html, setHtml] = useState('');
    useEffect(() => {
        setHtml(toHtml(markdown,playground));
        // 此处eslint默认认为必须在依赖项中包含markdown和playground才行，如果有充足理由认为可以传空数组，下列注释可以关闭eslint提示：
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[markdown,playground]);
    useEffect(() => {
        if(!container.current) return;
        container.current.querySelectorAll<HTMLDivElement>('[data-playground]')
            .forEach((el:ReactRootElement) => {
                if(!el.reactRoot){
                    el.reactRoot = createRoot(el);
                    // createRoot(el) 的调用创建了一个与 el 这个 DOM 元素相关联的 React 根实例。
                    // 然后这个根实例被存储在 el.reactRoot 中，
                    playgrounds.current.push(el.reactRoot);
                }
                el.reactRoot.render(
                    <Playground {...(el.dataset as PlaygroundProps)}/>
                )
            })//('[data-playground]')属性选择器
    //     这里用<HTMLDivElement>不用<HTMLDivElement[]>的原因
        // 泛型在 TypeScript 中经常用于指定集合类型（如数组、列表、集合等）内部元素的类型，而不是集合本身的类型。
    //     而QuerySelectorAll获取的是一个NodeList对象，所以HTMLDivElement是对对象内部元素的类型声明
    },[html]);

    //卸载playgrounds
    useEffect(() => {
        return () => {
            playgrounds.current.forEach((root) => {
                setTimeout(() => root.unmount(),0);
            });
        };
    },[]);
    return (
        <Container ref={container} className="markdown-body"
        dangerouslySetInnerHTML={{__html:html}}/>
    )
})