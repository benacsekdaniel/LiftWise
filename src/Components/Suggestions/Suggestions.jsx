import SuggestedHeader from "./SuggestedHeader.jsx";
import Suggestion from "./Suggestion.jsx";
import { Button, Flex, Text, VStack, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Image, Stack } from "@chakra-ui/react";
import { useState } from "react";

const Suggestions = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleOpen = () => {
        setIsOpen(true);
    };

    return (
        <VStack py={8} px={6} gap={4}>
            <SuggestedHeader />
            <Flex alignItems={"center"} justifyContent={"space-between"} w={"full"}>
                <Text fontSize={12} fontWeight={"bold"} color={"gray.500"} marginRight={10}>
                    Ajánlott olvasmány!
                </Text>
                <Button fontSize={12} fontWeight={"bold"} color={"white"} bg={"blue.500"} _hover={{ bg: "blue.600" }} onClick={handleOpen}>
                    Összes megtekintése!
                </Button>
            </Flex>

            <Suggestion name='Egészséges ételek' link='https://www.ucsfhealth.org/education/top-ten-foods-for-health' />
            <Suggestion name='Egészséges életmód' link='https://ecofamily.hu/cikkek/egeszseges-eletmod' />
            <Suggestion name='Helyes edzésforma' link='https://n1.training/exercise-execution-definition/' />

            <Modal isOpen={isOpen} onClose={handleClose} size="3xl">
                <ModalOverlay />
                <ModalContent bg={"blue.100"} w="80%" h="90%" color={"black"}>
                    <ModalHeader>Az összes életvitelváltásról szóló cikk itt található!</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody overflowY="auto">
                        <Stack spacing={4}>
                            {/* Content of the modal */}

                            <Flex style={{borderTop: '1px solid black', width: '100%'}} alignItems={"center"}
                                  justifyContent="center">
                                <VStack alignItems="flex-start">
                                    <Text fontWeight="bold">Az egészséges étkezés előnyei!</Text>
                                    <Text mt={2}>
                                        Az egészséges étkezés fontossága számos szempontból megnyilvánul az emberi
                                        életben. Nem csupán az étrend minősége, hanem az étkezési szokások és
                                        preferenciák is meghatározzák egészségünket és jólétünket.
                                        Az egyik legfontosabb előnye az egészséges étkezésnek az, hogy segít fenntartani
                                        jó fizikai állapotunkat és megelőzni a krónikus betegségek kialakulását. Az
                                        egészséges étrend részeként fogyasztott friss gyümölcsök, zöldségek, teljes
                                        kiőrlésű gabonák és sovány fehérjék gazdag tápanyagtartalma segíthet csökkenteni
                                        az elhízás, a szívbetegségek, a cukorbetegség és más egészségügyi problémák
                                        kialakulásának kockázatát.
                                        Emellett az egészséges táplálkozás biztosítja a szervezet számára szükséges
                                        esszenciális tápanyagokat, mint például vitaminok, ásványi anyagok és rostok.
                                        Ezek a tápanyagok elengedhetetlenek a test működéséhez és az egészséges
                                        fejlődéshez.
                                    </Text>
                                </VStack>
                            </Flex>
                            <Flex alignItems={"center"} justifyContent="center">
                                <Image src="/healthylife.jpg" alt="healthylife" w="80%" h="auto" objectFit="cover"/>
                            </Flex>
                            <br/>


                            <Flex style={{borderTop: '1px solid black', width: '100%'}} alignItems={"center"}
                                  justifyContent="center">
                                <VStack alignItems="flex-start">
                                    <Text fontWeight="bold">A rendszeres testmozgás előnyei!</Text>
                                    <Text mt={2}>
                                        A rendszeres testmozgás gyakorlatilag minden szempontból előnyös az emberi szervezet számára, mind fizikai, mind mentális szinten. Testünk számára természetes mozgásra van szüksége, és az ezzel járó előnyök rendkívül sokrétűek.
                                        Az egyik legnyilvánvalóbb előnye a testmozgásnak az, hogy segít fenntartani vagy javítani a fizikai kondíciónkat. Rendszeres edzés segíthet csökkenteni a testsúlyt, növelni az izomtömeget és az erőt, valamint javítani a testtartást és a mozgástartományt. Emellett segíthet megelőzni vagy enyhíteni az ízületi és izomfájdalmakat, valamint erősítheti a csontokat, ami különösen fontos az idősebb korosztály számára.
                                        A rendszeres testmozgásnak kedvező hatása van a szív- és érrendszeri egészségre is. Erősíti a szívet, javítja a vérkeringést, csökkenti a vérnyomást és javítja a koleszterinszintet. Ezáltal csökken a szívbetegségek, a stroke és más érrendszeri problémák kockázata.
                                    </Text>
                                </VStack>
                            </Flex>
                            <Flex alignItems={"center"} justifyContent="center">
                                <Image src="/exercise.jpg" alt="healthylife" w="80%" h="auto" objectFit="cover"/>
                            </Flex>
                            <br/>


                            <Flex style={{borderTop: '1px solid black', width: '100%'}} alignItems={"center"}
                                  justifyContent="center">
                                <VStack alignItems="flex-start">
                                    <Text fontWeight="bold">Helyes étrendkövetés</Text>
                                    <Text mt={2}>
                                        Helyes étrendkövetés során az ember tudatosan és egészségesen táplálja a testét olyan ételekkel, amelyek megfelelő tápanyagokat biztosítanak számára, és segítenek fenntartani vagy javítani az egészségét. Fontos, hogy az étrend változatos legyen, és kielégítse a szervezet különböző táplálkozási szükségleteit.
                                        Az első lépés az, hogy alapvetően egészséges élelmiszereket válasszunk. Ide tartoznak a friss zöldségek és gyümölcsök, teljes kiőrlésű gabonák, sovány fehérjék (pl. csirkehús, hal, tojás), egészséges zsírok (pl. olívaolaj, avokádó), magvak és hüvelyesek. Ezek az ételek gazdagok vitaminokban, ásványi anyagokban, rostokban és egyéb fontos tápanyagokban, és alapvetően hozzájárulnak az egészség fenntartásához.
                                        Fontos, hogy kerüljük az olyan feldolgozott ételeket és élelmiszereket, amelyek magas hozzáadott cukor-, só- vagy mesterséges adalékanyag-tartalommal rendelkeznek. Ezek gyakran kevés tápanyagot, de sok kalóriát tartalmaznak, és hozzájárulhatnak az elhízáshoz és a krónikus betegségek kialakulásához.
                                    </Text>
                                </VStack>
                            </Flex>
                            <Flex alignItems={"center"} justifyContent="center">
                                <Image src="/etrend.png" alt="healthylife" w="80%" h="auto" objectFit="cover"/>
                            </Flex>
                            <br/>


                            {/* Repeat the above Flex for the remaining items */}

                        </Stack>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={handleClose}>
                            Bezárás
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </VStack>
    );
};

export default Suggestions;

