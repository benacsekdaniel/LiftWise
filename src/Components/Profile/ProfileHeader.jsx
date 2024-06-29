import { Avatar, Button, Flex, Link, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getAccountCreationDate } from "../../firebase/firebase";
import useLogout from "../../hooks/useLogout";
import useAuthStore from "../../store/authStore";

const SuggestedHeader = () => {
    const authUser = useAuthStore((state) => state.user);
    const [accountCreationDate, setAccountCreationDate] = useState(null);
    const { handleLogout, isLoggingOut } = useLogout();

    useEffect(() => {
        if (authUser) {
            getAccountCreationDate(authUser.uid).then((date) => {
                setAccountCreationDate(date);
            });
        }
    }, [authUser]);

    if (!authUser) return null;

    return (
        <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
            <Flex alignItems={"center"} gap={4}>
                <Link to={`/${authUser.username}`}>
                    <Avatar size={"xl"} src={authUser.profilePicURL} />
                </Link>
                <Flex flexDirection="column">
                    <Link to={`/${authUser.username}`}>
                        <Text fontSize={16} fontWeight={"bold"}>
                            {authUser.username}
                        </Text>
                    </Link>
                    <Text fontSize={12} color="gray.500">
                        Tagság kezdete: {accountCreationDate || "Loading..."}
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
