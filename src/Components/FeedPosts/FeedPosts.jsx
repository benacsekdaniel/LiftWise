import { Container, Grid } from "@chakra-ui/react";
import FeedPost from "./FeedPost.jsx";
import { useState, useEffect } from 'react';
import { getAllArticles } from '../../services/articleService';

const FeedPosts = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const fetchedArticles = await getAllArticles();
                setArticles(fetchedArticles);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching articles:", error);
                setLoading(false);
            }
        };

        fetchArticles();
    }, []);

    if (loading) return <Container maxW="full" py={10}>Loading...</Container>;

    return (
        <Container maxW="full" py={10} px={4}>
            <Grid 
                templateColumns="repeat(2, 1fr)" 
                gap={8} 
                mx="auto"
                maxW="1400px"
            >
                {articles.map((article) => (
                    <FeedPost 
                        key={article.id}
                        articleId={article.id}
                        username={article.username}
                        img={article.img_path}
                        avatar='LWBIG.png'
                        content={article.content}
                        title={article.title}
                    />
                ))}
            </Grid>
        </Container>
    );
}

export default FeedPosts;