import React from "react";
import {Avatar, Box, Button, Flex, Image, Link, Tooltip} from "@chakra-ui/react";
import {Link as RouterLink} from 'react-router-dom'
import {CreatePostLogo, IconGym, NotificationsLogo, SearchLogo} from "../../assets/constants.jsx";
import {AiFillHome} from "react-icons/ai";
import {BiLogOut} from "react-icons/bi";
import useLogout from "../../hooks/useLogout.js";

const Sidebar = () => {
    const sidebarItems = [
        {
            icon: <AiFillHome size={25} />,
            text: "Főoldal",
            link: "/",
        },
        {
            icon: <SearchLogo />,
            text: "Cikkek keresése",
            link: "/cikkek-keresese",
        },
        {
            icon: <NotificationsLogo />,
            text: "Mentett cikkek",
            link: "/mentett-cikkek",
        },
        {
            icon: <CreatePostLogo />,
            text: "Create",
            link: "/create-post",
        },
        {
            icon: <Avatar size={"sm"} name={"Benacsek Dániel"} src='/Profilepic.png' />,
            text: "Profil",
            link: "/Profile",
        },
    ];
    const { handleLogout, isLoggingOut } = useLogout();

    const handleLogoutClick = () => {
        handleLogout();
    };

    return (
        <Box
            height={"100vh"}
            borderRight={"3px solid"}
            borderColor={"whiteAlpha.300"}
            py={8}
            position={"sticky"}
            top={0}
            left={0}
            px={{ base: 2, md: 4 }}
        >
            {/* Main logo */}
            <Link to={"/"} as={RouterLink} pl={2} display={{ base: "none", md: "block" }} cursor="pointer">
                <IconGym />
            </Link>

            <Flex direction={"column"} gap={10} w="full" height={"full"}>
                <Flex direction={"column"} gap={5} cursor={"pointer"}>
                    {sidebarItems.map((item, index) => (
                        // Tooltip
                        <Tooltip key={index} hasArrow label={item.text} placement="right" ml={1} openDelay={500} display={{ base: 'block', md: 'none' }}>
                            <Link to={item.link} as={RouterLink}>
                                <Flex
                                    alignItems={"center"}
                                    gap={4}
                                    _hover={{ bg: "whiteAlpga.400" }}
                                    borderRadius={6}
                                    p={2}
                                    w={{ base: 10, md: "full" }}
                                    justifyContent={{ base: "center", md: "flex-start" }}
                                >
                                    {item.icon}
                                    <Box display={{ base: "none", md: "block" }}>
                                        {item.text}
                                    </Box>
                                </Flex>
                            </Link>
                        </Tooltip>
                    ))}
                </Flex>

                {/* Logout */}
                <Tooltip hasArrow label={"Logout"} placement="right" ml={1} openDelay={500} display={{ base: 'block', md: 'none' }}>
                    <Link
                        display={"flex"}
                        to={"/auth"}
                        as={RouterLink}
                        alignItems={"center"}
                        gap={4}
                        _hover={{ bg: "whiteAlpga.400" }}
                        borderRadius={6}
                        p={2}
                        w={"full"}
                        justifyContent={"flex-start"}
                        onClick={handleLogoutClick}
                    >
                        <BiLogOut size={25} />
                        <Button variant={"ghost"} _hover={{ bg: "transparent" }} isLoading={isLoggingOut}>
                            Kijelentkezés!
                        </Button>
                    </Link>
                </Tooltip>
            </Flex>
        </Box>
    );
};

export default Sidebar;
