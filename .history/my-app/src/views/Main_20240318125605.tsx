import React from 'react'
import { Outlet, } from 'react-router-dom'
import tw from 'twin.macro'
import styled from '@emotion/styled'
const Wrapper = styled.div`${tw`relative min-h-screen flex flex-col`}`
const Header = tw.header`h-20 w-full`
const footer = tw.footer`w-full absolute left-0`
export default function Main() {
  return (
    <Wrapper>
        <Header>

        </Header>
        <Outlet/>
        <Footer/>
    </Wrapper>
  )
}
