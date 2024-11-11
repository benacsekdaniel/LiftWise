import React, { useState, useEffect } from 'react';
import { Box, Grid, Heading, Text, Image, VStack } from '@chakra-ui/react';
import { getAllArticles } from '../../services/articleService';

const ArticleSearchPage = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const fetchedArticles = await getAllArticles();
                setArticles(fetchedArticles);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch articles');
                setLoading(false);
            }
        };

        fetchArticles();
    }, []);

    if (loading) return <Box>Loading...</Box>;
    if (error) return <Box>{error}</Box>;

    return (
        <Box p={5}>
            <Heading mb={6}>Cikkek Keresése</Heading>
            <Grid
                templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
                gap={6}
            >
                {articles.map((article) => (
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
                        </VStack>
                    </Box>
                ))}
            </Grid>
        </Box>
    );
};

export default ArticleSearchPage;
