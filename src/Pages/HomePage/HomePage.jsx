import React, { useState } from "react";
import { Box, Container, Flex, IconButton, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Input, Button, Heading, Center, useColorMode } from "@chakra-ui/react";
import { AiOutlineMessage } from "react-icons/ai";
import axios from "axios";
import FeedPosts from "../../Components/FeedPosts/FeedPosts.jsx";
import Suggestions from "../../Components/Suggestions/Suggestions.jsx";

const HomePage = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [chatHistory, setChatHistory] = useState([]);
    const [message, setMessage] = useState("");
    const { colorMode } = useColorMode();

    const openChat = () => {
        setIsChatOpen(true);
    };

    const closeChat = () => {
        setIsChatOpen(false);
    };

    const handleChange = (event) => {
        setMessage(event.target.value);
    };

    const sendMessage = async () => {
        if (!message) return;

        try {
            const messages = [
                { 
                    role: "system", 
                    content: "Te egy edzéssel és sporttal foglalkozó weboldal AI-asszisztense vagy. Csak az edzéssel, sporttal, táplálkozással és általános egészséggel kapcsolatos kérdésekre válaszolj. Ha a felhasználók ettől eltérő kérdéseket tesznek fel, udvariasan tájékoztasd őket arról, hogy csak a fitnesz és sport témákkal kapcsolatos kérdésekben tudsz segíteni. Tartsd a válaszokat tömören és gyakorlatiasan."
                },
                ...chatHistory.map(chat => ({
                    role: chat.isUser ? "user" : "assistant",
                    content: chat.message
                })),
                { role: "user", content: message }
            ];

            const response = await axios.post(
                "https://api.openai.com/v1/chat/completions",
                {
                    model: "gpt-3.5-turbo-0125",
                    messages: messages,
                    max_tokens: 50,
                    temperature: 0.7
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer API-KEY"
                    }
                }
            );

            const responseData = response.data.choices[0].message.content;
            setChatHistory(prevHistory => [...prevHistory, { message, isUser: true }, { message: responseData, isUser: false }]);
            setMessage("");
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault(); // Prevent default to avoid new line in textarea
            sendMessage();
        }
    };

    return (
        <Container maxW="95vw" p={0}>
            <Flex direction="column">
                <Box w="full">
                    <Suggestions />
                </Box>
                <Center py={8}>
                    <Heading
                        fontSize="4xl"
                        fontWeight="bold"
                        color={colorMode === "dark" ? "white" : "black"}
                        letterSpacing="wide"
                    >
                        LiftWise
                    </Heading>
                </Center>
                <Box w="full">
                    <FeedPosts />
                </Box>
            </Flex>
            <Box position="fixed" bottom="20px" right="20px" zIndex="999">
                <IconButton
                    bg="blue.500"
                    color="white"
                    borderRadius="full"
                    p={3}
                    aria-label="Open Chat"
                    icon={<AiOutlineMessage size={24} />}
                    onClick={openChat}
                />
            </Box>
            <Modal isOpen={isChatOpen} onClose={closeChat} size="md">
                <ModalOverlay />
                <ModalContent maxW="600px" h="600px">
                    <ModalHeader>Beszélgess Robival! (AI)</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody 
                        display="flex" 
                        flexDirection="column" 
                        h="calc(100% - 60px)"
                        pb={4}
                    >
                        <Box 
                            flex="1"
                            overflowY="auto"
                            mb={4}
                            p={2}
                            css={{
                                '&::-webkit-scrollbar': {
                                    width: '8px',
                                },
                                '&::-webkit-scrollbar-track': {
                                    background: '#f1f1f1',
                                },
                                '&::-webkit-scrollbar-thumb': {
                                    background: '#888',
                                    borderRadius: '4px',
                                },
                            }}
                        >
                            {chatHistory.map((chat, index) => (
                                <Flex 
                                    key={index} 
                                    justifyContent={chat.isUser ? "flex-end" : "flex-start"}
                                    mb={4}
                                    width="100%"
                                >
                                    <Box
                                        bg={chat.isUser ? "blue.100" : "gray.100"}
                                        p={6}
                                        borderRadius="lg"
                                        color="black"
                                        whiteSpace="pre-wrap"
                                        wordBreak="break-word"
                                        boxShadow="sm"
                                        minW="300px"
                                        maxW="90%"
                                        overflow="visible"
                                        sx={{
                                            wordWrap: "break-word",
                                            overflowWrap: "break-word",
                                            height: "fit-content",
                                            minHeight: "min-content"
                                        }}
                                    >
                                        {chat.message}
                                    </Box>
                                </Flex>
                            ))}
                        </Box>
                        <Box>
                            <Flex>
                                <Input
                                    placeholder="Írj üzenetet..."
                                    flex="1"
                                    mr={2}
                                    value={message}
                                    onChange={handleChange}
                                    onKeyDown={handleKeyDown}
                                />
                                <Button colorScheme="blue" onClick={sendMessage}>Küldés</Button>
                            </Flex>
                        </Box>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Container>
    );
};

export default HomePage;
