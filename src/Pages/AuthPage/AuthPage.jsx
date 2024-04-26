import {Box, Container, Flex, VStack , Image } from '@chakra-ui/react'
import AuthForm from "../../Components/AuthForm/AuthForm.jsx";
const AuthPage = () => {
    return (
        <Flex minH={"100vh"} justifyContent={"center"} alignItems={"center"} px={4}>
            <Container maxW={"container.md"} padding={0}>
                <Flex justifyContent={"center"} alignItems={"center"} gap={10}>
                    {/* Left hand-side */}
                    <Box display={{base:"none", md: "block"}}>
                        <Image src="/LiftWiseIcon.png" h={300} alt="Icon"/>
                    </Box>

                    {/* Right hand-side */}
                    <VStack spacing={4} align={"stretch"}>
                        <AuthForm />
                        <Box textAlign={"center"}>Töltse le az alkalmazást! (Folyamatban)</Box>
                        <Flex gap={5} justifyContent={"center"}>
                            <Image src='/appstorelogo.png' h={"10"} a='AppStore'/>
                            <Image src='/playstorelogo.png' h={"12"} a='PlayStore'/>
                        </Flex>
                    </VStack>
                </Flex>
            </Container>
        </Flex>
    );
};

export default AuthPage;
