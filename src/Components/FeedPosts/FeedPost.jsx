import PostHeader from "./PostHeader.jsx";
import {Box, Image, Text} from "@chakra-ui/react";
import PostFooter from "./PostFooter.jsx";
import ArticleModal from '../Article/ArticleModal';
import { useState } from 'react';

const FeedPost = ({img, username, avatar, content, articleId, title}) => {
    const [selectedArticle, setSelectedArticle] = useState(null);

    const handleClick = () => {
        setSelectedArticle({
            title,
            content,
            img_path: img,
            username,
            id: articleId
        });
    };

    return (
        <>
            <Box 
                cursor="pointer" 
                onClick={handleClick}
                borderWidth="1px"
                borderColor="whiteAlpha.200"
                borderRadius="md"
                p={4}
                mb={4}
                bg="whiteAlpha.50"
                _hover={{
                    bg: "whiteAlpha.100",
                    transform: "translateY(-2px)",
                    transition: "all 0.2s ease-in-out"
                }}
            >
                <PostHeader username={username} avatar={avatar} articleId={articleId} />
                <Text fontSize="xl" fontWeight="bold" mb={2}>
                    {title}
                </Text>
                <Box my={2} borderRadius={4} overflow={"hidden"}>
                    <Image src={img} alt={username} />
                </Box>
                <PostFooter username={username} content={content}/>
            </Box>

            <ArticleModal 
                isOpen={!!selectedArticle} 
                onClose={() => setSelectedArticle(null)} 
                article={selectedArticle}
            />
        </>
    );
}

export default FeedPost;