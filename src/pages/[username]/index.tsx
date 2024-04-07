import Navbar from '@/components/Navbar'
import Siderbar from '@/components/Siderbar'
import { Box } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'

interface UserPageProps{
    params:{
        username:String
    }
}

const Index = ({params}:UserPageProps) => {
    const router=useRouter();
  return (
    <Box>
        <Navbar/>
        <Siderbar/>
        <Box pl="200px">
            User :{router.query.username}
        </Box>
    </Box>
  )
}

export default Index 