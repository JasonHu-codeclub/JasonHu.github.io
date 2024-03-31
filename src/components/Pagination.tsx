import React, {useCallback, useMemo} from 'react'
import tw, {styled} from "twin.macro";
import IconArrowLeft from '~icons/ri/arrow-left-s-line';
import IconArrowRight from '~icons/ri/arrow-right-s-line';
import {clamp} from '../utils.ts'
// 关于Radius和Range
// 如果当前页码是 7，RADIUS 是 2，则分页器将尝试显示从页码 5 到页码 9 的按钮（7 减去 2 到 7 加上 2）。
// 当然，这还需要考虑总页数的限制和是否当前页码已经接近首尾页码。
// 这就是为什么会有 clamp 函数的使用，来确保生成的页码按钮不会超出实际的页码范围。
const Radius = 2;
const Range = 2*Radius;
const List = tw.ul`space-x-4 flex`;
const Item = styled.li<{ active?: boolean; disabled?: boolean }>`
  ${tw`w-8 h-8 flex items-center justify-center rounded-sm text-slate-300 cursor-pointer`}
  ${({active}) => active && tw`bg-blue-500 text-white`}
  ${({disabled}) => disabled && tw`opacity-30 cursor-not-allowed`}
`;

export type PaginationProps = {
  page: number;
  pageSize: number;
  total: number;
  onChange?: (page: number) => void;
};
export default function Pagination(props:PaginationProps) {
  const {page,pageSize,total,onChange} = props;
  const totalPages = useMemo(() => Math.ceil(total / pageSize),[total,pageSize]);
  const pages = useMemo(() => {//pages:当前pagination显示的页码数组
    if(totalPages < 1) return [];
    const start = clamp(
        page + Radius > totalPages? totalPages - Range : page - Radius,
        1,
        totalPages
    );
    const end = clamp(start + Range,start,totalPages);
    const length = end - start + 1;
    return Array.from({length}).map((_,i) => start + i)
  }, [page,totalPages])
  const hasPrevious = page > 1;
  const hasNext = page < totalPages;
  const onGoto = useCallback(
      (e:React.MouseEvent<HTMLLIElement>) => {
        const to = (e.target as HTMLLIElement).dataset.page;
        if(to) onChange?.(parseInt(to,10));
      },
      [onChange],
  );
  const onPrevious = useCallback(() => {
    if (hasPrevious) onChange?.(page - 1);
  }, [page, hasPrevious, onChange]);
  const onNext = useCallback(() => {
    if (hasNext) onChange?.(page + 1);
  }, [page, hasNext, onChange]);

    console.log("输出pages数组：",pages);
    console.log("输出total：",total);
    console.log("输出当前page：",page);
    console.log("输出当前pageSize：",pageSize);

  if (totalPages <= 0) {
      console.log("totalpages为空")
      return null;
  }
  return (
      <List>
        {/*向前一页*/}
        <Item disabled={!hasPrevious} onClick={onPrevious}>
          <IconArrowLeft />
        </Item>
        {pages.map((i) => (
            <Item key={i} active={i === page} onClick={onGoto} data-page={i}>
              {i}
            </Item>
        ))}
        {/*向后一页*/}
        <Item disabled={!hasNext} onClick={onNext}>
          <IconArrowRight />
        </Item>
      </List>
  )
}
