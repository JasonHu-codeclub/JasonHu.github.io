import {memo, useEffect, useRef, useState} from "react";
import tw, {styled} from "twin.macro";
import {Root} from "react-dom/client";
import MarkdownIt from 'markdown-it';
import {SANDBOX_TEMPLATES} from "@codesandbox/sandpack-react";
import {highlight} from "../utils.ts";

export type MarkdownHtmlProps =  {
    markdown:string;
    playground?:boolean
}
const Container = styled.div`
    ${tw`bg-transparent!`}
  > pre{//div的直接子元素才能
      ${tw`rounded shadow-md border border-gray-200 g-white dark:bg-slate-800 dark:border-gray-800`}
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
        setHtml(toHtml(markdown,playground))
    })
    return (
        <Container ref={container} className="markdown-body"
        dangerouslySetInnerHTML={{__html:html}}/>
    )
})