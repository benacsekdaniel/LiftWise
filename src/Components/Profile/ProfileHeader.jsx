import {Avatar, AvatarGroup, Button, Flex, Text, VStack} from "@chakra-ui/react";

const ProfileHeader = () => {
    return <Flex gap={{base: 4, sm: 10}} py={10} direction={{base: "column", sm: "row"}}>
        <AvatarGroup size={{base:"xl",md:"2xl"}} justifySelf={"center"} alignSelf={"flex-start"} mx={"auto"}>
            <Avatar name='PFP' src="/Profilepic.png" alt="A profilképed!"/>
        </AvatarGroup>
        <VStack alignItems={"start"} gap={2} mx={"auto"} flex={1}>
            <Flex gap={4} direction={{base:"column",sm:"row"}} justifyContent={{base:"center", sm:"flex-start"}} alignItems={"center"} w={"full"}>
                <Text fontSize={{base:"sm",md:"lg"}}>
                    LiftWiseSuperAdmin
                </Text>
                <Flex gap={4} alignItems={"center"} justifyContent={"center"}>
                    <Button bg={"white"} color={"black"} _hover={{bg:"whiteAlpha.800"}} size={{base:"xs", md:"sm"}}>
                        Profil Módosítása
                    </Button>
                </Flex>
            </Flex>
            <Flex alignItems={"center"} gap={{base:2, sm:4}}>
                <Text>
                    LiftWise tagság kezdete: 2024.04.04.
                </Text>
            </Flex>

        </VStack>
    </Flex>
}

export default ProfileHeader