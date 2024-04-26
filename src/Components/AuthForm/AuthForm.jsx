import {Box, Button, Input, VStack, Image, Flex, Text} from "@chakra-ui/react";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

const AuthForm = () => {
    const [isLogin, setIslogin] = useState(true);
    const navigate = useNavigate();
    const [inputs, setInputs]=useState({
        email:'',
        password:'',
        confirmPassword:''
    });
    const handleAuth = () => {
        if(!inputs.email || !inputs.password)
        {
            alert("Kérem töltse ki a hiányzó mezőket!")
            return
        }
        navigate("/");
    }


    return (
    <>
        <Box border={"1px solid gray"} borderRadius={4} padding={4}>
            <VStack spacing={5}>
                <Image src='/LiftWiseIcon.png' h={20} cursor={'pointer'} alt='LiftWise' />
                <Input placeholder={'E-mail'} fontSize={15} type={"email"}
                       value={inputs.email}
                       onChange={(e) => setInputs({...inputs, email:e.target.value})}
                />
                <Input placeholder={'Jelszó'} fontSize={15} type={"password"}
                       value={inputs.password}
                       onChange={(e) => setInputs({...inputs, password:e.target.value})}
                />

                {!isLogin ? <Input placeholder='Jelszó ellenőrzése'
                    value={inputs.confirmPassword}
                    onChange={(e) => setInputs({...inputs, confirmPassword:e.target.value})}
                fontSize={15} type={"password"}/> : null }

                <Button w={"full"} colorScheme='blue' size={"sm"} fontSize={15} onClick={handleAuth}>
                    {isLogin? "Bejelentkezés" : "Regisztrálás"}
                </Button>
                {/* ------Or------*/}
                <Flex alignItems={"center"} justifyContent={"center"} my={5} gap={2} w={"full"}>
                    <Box flex={2} h={"1px"} bg={"gray.400"}/>
                    <Text mx={1} color={"white"}>OR</Text>
                    <Box flex={2} h={"1px"} bg={"gray.400"}/>
                </Flex>

                <Flex alignItems={"center"} justifyContent={"center"} cursor={"pointer"}>
                    <Image src='/googleIcon.png' w={5} alt="LoginWGoogle"/>
                    <Text mx="2" color={"blue.500"}>
                        Log in with Google!
                    </Text>
                </Flex>
            </VStack>
        </Box>

        <Box border={"1px solid gray"} borderRadius={4} padding={5}>
            <Flex alignItems={"center"} justifyContent={"center"}>
                <Box mx={2} fontSize={15}>
                    {isLogin? "Még nincs felhasználói fiókod?" : "Már van felhasználói fiókod?"}
                </Box>
                <Box onClick={() => setIslogin(!isLogin)} color={"blue.500"} cursor={"pointer"}>
                    {isLogin ? "Regisztrálás" : "Bejelentkezés"}
                </Box>
            </Flex>
        </Box>
    </>
    );
};

export default AuthForm;
