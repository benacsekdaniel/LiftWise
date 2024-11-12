import React, { useState, useEffect } from 'react';
import { 
    Box, 
    Container, 
    Heading, 
    Grid, 
    Text, 
    VStack, 
    Image, 
    Button,
    Input,
    Textarea,
    useToast,
    Flex,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
} from '@chakra-ui/react';
import { getArticlesByAuthor, updateArticle, deleteArticle } from '../../services/articleService';

function ArticleEditing() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({
        title: '',
        content: ''
    });
    const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
    const [isCancelAlertOpen, setIsCancelAlertOpen] = useState(false);
    const [articleToDelete, setArticleToDelete] = useState(null);
    const cancelRef = React.useRef();
    const toast = useToast();

    useEffect(() => {
        const fetchMyArticles = async () => {
            try {
                const userInfo = JSON.parse(localStorage.getItem('user-info'));
                if (!userInfo) {
                    setError('Please log in to view your articles');
                    setLoading(false);
                    return;
                }

                const fetchedArticles = await getArticlesByAuthor(userInfo.uid);
                setArticles(fetchedArticles);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching articles:', err);
                setError('Failed to fetch your articles');
                setLoading(false);
            }
        };

        fetchMyArticles();
    }, []);

    const handleEditClick = (article) => {
        setEditingId(article.id);
        setEditForm({
            title: article.title,
            content: article.content
        });
    };

    const handleCancelEditClick = () => {
        if (editForm.title !== articles.find(a => a.id === editingId)?.title ||
            editForm.content !== articles.find(a => a.id === editingId)?.content) {
            setIsCancelAlertOpen(true);
        } else {
            handleCancelEdit();
        }
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setEditForm({ title: '', content: '' });
        setIsCancelAlertOpen(false);
    };

    const handleSaveEdit = async (articleId) => {
        try {
            await updateArticle(articleId, {
                title: editForm.title,
                content: editForm.content
            });

            // Update local state
            setArticles(prevArticles => 
                prevArticles.map(article => 
                    article.id === articleId 
                        ? { ...article, ...editForm }
                        : article
                )
            );

            setEditingId(null);
            setEditForm({ title: '', content: '' });

            toast({
                title: "Sikeres mentés!",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: "Hiba történt a mentés során",
                description: error.message,
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const handleDeleteClick = (article) => {
        setArticleToDelete(article);
        setIsDeleteAlertOpen(true);
    };

    const handleDelete = async () => {
        if (!articleToDelete) return;

        try {
            await deleteArticle(articleToDelete.id);
            setArticles(prevArticles => 
                prevArticles.filter(article => article.id !== articleToDelete.id)
            );
            toast({
                title: "Cikk törölve!",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: "Hiba történt a törlés során",
                description: error.message,
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setIsDeleteAlertOpen(false);
            setArticleToDelete(null);
        }
    };

    if (loading) return <Container maxW="95vw"><Box p={5}>Loading...</Box></Container>;
    if (error) return <Container maxW="95vw"><Box p={5}>{error}</Box></Container>;

    return (
        <Container maxW="95vw" py={8}>
            <Box>
                <Heading mb={6}>Cikkek szerkesztése</Heading>
                {articles.length === 0 ? (
                    <Text color="gray.500">Még nem hoztál létre cikket!</Text>
                ) : (
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
                                p={4}
                                transition="transform 0.2s"
                                _hover={{
                                    transform: 'translateY(-4px)',
                                    boxShadow: 'lg'
                                }}
                            >
                                {article.img_path && (
                                    <Box mb={4}>
                                        <Image
                                            src={`/${article.img_path}`}
                                            alt={article.title}
                                            height="200px"
                                            width="100%"
                                            objectFit="cover"
                                            borderRadius="md"
                                        />
                                    </Box>
                                )}
                                <VStack align="stretch" spacing={3}>
                                    {editingId === article.id ? (
                                        <>
                                            <Input
                                                value={editForm.title}
                                                onChange={(e) => setEditForm(prev => ({
                                                    ...prev,
                                                    title: e.target.value
                                                }))}
                                                placeholder="Cikk címe"
                                                size="md"
                                            />
                                            <Textarea
                                                value={editForm.content}
                                                onChange={(e) => setEditForm(prev => ({
                                                    ...prev,
                                                    content: e.target.value
                                                }))}
                                                placeholder="Cikk tartalma"
                                                size="md"
                                                minH="150px"
                                            />
                                            <Flex gap={2} justify="flex-end">
                                                <Button
                                                    size="sm"
                                                    onClick={handleCancelEditClick}
                                                >
                                                    Mégse
                                                </Button>
                                                <Button
                                                    colorScheme="blue"
                                                    size="sm"
                                                    onClick={() => handleSaveEdit(article.id)}
                                                >
                                                    Mentés
                                                </Button>
                                            </Flex>
                                        </>
                                    ) : (
                                        <>
                                            <Heading size="md">{article.title}</Heading>
                                            <Text fontSize="sm" color="gray.500">
                                                Szerző: {article.username || 'Unknown Author'}
                                            </Text>
                                            <Text color="gray.600" noOfLines={3}>
                                                {article.content}
                                            </Text>
                                            <Flex gap={2}>
                                                <Button
                                                    colorScheme="blue"
                                                    onClick={() => handleEditClick(article)}
                                                    size="sm"
                                                    flex="1"
                                                >
                                                    Szerkesztés
                                                </Button>
                                                <Button
                                                    colorScheme="red"
                                                    onClick={() => handleDeleteClick(article)}
                                                    size="sm"
                                                    flex="1"
                                                >
                                                    Törlés
                                                </Button>
                                            </Flex>
                                        </>
                                    )}
                                </VStack>
                            </Box>
                        ))}
                    </Grid>
                )}
            </Box>

            {/* Cancel Confirmation Dialog */}
            <AlertDialog
                isOpen={isCancelAlertOpen}
                leastDestructiveRef={cancelRef}
                onClose={() => setIsCancelAlertOpen(false)}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Szerkesztés megszakítása
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Biztosan megszakítod a szerkesztést? A nem mentett változtatások elvesznek.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={() => setIsCancelAlertOpen(false)}>
                                Folytatás
                            </Button>
                            <Button colorScheme="red" onClick={handleCancelEdit} ml={3}>
                                Megszakítás
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>

            {/* Delete Confirmation Dialog */}
            <AlertDialog
                isOpen={isDeleteAlertOpen}
                leastDestructiveRef={cancelRef}
                onClose={() => setIsDeleteAlertOpen(false)}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Cikk törlése
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Biztosan törölni szeretnéd ezt a cikket? Ezt a műveletet nem lehet visszavonni.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={() => setIsDeleteAlertOpen(false)}>
                                Mégse
                            </Button>
                            <Button colorScheme="red" onClick={handleDelete} ml={3}>
                                Törlés
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </Container>
    );
}

export default ArticleEditing;