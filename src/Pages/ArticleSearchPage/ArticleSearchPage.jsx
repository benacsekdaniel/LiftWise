import React, { useState, useEffect } from 'react';
import { Box, Grid, Heading, Text, Image, VStack, Input, InputGroup, InputLeftElement, Container } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { getAllArticles } from '../../services/articleService';
import ArticleModal from '../../Components/Article/ArticleModal';

const ArticleSearchPage = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedArticle, setSelectedArticle] = useState(null);

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

    // Filter articles based on search query
    const filteredArticles = articles.filter(article =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) return <Box p={5}>Loading...</Box>;
    if (error) return <Box p={5}>{error}</Box>;

    return (
        <Container maxW="95vw">
            <Box p={5}>
                <Heading mb={6}>Cikkek Keresése</Heading>
                
                {/* Updated Search Input */}
                <InputGroup mb={8}>
                    <InputLeftElement pointerEvents='none'>
                        <SearchIcon color='gray.400' />
                    </InputLeftElement>
                    <Input
                        placeholder='Írj be egy cikk címet a kereséshez...'
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        size="lg"
                        variant="filled"
                        bg="gray.800"
                        color="white"
                        _placeholder={{ 
                            color: 'gray.400',
                            fontSize: 'md'
                        }}
                        _hover={{
                            bg: "gray.700"
                        }}
                        _focus={{
                            bg: "gray.800",
                            borderColor: "blue.500"
                        }}
                    />
                </InputGroup>

                {filteredArticles.length === 0 ? (
                    <Text color="gray.500">Nincs találat a keresési feltételeknek megfelelően.</Text>
                ) : (
                    <Grid
                        templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
                        gap={6}
                    >
                        {filteredArticles.map((article) => (
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
                                cursor="pointer"
                                onClick={() => setSelectedArticle(article)}
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
                )}
            </Box>

            <ArticleModal 
                isOpen={!!selectedArticle} 
                onClose={() => setSelectedArticle(null)} 
                article={selectedArticle}
            />
        </Container>
    );
};

export default ArticleSearchPage;
