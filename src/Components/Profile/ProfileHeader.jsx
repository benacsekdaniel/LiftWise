import { Avatar, Button, Flex, Link, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useLogout from "../../hooks/useLogout";
import useAuthStore from "../../store/authStore.js";

const SuggestedHeader = () => {
    const authUser = useAuthStore((state) => state.user);
    const [accountCreationDate, setAccountCreationDate] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const { handleLogout, isLoggingOut } = useLogout();

    useEffect(() => {
        // Load user data from localStorage
        const userData = JSON.parse(localStorage.getItem("user-info"));
        if (userData) {
            setUserInfo(userData);
            const creationDate = new Date(userData.createdAt);
            setAccountCreationDate(creationDate.toLocaleDateString("hu-HU"));
        }
    }, []);

    if (!authUser) return null;

    return (
        <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
            <Flex alignItems={"center"} gap={4}>
                <Link href={`/${authUser.username}`}>
                    <Avatar size={"xl"} src={authUser.profilePicURL} />
                </Link>
                <Flex flexDirection="column">
                    <Link href={`/${authUser.username}`}>
                        <Text fontSize={16} fontWeight={"bold"}>
                            {authUser.username}
                        </Text>
                    </Link>
                    <Text fontSize={12} color="gray.500">
                        Tagság kezdete: {accountCreationDate || "Loading..."}
                    </Text>
                    <Text fontSize={14} mt={2}>
                        {userInfo?.bio || "Nincs bio megadva"}
                    </Text>
                </Flex>
            </Flex>
            <Button
                size={"xs"}
                background={"transparent"}
                _hover={{ background: "transparent" }}
                fontSize={14}
                fontWeight={"medium"}
                color={"blue.400"}
                onClick={handleLogout}
                isLoading={isLoggingOut}
                cursor={"pointer"}
            >
                Kijelentkezés!
            </Button>
        </Flex>
    );
};

export default SuggestedHeader;
