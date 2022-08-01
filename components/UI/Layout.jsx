import React from 'react'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'

const Layout = () => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}

export default Layout