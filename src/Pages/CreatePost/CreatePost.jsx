import React, { useState } from 'react';
import { Container, Flex, Textarea, Button, Text, Input, Box, Select, useToast } from '@chakra-ui/react';
import { createArticle } from '../../services/articleService.js'; // Adjust the import path based on your project structure

const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [imgPath, setImgPath] = useState('');
    const toast = useToast();

    const availableImages = [
        { file: 'exercising1.jpg', display: 'Plank' },
        { file: 'exercising2.jpg', display: 'Fekvenyomás' },
        { file: 'exercising3.jpg', display: 'Fekvenyomás - döntött' },
        { file: 'healthy1.jpg', display: 'Zöldségek' },
        { file: 'healthy2.jpg', display: 'Kiegyensúlyozott étkezés' },
        { file: 'healthy3.jpg', display: 'Pisztráng' },
        { file: 'healthylife.jpg', display: 'Körforgás' },
        { file: 'deadlift.jpeg', display: 'Felhúzás' },
        { file: 'benchpress.jpg', display: 'Bench Press - fekvenyomás' },
        { file: 'bicepcurl.jpg', display: 'Bicepszhajlíás' },
        { file: 'squat.jpg', display: 'Guggolás' },
    ];

    // Handle form submission to create a new article
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const userInfo = JSON.parse(localStorage.getItem('user-info'));
        
        if (!userInfo) {
            alert('You must be logged in to create a post!');
            return;
        }

        // Create an article object with author field and username
        const articleData = {
            title,
            content,
            img_path: imgPath,
            author: userInfo.uid,
            username: userInfo.username,
            createdAt: new Date().toISOString()
        };

        try {
            await createArticle(articleData);
            setTitle('');
            setContent('');
            setImgPath('');
            alert('Cikk sikeresen közzétéve!');
        } catch (error) {
            toast({
                title: "Hiba!",
                description: error.message,
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    };

    return (
        <Flex flexDirection="column" minH="100vh" alignItems="center">
            <Container maxW="container.lg" py={5} flex="1" textAlign="center">
                <Text fontSize="4xl" mb={4}>Új cikk létrehozása</Text>
                <Textarea
                    placeholder="Írd be a cikk címét..."
                    size="md"
                    resize="none"
                    mb={2}
                    width="80%"
                    mx="auto"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)} // Update title state
                />

                <Textarea
                    placeholder="Írd ide a cikk tartalmát..."
                    size="lg"
                    resize="none"
                    height="200px"
                    width="80%"
                    mb={2}
                    mx="auto"
                    value={content}
                    onChange={(e) => setContent(e.target.value)} // Update content state
                />

                <Box width="80%" mx="auto" mb={4}>
                    <Select
                        placeholder="Válassz képet"
                        value={imgPath}
                        onChange={(e) => setImgPath(e.target.value)}
                    >
                        {availableImages.map((img) => (
                            <option key={img.file} value={img.file}>
                                {img.display}
                            </option>
                        ))}
                    </Select>
                </Box>

                {/* Preview selected image */}
                {imgPath && (
                    <Box width="80%" mx="auto" mb={4}>
                        <img 
                            src={`/${imgPath}`} 
                            alt="Selected preview" 
                            style={{ maxHeight: '200px', margin: '0 auto' }}
                        />
                    </Box>
                )}

                <Flex justifyContent="center">
                    <Button colorScheme="green" size="lg" onClick={handleSubmit}>
                        Cikk közzététele!
                    </Button>
                </Flex>
            </Container>
        </Flex>
    );
};

export default CreatePost;
