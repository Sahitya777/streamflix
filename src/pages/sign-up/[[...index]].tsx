import { Box,Text } from "@chakra-ui/react";
import { SignUp } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
  return(
    <Box display="flex" alignItems="center" justifyContent="center" height="100vh">
        <Box display="flex" flexDirection="column" gap="1rem">
            <Box display="flex" flexDirection='column' gap="1rem" textAlign="center" alignItems="center">
                <Box background="white" borderRadius="50%" width="80px" height="80px" display="flex" justifyContent="center" alignItems="center">
                <Image
                src={'/spooky.svg'}
                alt="npot"
                width={70}
                height={70}
                />
                </Box>
                <Text color="white" fontSize="22px" fontWeight="500">
                    Gamehub
                </Text>
                <Text color="grey" fontSize="16px" fontWeight="400">
                    Let's Play
                </Text>
            </Box>
            <SignUp />
        </Box>
    </Box>
);
}