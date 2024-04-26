// import React from 'react';
// import { Flex, Text, Box, Button, Avatar } from '@chakra-ui/react';
//
// const ProfileBody = () => {
//     return (
//         <Flex direction="column" alignItems="center" justifyContent="flex-start" minHeight="100vh" p={4}>
//             {/* Personal Information */}
//             <Box borderWidth="1px" borderRadius="md" p={4} mb={8} w="100%">
//                 Személyes adatok:<br/>
//                 <Text fontSize={"sm"} as="span" fontWeight="bold">Magasság:</Text> 182cm.<br/>
//                 <Text fontSize={"sm"} as="span" fontWeight="bold">Testsúly:</Text> 93kg.<br/>
//                 <Text fontSize={"sm"} as="span" fontWeight="bold">Diéta kezdete:</Text> 2020.01.01.<br/>
//                 <Text fontSize={"sm"} as="span" fontWeight="bold">Kor:</Text> 22 év<br/>
//                 <Text fontSize={"sm"} as="span" fontWeight="bold">E-mail cím: </Text>liftwiseusertemp@gmail.com<br/>
//             </Box>
//             {/* Recent Activity */}
//             <Box borderWidth="1px" borderRadius="md" p={4} mb={8} w="100%">
//                 <Text fontSize="lg" fontWeight="bold" mb={2}>Recent Activity</Text>
//                 <Text fontSize="md">Kommentelt egy cikk alá!</Text>
//                 <Text fontSize="md">Elmentett egy cikket!</Text>
//             </Box>
//             {/* Button for accessing saved posts */}
//             <Button colorScheme="blue" size="sm">Saved Posts</Button>
//         </Flex>
//     );
// };
//
// export default ProfileBody;

import React, { useState } from 'react';
import { Flex, Text, Box, Button, Avatar, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton } from '@chakra-ui/react';

const ProfileBody = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpenModal = () => {
        setIsOpen(true);
    };

    const handleCloseModal = () => {
        setIsOpen(false);
    };

    return (
        <Flex direction="column" alignItems="center" justifyContent="flex-start" minHeight="100vh" p={4}>
            {/* Personal Information */}
            <Box borderWidth="1px" borderRadius="md" p={4} mb={8} w="100%">
                Személyes adatok:<br/>
                <Text fontSize="sm" as="span" fontWeight="bold">Magasság:</Text> 182cm.<br/>
                <Text fontSize="sm" as="span" fontWeight="bold">Testsúly:</Text> 93kg.<br/>
                <Text fontSize="sm" as="span" fontWeight="bold">Diéta kezdete:</Text> 2020.01.01.<br/>
                <Text fontSize="sm" as="span" fontWeight="bold">Kor:</Text> 22 év<br/>
                <Text fontSize="sm" as="span" fontWeight="bold">E-mail cím: </Text>liftwiseusertemp@gmail.com<br/>
            </Box>
            {/* Recent Activity */}
            <Box borderWidth="1px" borderRadius="md" p={4} mb={8} w="100%">
                <Text fontSize="lg" fontWeight="bold" mb={2}>Recent Activity</Text>
                <Text fontSize="md">Kommentelt egy cikk alá!</Text>
                <Text fontSize="md">Elmentett egy cikket!</Text>
            </Box>
            {/* Button for accessing saved posts */}
            <Button colorScheme="blue" size="sm" onClick={handleOpenModal}>Saved Posts</Button>

            {/* Modal for greeting when visiting "elmentett cikkek" page */}
            <Modal isOpen={isOpen} onClose={handleCloseModal} size="full">
                <ModalOverlay />
                <ModalContent
                    width="60%"
                    height="50%"
                    margin="auto"
                    borderRadius="xl"
                    boxShadow="lg"
                    bg="#7CB9E8"
                    p={4}
                >
                    <ModalHeader>Elmentett cikkek</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        Üdvözlünk a "Elmentett cikkek" oldalon!
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Flex>
    );
};

export default ProfileBody;



