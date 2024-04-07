import Navbar from '@/components/Navbar'
import Siderbar from '@/components/Siderbar'
import { Box } from '@chakra-ui/react'
import { UserButton } from '@clerk/nextjs'
import React from 'react'

const Home = () => {
  return (
    <Box>
        <Navbar/>
        <Siderbar/>
    </Box>
  )
}

export default Home