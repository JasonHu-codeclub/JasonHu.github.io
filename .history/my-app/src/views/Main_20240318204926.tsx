import React from 'react'
import { Outlet,NavLink } from 'react-router-dom'
import tw from 'twin.macro'
import styled from '@emotion/styled'
const Wrapper = styled.div`${tw` min-h-screen flex flex-col`}`
const Header = tw.header`h-20 w-full bg-slate-300`
const HeaderCenter = tw.div`mx-auto flex px-8  h-full max-w-screen-lg items-center text-lg font-semibold bg-orange-300`
const Title = tw.span`mx-0.5 text-blue-400`
const Nav = tw.nav`grid gap-3 grid-flow-col ml-auto leading-5`
const navItemStyle = tw`opacity-60 cursor-pointer hover:(opacity-100 text-blue-500)`;
const NavLinkItem = styled(NavLink)`
    ${navItemStyle}
    &.active}{
        ${tw`opacity-100 text-blue-500`}
    }
`;
const Footer = tw.footer`w-full absolute left-0 bottom-5 bg-red-300 `
export default function Main() {
  return (
    <Wrapper>
        <Header>
            <HeaderCenter>
                <Title>JasonHu's Portfolio</Title>
                <Nav>nav</Nav>
            </HeaderCenter>
        </Header>
        <Outlet/>
        <Footer>这是footer</Footer>
    </Wrapper>
  )
}
