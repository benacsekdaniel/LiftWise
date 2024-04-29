import {Flex, Image, Text} from "@chakra-ui/react";

const GoogleAuth = () => {
    return (
    <Flex alignItems={"center"} justifyContent={"center"} cursor={"pointer"}>
        <Image src='/googleIcon.png' w={5} alt="LoginWGoogle"/>
        <Text mx="2" color={"blue.500"}>
            Log in with Google!
        </Text>
    </Flex>
    )
}

export default GoogleAuth;