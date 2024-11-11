import { Box, Container, Flex, VStack, Image, Text } from '@chakra-ui/react';
import AuthForm from "../../Components/AuthForm/AuthForm.jsx";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebase"; // Adjust this path if necessary
import { useEffect } from "react";

const AuthPage = () => {
    const [authUser] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (authUser) {
            navigate('/');  // Redirect to home if user is logged in
        }
    }, [authUser, navigate]);

    return (
        <Box
            minH={'100vh'}
            backgroundImage="url('bg.png')"
            backgroundSize="cover"
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
        >
            <Container maxW={'sm'} padding={0}>
                <Flex justifyContent={'center'} alignItems={'center'} height={'100vh'}>
                    <VStack spacing={8} align={'stretch'} w={'100%'} bg="black" p={8} borderRadius={8}>
                        <AuthForm />
                        <Text textAlign={'center'} fontSize={'lg'}>
                            Töltse le az alkalmazást!
                        </Text>
                        <Flex gap={5} justifyContent={'center'}>
                            <Image src='/appstorelogo.png' h={'10'} alt={'AppStore'} />
                            <Image src='/playstorelogo.png' h={'12'} alt={'PlayStore'} />
                        </Flex>
                    </VStack>
                </Flex>
            </Container>
        </Box>
    );
};

export default AuthPage;
