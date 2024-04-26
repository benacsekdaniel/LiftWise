import {Avatar, Box, Flex, Link} from "@chakra-ui/react";
import {Link as RouterLink} from "react-router-dom"

const SuggestedHeader = () => {
    return <Flex justifyContent={"space-between"} alignItems={"center"} w={'full'}>
        <Flex alignItems={"center"} gap={2}>
            <Avatar name='PFP' size={"lg"} src='/Profilepic.png'/>
            <Box fontSize={12} fontWeight={"bold"}>
                LiftWiseAdmin
            </Box>
        </Flex>
        <Link as={RouterLink} to={"/auth"} fontSize={14} fontWeight={"md"} color={"blue.400"} cursor={"pointer"}>
            Kijelentkezés!
        </Link>
    </Flex>
}

export default SuggestedHeader