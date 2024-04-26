import {Box, Container, Flex} from "@chakra-ui/react";
import FeedPosts from "../../Components/FeedPosts/FeedPosts.jsx";
import Suggestions from "../../Components/Suggestions/Suggestions.jsx";

const HomePage = () => {
    return (
        <Container maxW={"container.lg"}>
            <Flex gap={20}>
                <Box flex={2} py={10}>
                   <FeedPosts />
                </Box>
            <Box flex={3} mr={20} display={{base:"none", lg:"block"}} maxW={"300px"}>
                <Suggestions />
            </Box>
            </Flex>
        </Container>
    );
};

export default HomePage;
