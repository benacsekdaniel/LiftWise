import { 
    Modal, 
    ModalOverlay, 
    ModalContent, 
    ModalHeader, 
    ModalCloseButton, 
    ModalBody, 
    Image, 
    Text, 
    VStack,
    Input,
    Textarea,
    Button,
    Flex,
    useToast
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { updateArticle } from "../../services/articleService";

const ArticleModal = ({ isOpen, onClose, article, isEditing = false, onArticleUpdate }) => {
    const [editMode, setEditMode] = useState(false);
    const [editedTitle, setEditedTitle] = useState('');
    const [editedContent, setEditedContent] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();

    useEffect(() => {
        if (article) {
            setEditedTitle(article.title);
            setEditedContent(article.content);
        }
    }, [article]);

    const handleSave = async () => {
        try {
            setIsLoading(true);
            await updateArticle(article.id, {
                title: editedTitle,
                content: editedContent,
            });
            
            if (onArticleUpdate) {
                onArticleUpdate({
                    ...article,
                    title: editedTitle,
                    content: editedContent,
                });
            }

            setEditMode(false);
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
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        setEditMode(false);
        onClose();
    };

    if (!article) return null;

    return (
        <Modal isOpen={isOpen} onClose={handleClose} size="xl">
            <ModalOverlay />
            <ModalContent maxW="800px">
                <ModalHeader>
                    {editMode ? (
                        <Input
                            value={editedTitle}
                            onChange={(e) => setEditedTitle(e.target.value)}
                            placeholder="Cikk címe"
                            size="lg"
                            fontWeight="bold"
                        />
                    ) : (
                        article.title
                    )}
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <VStack spacing={4} align="stretch">
                        {article.img_path && (
                            <Image
                                src={`/${article.img_path}`}
                                alt={article.title}
                                width="100%"
                                height="400px"
                                objectFit="cover"
                                borderRadius="md"
                            />
                        )}
                        <Text fontSize="sm" color="gray.500">
                            Szerző: {article.username || 'Unknown Author'}
                        </Text>
                        {editMode ? (
                            <Textarea
                                value={editedContent}
                                onChange={(e) => setEditedContent(e.target.value)}
                                placeholder="Cikk tartalma"
                                size="md"
                                minH="200px"
                            />
                        ) : (
                            <Text whiteSpace="pre-wrap">
                                {article.content}
                            </Text>
                        )}
                        
                        {isEditing && (
                            <Flex gap={2} justifyContent="flex-end">
                                {editMode ? (
                                    <>
                                        <Button
                                            onClick={() => setEditMode(false)}
                                            variant="ghost"
                                        >
                                            Mégse
                                        </Button>
                                        <Button
                                            colorScheme="blue"
                                            onClick={handleSave}
                                            isLoading={isLoading}
                                        >
                                            Mentés
                                        </Button>
                                    </>
                                ) : (
                                    <Button
                                        colorScheme="blue"
                                        onClick={() => setEditMode(true)}
                                    >
                                        Szerkesztés
                                    </Button>
                                )}
                            </Flex>
                        )}
                    </VStack>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default ArticleModal; 