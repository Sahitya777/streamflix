import { Box, Text, Tooltip } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";
import { User } from "@prisma/client";
import { db } from "@/lib/db";
import { useAuth, useUser } from "@clerk/nextjs";
import Avatar from 'react-avatar';
import { getRecommended } from "@/lib/recommended-service";
import axios from "axios";
import { useRouter } from "next/router";

const Siderbar = () => {
  const [collapsed, setcollapsed] = useState(false);
  const { isSignedIn, user, isLoaded } = useUser();
  const [allUsers, setallUsers] = useState<any>([]);
  const [followedUsers, setfollowedUsers] = useState<any>([])
  const router=useRouter();
  const {  userId, sessionId, getToken } = useAuth();
  console.log(user,"us")
  useEffect(()=>{
    const fetchData=async()=>{
      const res=await axios.get('/api/scripts/getRecommded');
      if(res?.data){
        setallUsers(res?.data?.users)
      }
    }
    fetchData()
  },[])

  useEffect(()=>{
    try{
        const fetchFollowers=async()=>{
            const res=await axios.get(`/api/scripts/getfollowers?userId=${userId}`)
            setfollowedUsers(res?.data?.followedusers)
        }
        if(userId){
          fetchFollowers()
        }
    }catch(err){
        console.log(err,"err in get follower")
    }
},[userId])

  return (
    <Box
      bg="#171821"
      position="fixed"
      left="0"
      width={collapsed == true ? "60px" : "200px"}
      height="100vh"
      color="white"
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        {!collapsed && (
          <Text pt="1rem" pl="1rem">
            For You
          </Text>
        )}
        <Box
          cursor="pointer"
          display="flex"
          alignItems="center"
          justifyContent="center"
          mt="0.6rem"
          mr="1rem"
          ml={collapsed == true ? "1rem" : "0"}
          onClick={() => {
            setcollapsed(!collapsed);
          }}
        >
          <Tooltip
            hasArrow
            placement="bottom"
            boxShadow="dark-lg"
            label={collapsed == true ? "Expand" : "Collapse"}
            bg="#02010F"
            fontSize={"14px"}
            fontWeight={"400"}
            borderRadius="6px"
            padding="8px"
            color="#F0F0F5"
            border="1px solid"
            borderColor="#23233D"
            arrowShadowColor="#2B2F35"
          >
            {collapsed ? <ArrowRightFromLine /> : <ArrowLeftFromLine />}
          </Tooltip>
        </Box>
      </Box>
      {!collapsed && followedUsers.length>0 &&
      <Box mt="1.5rem" pl="1rem" opacity="50%">
        Following
      </Box>
      }
                {followedUsers.map((userFollowed:any,index:number)=>(
          <Box key={index} mt="1rem" borderRadius="100px" ml="0.5rem" display="flex" gap="0.7rem" padding="8px" cursor="pointer"
          onClick={()=>{
            router.push(`/${userFollowed?.following.username}`)
          }}
          _hover={
            {
              background:"grey",
              transition: "background 0.3s ease",
            }
          }>
            <Avatar src={userFollowed?.following.imageUrl} size={collapsed==true ?"30":"20"} round={true} />
                  {!collapsed &&<Text >
                    {userFollowed?.following.username}
                  </Text>}
                </Box>
        ))
        

        }
      {!collapsed &&
      <Box mt="1.5rem" pl="1rem" opacity="50%">
        Recommended
      </Box>
      }
        {allUsers.map((userRecommded:any,index:number)=>(
          <Box key={index} mt="1rem" borderRadius="100px" ml="0.5rem" display="flex" gap="0.7rem" padding="8px" cursor="pointer"
          onClick={()=>{
            router.push(`/${userRecommded?.username}`)
          }}
          _hover={
            {
              background:"grey",
              transition: "background 0.3s ease",
            }
          }>
            <Avatar src={userRecommded?.imageUrl} size={collapsed==true ?"30":"20"} round={true} />
                  {!collapsed &&<Text >
                    {userRecommded?.username}
                  </Text>}
                </Box>
        ))
        }
    </Box>
  );
};

export default Siderbar;
