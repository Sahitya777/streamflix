import Navbar from '@/components/Navbar'
import Siderbar from '@/components/Siderbar'
import { Box,Button,Text } from '@chakra-ui/react'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState, useTransition } from 'react'

interface UserPageProps{
    params:{
        username:String
    }
}

const Index = ({params}:UserPageProps) => {
    const [userDetail, setuserDetail] = useState<any>()
    const [isFollowing, setisFollowing] = useState<boolean>()
    const router=useRouter();
    const [isPending,startTransition]=useTransition();

    const handleFollow=async()=>{
        try{
            if(isFollowing){
                const unfollow=await axios.post('/api/scripts/following',{
                    followingid:userDetail.id,
                    actionType:"unfollow"
                })
            }else{
                const follow=await axios.post('/api/scripts/following',{
                    followingid:userDetail.id,
                    actionType:"follow"
                })
            }
        }catch(err){
            console.log(err,"err in handle follow")
        }
    }

    useEffect(()=>{
        const fetchUser=async()=>{
            try{
                const res = await axios.get(`/api/scripts/getuser?username=${router.query.username}`);
                if(res?.data){
                    setuserDetail(res?.data?.user)
                }
            }catch(err){
                console.log(err,"err in fetchuser")
            }
        }
        if(router.query.username!=undefined){
            fetchUser()
        }
    },[router.query.username])

    useEffect(()=>{
        const fetchFollowingData=async()=>{
            try{
                const res=await axios.get(`/api/scripts/following?followingid=${userDetail.id}`);
                if(res?.data){
                    setisFollowing(res?.data?.exisitingFollow)
                }
            }catch(err){
                console.log(err,"err in following data")
            }
        }
        if(userDetail){
            fetchFollowingData()
        }
    },[userDetail])
  return (
    <Box>
        <Navbar/>
        <Siderbar/>
        <Box pl="200px" display="flex" flexDirection="column" gap="1rem">
            <Text>
                 Username :{userDetail?.username}
            </Text>
            <Text>
                User ID: {userDetail?.id}
            </Text>
            <Text>
                Following: {`${isFollowing}`}
            </Text>
            <Button 
            // isDisabled={isFollowing==true ?true: isPending ?true:false} 
            colorScheme='blue' onClick={()=>{
                handleFollow()
            }}>
                {isFollowing==true ? "Unfollow":"Follow"}
            </Button>
        </Box>
    </Box>
  )
}

export default Index 