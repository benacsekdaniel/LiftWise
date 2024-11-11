import PostHeader from "./PostHeader.jsx";
import {Box, Image} from "@chakra-ui/react";
import PostFooter from "./PostFooter.jsx";

const FeedPost = ({img, username, avatar, content, articleId}) => {
    return (
        <>
            <PostHeader username={username} avatar={avatar} articleId={articleId} />
            <Box my={2} borderRadius={4} overflow={"hidden"}>
                <Image src={img} alt={username} />
            </Box>
            <PostFooter username={username} content={content}/>
        </>
    )
}

export default FeedPost;