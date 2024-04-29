import {Box, VStack, Image, Flex, Text} from "@chakra-ui/react";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";
import GoogleAuth from "./GoogleAuth.jsx";

const AuthForm = () => {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <>
            <Box border={"1px solid gray"} borderRadius={4} padding={4}>
                <VStack spacing={5}>
                    <Image src='/LiftWiseIcon.png' h={20} cursor={'pointer'} alt='LiftWise' />

                    {isLogin ? <Login /> : <Signup />}

                    {/* ---------------- OR -------------- */}
                    <Flex alignItems={"center"} justifyContent={"center"} my={4} gap={1} w={"full"}>
                        <Box flex={2} h={"1px"} bg={"gray.400"} />
                        <Text mx={1} color={"white"}>
                            OR
                        </Text>
                        <Box flex={2} h={"1px"} bg={"gray.400"} />
                    </Flex>

                    <GoogleAuth />
                </VStack>
            </Box>

            <Box border={"1px solid gray"} borderRadius={4} padding={5}>
                <Flex alignItems={"center"} justifyContent={"center"}>
                    <Box mx={2} fontSize={15}>
                        {isLogin? "Még nincs felhasználói fiókod?" : "Már van felhasználói fiókod?"}
                    </Box>
                    <Box onClick={() => setIsLogin(!isLogin)} color={"blue.500"} cursor={"pointer"}>
                        {isLogin ? "Regisztrálás" : "Bejelentkezés"}
                    </Box>
                </Flex>
            </Box>
        </>
    );
};

export default AuthForm;
