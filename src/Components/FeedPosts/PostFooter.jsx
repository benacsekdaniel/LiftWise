import { Box, Flex, Text } from "@chakra-ui/react";

const PostFooter = ({username, content}) => {
    return (
        <Box mb={24}>
            <Flex alignItems={"center"} gap={4} w={"full"} pt={0} mb={2} my={5}>
                <Text fontSize='sm' fontWeight={700}>
                    {username} {" "}
                    <Text as='span' fontWeight={400}>
                        {content}
                    </Text>
                </Text>
            </Flex>
        </Box>
    )
}

export default PostFooter