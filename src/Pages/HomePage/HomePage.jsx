// import { useState } from "react";
// import { Box, Container, Flex, IconButton, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Input, Button } from "@chakra-ui/react";
// import { AiOutlineMessage } from "react-icons/ai";
// import FeedPosts from "../../Components/FeedPosts/FeedPosts.jsx";
// import Suggestions from "../../Components/Suggestions/Suggestions.jsx";
//
// const HomePage = () => {
//     const [isChatOpen, setIsChatOpen] = useState(false);
//
//     const openChat = () => {
//         setIsChatOpen(true);
//     };
//
//     const closeChat = () => {
//         setIsChatOpen(false);
//     };
//
//     const [typing, setTyping] = useState(false);
//
//
//     return (
//         <Container maxW={"container.lg"}>
//             <Flex gap={20}>
//                 <Box flex={2} py={10}>
//                     <FeedPosts />
//                 </Box>
//                 <Box flex={3} mr={20} display={{ base: "none", lg: "block" }} maxW={"300px"}>
//                     <Suggestions />
//                 </Box>
//             </Flex>
//             <Box
//                 position="fixed"
//                 bottom="20px"
//                 right="20px"
//                 zIndex="999"
//             >
//                 <IconButton
//                     bg="blue.500"
//                     color="white"
//                     borderRadius="full"
//                     p={3}
//                     aria-label="Open Chat"
//                     icon={<AiOutlineMessage size={24} />}
//                     onClick={openChat}
//                 />
//             </Box>
//             <Modal isOpen={isChatOpen} onClose={closeChat} size="md" blockScrollOnMount={false}>
//                 <ModalOverlay />
//                 <ModalContent borderRadius="md">
//                     <ModalHeader>Beszélgess Želimirrel! (AI)</ModalHeader>
//                     <ModalCloseButton />
//                     <ModalBody>
//                         <Box height="300px" overflowY="scroll">
//                             <Box bg="blue.100" p={2} mb={2} borderRadius="md" color={"black"}>
//                                 <strong>Želimir:</strong> Üdv az oldalon, Želimir vagyok, miben segíthetek?
//                             </Box>
//                         </Box>
//                         <Flex mt={4}>
//                             <Input placeholder="Írj üzenetet..." flex="1" mr={2} />
//                             <Button colorScheme="blue">Küldés</Button>
//                         </Flex>
//                     </ModalBody>
//                 </ModalContent>
//             </Modal>
//         </Container>
//     );
// };
//
// export default HomePage;
//
//
import { useState } from "react";
import { Box, Container, Flex, IconButton, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Input, Button } from "@chakra-ui/react";
import { AiOutlineMessage } from "react-icons/ai";
import axios from "axios"; // Import Axios for making HTTP requests
import FeedPosts from "../../Components/FeedPosts/FeedPosts.jsx";
import Suggestions from "../../Components/Suggestions/Suggestions.jsx";

const HomePage = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [chatHistory, setChatHistory] = useState([]);
    const [message, setMessage] = useState("");

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

            // Prepare the messages array for the ChatGPT API
            const messages = [
                ...chatHistory.map(chat => ({
                    role: chat.isUser ? "user" : "assistant",
                    content: chat.message
                })),
                { role: "user", content: message }
            ];

            // Make a POST request to the ChatGPT API
            const response = await axios.post(
                "https://api.openai.com/v1/chat/completions",
                {
                    model: "gpt-3.5-turbo-0125", // Általam használt modell
                    messages: messages,
                    max_tokens: 100
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer sk-proj-zp9hNBGMB2l0MIwgtVkFT3BlbkFJYXt8I62zekUlmLx80JaL" // Replace with your API key
                    }
                }
            );

            const responseData = response.data.choices[0].message.content;
            console.log(response);
            setChatHistory(prevHistory => [...prevHistory, { message, isUser: true }, { message: responseData, isUser: false }]);
            setMessage("");
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    return (
        <Container maxW={"container.lg"}>
            <Flex gap={20}>
                <Box flex={2} py={10}>
                    <FeedPosts />
                </Box>
                <Box flex={3} mr={20} display={{ base: "none", lg: "block" }} maxW={"300px"}>
                    <Suggestions />
                </Box>
            </Flex>
            <Box
                position="fixed"
                bottom="20px"
                right="20px"
                zIndex="999"
            >
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
            <Modal isOpen={isChatOpen} onClose={closeChat} size="md" blockScrollOnMount={false}>
                <ModalOverlay />
                <ModalContent borderRadius="md">
                    <ModalHeader>Beszélgess Želimirrel! (AI)</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Box height="300px" overflowY="scroll">
                            {chatHistory.map((chat, index) => (
                                <Box key={index} bg={chat.isUser ? "blue.100" : "gray.100"} p={2} mb={2} borderRadius="md" color={chat.isUser ? "black" : "black"}>
                                    {chat.message}
                                </Box>
                            ))}
                        </Box>
                        <Flex mt={4}>
                            <Input
                                placeholder="Írj üzenetet..."
                                flex="1"
                                mr={2}
                                value={message}
                                onChange={handleChange}
                                onKeyDown={(e) => { if (e.key === 'Enter') sendMessage() }}
                            />
                            <Button colorScheme="blue" onClick={sendMessage}>Küldés</Button>
                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Container>
    );
};

export default HomePage;


