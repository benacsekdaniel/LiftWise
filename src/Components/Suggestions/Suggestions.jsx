import {Box, Flex, Text, VStack} from "@chakra-ui/react";
import SuggestedHeader from "./SuggestedHeader.jsx";
import Suggestion from "./Suggestion.jsx";

const Suggestions = () => {
    return <VStack py={8} px={6} gap={4}>
        <SuggestedHeader />
        <Flex alignItems={"center"} justifyContent={"space-between"} w={"full"}>
            <Text fontSize={12} fontWeight={"bold"} color={"gray.500"} marginRight={10}>
                Ajánlott olvasmány!
            </Text>
            <Text fontSize={12} fontWeight={"bold"} _hover={{color: "gray.500"}} cursor={"pointer"}>
                Az összes megtekintése!
            </Text>
        </Flex>

        <Suggestion name='Egészséges ételek' link=''/>
        <Suggestion name='Egészséges életmód' link='https://ecofamily.hu/cikkek/egeszseges-eletmod'/>
        <Suggestion name='Helyes edzésforma' link=''/>
    </VStack>
}

export default Suggestions