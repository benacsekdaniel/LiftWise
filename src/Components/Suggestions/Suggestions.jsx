import { Button, Flex, Text, Link, Image } from "@chakra-ui/react";
import { Link as RouterLink } from 'react-router-dom';
import useLogout from "../../hooks/useLogout";
import useAuthStore from "../../store/authStore.js";
import { useState } from "react";

const Suggestions = () => {
    const { handleLogout, isLoggingOut } = useLogout();
    const authUser = useAuthStore((state) => state.user);

    return (
        <Flex 
            py={4} 
            px={6} 
            maxW="1400px" 
            mx="auto" 
            w="full" 
            borderBottom="1px solid"
            borderColor="whiteAlpha.300"
            alignItems="center"
            justifyContent="space-between"
        >
            {/* Left side - Links */}
            <Flex gap={6} alignItems="center">
                <Text fontSize={14} fontWeight="bold" color="gray.500">
                    Ajánlott olvasmányok:
                </Text>
                <Link 
                    href='https://www.ucsfhealth.org/education/top-ten-foods-for-health' 
                    isExternal
                    fontSize={14}
                    color="blue.400"
                    _hover={{ color: "blue.300" }}
                >
                    Egészséges ételek
                </Link>
                <Link 
                    href='https://ecofamily.hu/cikkek/egeszseges-eletmod' 
                    isExternal
                    fontSize={14}
                    color="blue.400"
                    _hover={{ color: "blue.300" }}
                >
                    Egészséges életmód
                </Link>
                <Link 
                    href='https://n1.training/exercise-execution-definition/' 
                    isExternal
                    fontSize={14}
                    color="blue.400"
                    _hover={{ color: "blue.300" }}
                >
                    Helyes edzésforma
                </Link>
            </Flex>

            {/* Right side */}
            <Flex gap={4} alignItems="center">
                <RouterLink to="/Profile">
                    <Flex alignItems="center" gap={2}>
                        <Image
                            src='/Profilepic.png'
                            alt='Profile'
                            boxSize="30px"
                            borderRadius="full"
                        />
                        <Text fontSize={14}>
                            {authUser?.username}
                        </Text>
                    </Flex>
                </RouterLink>
                <Button
                    size="sm"
                    colorScheme="gray"
                    variant="ghost"
                    onClick={handleLogout}
                    isLoading={isLoggingOut}
                >
                    Kijelentkezés
                </Button>
            </Flex>
        </Flex>
    );
};

export default Suggestions;

