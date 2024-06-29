import React from 'react';
import { Container, Flex, Textarea, Button, Text, Input, Box } from '@chakra-ui/react';
import { AiOutlinePlusCircle } from 'react-icons/ai';

const CreatePost = () => {
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
                />

                <Textarea
                    placeholder="Írd ide a cikk tartalmát..."
                    size="lg"
                    resize="none"
                    height="200px"
                    width="80%"
                    mb={2}
                    mx="auto"
                />

                <Box position="relative" width="80%" mx="auto" mb={4}>
                    <Input type="file" accept="image/*" opacity="0" position="absolute" zIndex="-1" /> {/* Hide default input */}
                    <Button
                        as="label" // Use label as the button
                        htmlFor="upload-button"
                        colorScheme="teal"
                        cursor="pointer"
                        borderRadius="md"
                        border="2px solid transparent"
                        _hover={{ borderColor: 'teal.500' }}
                        _focus={{ outline: 'none' }}
                        transition="border-color 0.3s"
                        width="100%"
                        height="48px"
                    >
                        Kép feltöltése!
                    </Button>
                </Box>

                <Flex justifyContent="center">
                    <Button colorScheme="green" size="lg">
                        Cikk közzététele!
                    </Button>
                </Flex>
            </Container>
        </Flex>
    );
};

export default CreatePost;
