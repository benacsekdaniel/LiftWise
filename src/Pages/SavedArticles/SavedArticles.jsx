import React, { useState, useEffect } from 'react';
import { Box, Grid, Heading, Text, Image, VStack, Container } from '@chakra-ui/react';
import { getUserSavedArticles } from '../../services/savedArticleService';
import { getArticleById } from '../../services/articleService';

const SavedArticles = () => {
    const [savedArticles, setSavedArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchSavedArticles();
    }, []);

    const fetchSavedArticles = async () => {
        try {
            const userInfo = JSON.parse(localStorage.getItem('user-info'));
            if (!userInfo) {
                setError('Please log in to view saved articles');
                setLoading(false);
                return;
            }

            // Get saved article references
            const savedRefs = await getUserSavedArticles(userInfo.uid);
            
            if (savedRefs.length === 0) {
                setSavedArticles([]);
                setLoading(false);
                return;
            }

            // Fetch full article data for each saved article
            const articlesData = await Promise.all(
                savedRefs.map(async (savedRef) => {
                    try {
                        const articleData = await getArticleById(savedRef.articleId);
                        return {
                            ...articleData,
                            savedAt: savedRef.savedAt
                        };
                    } catch (err) {
                        console.warn(`Article ${savedRef.articleId} not found`);
                        return null;
                    }
                })
            );

            // Filter out any null values from deleted articles
            const validArticles = articlesData.filter(article => article !== null);
            setSavedArticles(validArticles);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching saved articles:', err);
            setError('Failed to fetch saved articles');
            setLoading(false);
        }
    };

    if (loading) return <Container maxW="container.lg"><Box p={5}>Loading...</Box></Container>;
    if (error) return <Container maxW="container.lg"><Box p={5}>{error}</Box></Container>;

    return (
        <Container maxW="container.lg">
            <Box p={5}>
                <Heading mb={6}>Mentett cikkek</Heading>
                {savedArticles.length === 0 ? (
                    <Text color="gray.500">Még nem mentettél cikket!</Text>
                ) : (
                    <Grid
                        templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
                        gap={6}
                    >
                        {savedArticles.map((article) => (
                            <Box
                                key={article.id}
                                borderWidth="1px"
                                borderRadius="lg"
                                overflow="hidden"
                                transition="transform 0.2s"
                                _hover={{
                                    transform: 'translateY(-5px)',
                                    boxShadow: 'lg'
                                }}
                            >
                                {article.img_path && (
                                    <Image
                                        src={`/${article.img_path}`}
                                        alt={article.title}
                                        height="200px"
                                        width="100%"
                                        objectFit="cover"
                                    />
                                )}
                                <VStack align="stretch" p={4} spacing={3}>
                                    <Heading size="md">{article.title}</Heading>
                                    <Text fontSize="sm" color="gray.500">
                                        By {article.username || 'Unknown Author'}
                                    </Text>
                                    <Text color="gray.600">
                                        {article.content.substring(0, 150)}...
                                    </Text>
                                    <Text fontSize="xs" color="gray.400">
                                        Mentve ezen a dátumon: {new Date(article.savedAt).toLocaleDateString()}
                                    </Text>
                                </VStack>
                            </Box>
                        ))}
                    </Grid>
                )}
            </Box>
        </Container>
    );
};

export default SavedArticles;