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
  const router=useRouter();
  useEffect(()=>{
    const fetchData=async()=>{
      const res=await axios.get('/api/scripts/getRecommded');
      if(res?.data){
        setallUsers(res?.data?.users)
      }
    }
    fetchData()
  },[])

  return (
    <Box
      bg="#171821"
      position="fixed"
      left="0"
      width={collapsed == true ? "60px" : "200px"}
      height="100vh"
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
      {!collapsed &&
      <Box mt="1.5rem" pl="1rem" opacity="50%">
        Recommended
      </Box>
      }
      <Box mt="1rem" cursor="pointer" padding="8px">
        <Box borderRadius="100px" pl="0.5rem" display="flex" gap="0.7rem" padding="8px"
        onClick={()=>{

        }}
        _hover={
          {
            background:"grey",
            transition: "background 0.3s ease",
          }
        }
        >
          <Avatar src={user?.imageUrl} size={collapsed==true ?"30":"20"} round={true} />
          {!collapsed &&<Text>
            {user?.fullName}
          </Text>}
        </Box>
        {allUsers.map((userRecommded:any,index:number)=>(
          <Box key={index} mt="1rem" borderRadius="100px" pl="0.5rem" display="flex" gap="0.7rem" padding="8px"
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
                  {!collapsed &&<Text>
                    {userRecommded?.username}
                  </Text>}
                </Box>
        ))

        }
      </Box>
    </Box>
  );
};

export default Siderbar;
