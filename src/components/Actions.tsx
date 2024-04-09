import Link from "next/link";
import { Clapperboard } from "lucide-react";
import { Box, Button, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { SignInButton, UserButton, useAuth } from "@clerk/nextjs";


export const Actions = () => {
    const { isLoaded, userId, sessionId, getToken } = useAuth();
  return (
    <Box className="flex items-center justify-end gap-x-2 ml-4 lg:ml-0" color="white">
      {!userId && (
        <SignInButton>
          <Button size="sm" variant="primary">
            Login
          </Button>
        </SignInButton>
      )}
        <Box display="flex" alignItems="center">
          <Button
            size="sm"
            variant="ghost"
            display="flex"
            border="none"
            bg="transparent"
            mr="1rem"
            cursor="pointer"
          >
            <Link href={'u'} style={{display:"flex",gap:"0.4rem"}}>
              <Clapperboard />
              <Text className="hidden lg:block" fontSize="18px" mt="0.1rem" color="white" fontWeight="400">
                Dashboard
              </Text>
            </Link>
          </Button>
          <UserButton
            afterSignOutUrl="/"
          />
        </Box>
    </Box>
  );
};