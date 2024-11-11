import React, { useState, useEffect } from 'react';
import { Flex, Text, Box, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, Input, FormControl, FormLabel, Textarea } from '@chakra-ui/react';
import { doc, updateDoc } from 'firebase/firestore';
import { firestore } from '../../firebase/firebase';

const ProfileBody = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    const [formData, setFormData] = useState({
        height: '',
        weight: '',
        city: '',
        fullName: '',
        bio: ''
    });
    const [isLoading, setIsLoading] = useState(false);

    // Load user info from local storage on component mount
    useEffect(() => {
        const storedUserInfo = JSON.parse(localStorage.getItem("user-info"));
        if (storedUserInfo) {
            setUserInfo(storedUserInfo);
            // Initialize form data with current user info
            setFormData({
                height: storedUserInfo.height || '',
                weight: storedUserInfo.weight || '',
                city: storedUserInfo.city || '',
                fullName: storedUserInfo.fullName || '',
                bio: storedUserInfo.bio || ''
            });
        }
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async () => {
        try {
            setIsLoading(true);
            const userDocRef = doc(firestore, "users", userInfo.uid);
            
            // Update Firestore
            await updateDoc(userDocRef, formData);
            
            // Update local storage
            const updatedUserInfo = {
                ...userInfo,
                ...formData
            };
            localStorage.setItem("user-info", JSON.stringify(updatedUserInfo));
            setUserInfo(updatedUserInfo);
            
            handleCloseModal();
            alert('Profil sikeresen frissítve!');
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Hiba történt a profil frissítésekor!');
        } finally {
            setIsLoading(false);
        }
    };

    const handleOpenModal = () => {
        setIsOpen(true);
    };

    const handleCloseModal = () => {
        setIsOpen(false);
    };

    if (!userInfo) return null; // Show nothing if user info is not available

    return (
        <Flex direction="column" alignItems="center" justifyContent="flex-start" minHeight="100vh" p={4}>
            {/* Personal Information */}
            <Box borderWidth="1px" borderRadius="md" p={4} mb={8} w="100%">
                Személyes adatok:<br/>
                <Text fontSize="sm" as="span" fontWeight="bold">Magasság:</Text> {userInfo.height} cm<br/>
                <Text fontSize="sm" as="span" fontWeight="bold">Testsúly:</Text> {userInfo.weight} kg<br/>
                <Text fontSize="sm" as="span" fontWeight="bold">Születési év:</Text> {new Date(userInfo.birthday.seconds * 1000).toLocaleDateString()}<br/>
                <Text fontSize="sm" as="span" fontWeight="bold">Kor:</Text> {new Date().getFullYear() - new Date(userInfo.birthday.seconds * 1000).getFullYear()} év<br/>
                <Text fontSize="sm" as="span" fontWeight="bold">Város:</Text> {userInfo.city}<br/>
                <Text fontSize="sm" as="span" fontWeight="bold">Teljes név:</Text> {userInfo.fullName}<br/>
            </Box>
            
            <Button colorScheme="blue" size="sm" onClick={handleOpenModal}>
                Profil módosítása
            </Button>

            <Modal isOpen={isOpen} onClose={handleCloseModal} size="xl">
                <ModalOverlay />
                <ModalContent p={6}>
                    <ModalHeader>Profil szerkesztése</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl mb={4}>
                            <FormLabel>Magasság (cm)</FormLabel>
                            <Input
                                name="height"
                                type="number"
                                value={formData.height}
                                onChange={handleInputChange}
                            />
                        </FormControl>

                        <FormControl mb={4}>
                            <FormLabel>Testsúly (kg)</FormLabel>
                            <Input
                                name="weight"
                                type="number"
                                value={formData.weight}
                                onChange={handleInputChange}
                            />
                        </FormControl>

                        <FormControl mb={4}>
                            <FormLabel>Város</FormLabel>
                            <Input
                                name="city"
                                value={formData.city}
                                onChange={handleInputChange}
                            />
                        </FormControl>

                        <FormControl mb={4}>
                            <FormLabel>Teljes név</FormLabel>
                            <Input
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleInputChange}
                            />
                        </FormControl>

                        <FormControl mb={4}>
                            <FormLabel>Bio</FormLabel>
                            <Textarea
                                name="bio"
                                value={formData.bio}
                                onChange={handleInputChange}
                                resize="vertical"
                            />
                        </FormControl>

                        <Flex gap={2} justifyContent="flex-end">
                            <Button onClick={handleCloseModal}>
                                Mégse
                            </Button>
                            <Button
                                colorScheme="blue"
                                onClick={handleSubmit}
                                isLoading={isLoading}
                            >
                                Mentés
                            </Button>
                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Flex>
    );
};

export default ProfileBody;