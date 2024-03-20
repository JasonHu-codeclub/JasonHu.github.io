import React from 'react'
import { Outlet, } from 'react-router-dom'
import tw from 'twin.macro'
import styled from '@emotion/styled'
const Wrapper = styled.div`${tw` min-h-screen flex flex-col`}`
const Header = tw.header`h-20 w-full bg-slate-300`
const HeaderCenter = tw.div`mx-auto flex px-8 bg-orange-300`
const Footer = tw.footer`w-full absolute left-0 bottom-5 bg-red-300 `
export default function Main() {
  return (
    <Wrapper>
        <Header>
            <HeaderCenter></HeaderCenter>
        </Header>
        <Outlet/>
        <Footer>这是footer</Footer>
    </Wrapper>
  )
}
