import React from 'react'
import { Outlet, } from 'react-router-dom'
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
