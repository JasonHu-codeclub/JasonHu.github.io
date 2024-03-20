import React from 'react'
import { Outlet, } from 'react-router-dom'
import tw,{styled} from 'twin.macro'
const Wrapper = styled.div
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
