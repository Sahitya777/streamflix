import { Box,Input,Text } from "@chakra-ui/react";
import React, { useState } from "react";
import Image from "next/image";
import SearchIcon from "@/assets/SearchIcon";
import { useRouter } from "next/router";
import { UserButton, currentUser } from "@clerk/nextjs";
import { Actions } from "./Actions";
const Navbar = () => {
    const [value, setvalue] = useState<any>("");
    const router=useRouter();
  return (
    <Box display="flex" width="100%" background="#252731" justifyContent="space-between" padding="16px" color="white" >
            <Box display="flex"  gap="1rem" textAlign="center" alignItems="center">
                <Box background="white" borderRadius="50%" width="35px" height="35px" display="flex" justifyContent="center" alignItems="center">
                <Image
                src={'/spooky.svg'}
                alt="npot"
                width={32}
                height={32}
                />
                </Box>
                <Box textAlign="left" display="flex" flexDirection="column" gap="0.3rem">
                    <Text color="white" fontSize="20px" fontWeight="500">
                        Gamehub
                    </Text>
                    <Text color="grey" fontSize="14px" fontWeight="400">
                        Let's Play
                    </Text>
                </Box>
            </Box>
            <Box width="400px" display="flex" gap="1rem" mr="2rem">
                <Input width="100%" height="40px" borderRadius="6px" bg="transparent" border="1px solid black" padding="8px" placeholder="Search" 
                value={value}
                onChange={(e)=>{
                    e.preventDefault();
                    setvalue(e.target.value)
                }}
                
                />
                 <Box onClick={()=>{
                    if(value){
                        router.push(`/search?=${value}`)
                    }

                 }} cursor="pointer" display="flex" justifyContent="center" mt="0.2rem">
                    <SearchIcon/>
                </Box>   
                <Actions/>
            </Box>
    </Box>
  );
};

export default Navbar;
