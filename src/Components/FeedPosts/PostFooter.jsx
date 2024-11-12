import { Box, Flex, Text } from "@chakra-ui/react";

const PostFooter = ({username, content}) => {
    return (
        <Box mb={24}>
            <Flex direction="column" gap={2} w={"full"} pt={0} mb={2} my={5}>
                <Text fontSize='sm' fontWeight={700}>
                    {username}
                </Text>
                <Text fontSize='sm' fontWeight={400} noOfLines={2}>
                    {content.length > 150 ? `${content.substring(0, 150)}...` : content}
                </Text>
            </Flex>
        </Box>
    )
}

export default PostFooter