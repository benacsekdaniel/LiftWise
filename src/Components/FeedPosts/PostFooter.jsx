import {Box, Button, Flex, Input, InputGroup, InputRightElement, Text} from "@chakra-ui/react";
import {CommentLogo} from "../../assets/constants.jsx";

const PostFooter = ({username}) => {
        return (
            <Box mb={24}>
                <Flex alignItems={"center"} gap={4} w={"full"} pt={0} mb={2} my={5}>
                    <Box cursor={"pointer"} fontSize={18}>
                        <CommentLogo />
                    </Box>
                    <Text fontSize='sm' fontWeight={700}>
                        {username} {" "}
                        <Text as='span' fontWeight={400}>
                            Az egészséges élet titka!
                        </Text>
                    </Text>
                </Flex>
                    <Text fontSize='sm' color={"gray"}>
                        Összes hozzászólás!
                    </Text>

                    <Flex alignItems={"center"} gap={2} justifyContent={"space-between"} w={"full"}>
                        <InputGroup>
                            <Input variant={"flushed"} placeholder={"Kommentelj valami szépet!"} fontSize={14} />
                            <InputRightElement>
                                <Button fontSize={14} color={"green.500"} fontWeight={500} cursor={"pointer"} _hover={{color:"white"}}  bg={"transparent"} >
                                    Post
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                    </Flex>

            </Box>
    )
}

export default PostFooter