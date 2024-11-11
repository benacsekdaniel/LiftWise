import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import { useState, useEffect } from 'react';
import { saveArticle, unsaveArticle, isArticleSaved } from '../../services/savedArticleService';

const PostHeader = ({ username, avatar, articleId }) => {
    const [isSaved, setIsSaved] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log(articleId);
        console.log(username);
        console.log(avatar);
        checkIfSaved();
    }, []);

    const checkIfSaved = async () => {
        try {
            const userInfo = JSON.parse(localStorage.getItem('user-info'));
            if (userInfo) {
                const saved = await isArticleSaved(userInfo.uid, articleId);
                setIsSaved(saved);
            }
            setLoading(false);
        } catch (error) {
            console.error("Error checking saved status:", error);
            setLoading(false);
        }
    };

    const handleSaveClick = async () => {
        try {
            const userInfo = JSON.parse(localStorage.getItem('user-info'));
            if (!userInfo) {
                alert('Please log in to save articles');
                return;
            }

            if (isSaved) {
                await unsaveArticle(userInfo.uid, articleId);
                setIsSaved(false);
            } else {
                await saveArticle(userInfo.uid, articleId);
                setIsSaved(true);
            }
        } catch (error) {
            console.error("Error toggling save:", error);
        }
    };

    return (
        <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"} my={2}>
            <Flex alignItems={"center"} gap={2}>
                <Avatar src={avatar} alt='LiftWiseUser' size={"sm"}/>
                <Flex fontSize={12} fontWeight={"bold"} gap="2">
                    {username}
                    <Box color={"gray.500"}></Box>
                </Flex>
            </Flex>
            <Box cursor={"pointer"} onClick={handleSaveClick}>
                <Text 
                    fontSize={12} 
                    color={"green.500"} 
                    fontWeight={"bold"} 
                    _hover={{color: "white"}} 
                    transition={"0.2s ease-in-out"}
                >
                    {isSaved ? 'Mentve!' : 'Cikk mentése!'}
                </Text>
            </Box>
        </Flex>
    );
};

export default PostHeader;