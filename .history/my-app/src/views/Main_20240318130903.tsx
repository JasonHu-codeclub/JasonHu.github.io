import React from 'react'
import { Outlet, } from 'react-router-dom'
import tw from 'twin.macro'
import styled from '@emotion/styled'
const Wrapper = styled.div`${tw`relative min-h-screen flex flex-col`}`
const Header = tw.header`h-20 w-full bg-slate-300`
const Footer = tw.footer`w-full absolute left-0 bg-slate-900`
export default function Main() {
  return (
    <Wrapper>
        <Header>
            这是Header
        </Header>
        <Outlet/>
        <Footer>.</Footer>
    </Wrapper>
  )
}
