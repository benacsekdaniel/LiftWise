import { Container } from "@chakra-ui/react";
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

    if (loading) return <Container maxW={"container.sm"} py={10} px={2}>Loading...</Container>;

    return (
        <Container maxW={"container.sm"} py={10} px={2}>
            {articles.map((article) => (
                <FeedPost 
                    key={article.id}
                    articleId={article.id}
                    username={article.username}
                    img={article.img_path}
                    avatar='LWBIG.png'
                    content={article.content}
                />
            ))}
        </Container>
    );
}

export default FeedPosts;