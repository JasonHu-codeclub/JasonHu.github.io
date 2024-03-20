import React from 'react'
import { Outlet, } from 'react-router-dom'
import tw from 'twin.macro'
import styled from '@emotion/styled'
const Wrapper = styled.div`${tw`relative min-h-screen flex flex-col`}`
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
