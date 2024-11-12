import React from "react";
import {Avatar, Box, Button, Flex, Image, Link, Tooltip, useColorMode, IconButton} from "@chakra-ui/react";
import {Link as RouterLink} from 'react-router-dom'
import {CreatePostLogo, IconGym, NotificationsLogo, SearchLogo, EditArticlesIcon} from "../../assets/constants.jsx";
import {AiFillHome} from "react-icons/ai";
import {BiLogOut} from "react-icons/bi";
import useLogout from "../../hooks/useLogout.js";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

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
            link: "/search-articles",
        },
        {
            icon: <NotificationsLogo />,
            text: "Mentett cikkek",
            link: "/saved-articles",
        },
        {
            icon: <CreatePostLogo />,
            text: "Cikk Létrehozása",
            link: "/create-post",
        },
        {
            icon: <EditArticlesIcon />,
            text: "Cikkek Szerkesztése",
            link: "/edit-articles",
        },
        {
            icon: <Avatar size={"sm"} name={"Benacsek Dániel"} src='/Profilepic.png' />,
            text: "Profil",
            link: "/Profile",
        },
    ];
    const { handleLogout, isLoggingOut } = useLogout();
    const { colorMode, toggleColorMode } = useColorMode();

    const handleLogoutClick = () => {
        handleLogout();
    };

    return (
        <Box
            height={"100vh"}
            borderRight={"1px solid"}
            borderColor={"whiteAlpha.300"}
            position={"sticky"}
            top={0}
            left={0}
            width={{ base: "60px", md: "240px" }}
        >
            {/* Main logo - modified to fill width */}
            <Link 
                to={"/"} 
                as={RouterLink} 
                display={{ base: "none", md: "flex" }} 
                justifyContent="center"
                alignItems="center"
                py={4}
                borderBottom="1px solid"
                borderColor="whiteAlpha.300"
                width="full"
            >
                <Box width="full" px={4}>
                    <IconGym />
                </Box>
            </Link>

            <Flex direction={"column"} height={"full"} pt={4}>
                {/* Balanced theme toggle button */}
                <Flex 
                    justifyContent="center" 
                    mb={6}
                    px={2}
                >
                    <IconButton
                        aria-label="Toggle color mode"
                        icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                        onClick={toggleColorMode}
                        size="md"
                        colorScheme={colorMode === "light" ? "gray" : "yellow"}
                        variant="ghost"
                        borderRadius="lg"
                        w={{ base: "40px", md: "40px" }}
                        _hover={{
                            bg: colorMode === "light" ? "gray.200" : "whiteAlpha.200",
                            transform: "scale(1.02)"
                        }}
                        transition="all 0.2s"
                    />
                </Flex>

                {/* Navigation items */}
                <Flex 
                    direction={"column"} 
                    gap={2} 
                    flex={1}
                    px={2}
                >
                    {sidebarItems.map((item, index) => (
                        <Tooltip 
                            key={index} 
                            hasArrow 
                            label={item.text} 
                            placement="right" 
                            ml={1} 
                            openDelay={500} 
                            display={{ base: 'block', md: 'none' }}
                        >
                            <Link to={item.link} as={RouterLink} _hover={{ textDecoration: 'none' }}>
                                <Flex
                                    alignItems={"center"}
                                    gap={4}
                                    _hover={{ 
                                        bg: "whiteAlpha.200",
                                        borderRadius: "xl"
                                    }}
                                    borderRadius="xl"
                                    p={3}
                                    transition="all 0.2s"
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

                {/* Logout - moved to bottom */}
                <Box px={2} pb={4}>
                    <Tooltip 
                        hasArrow 
                        label={"Logout"} 
                        placement="right" 
                        ml={1} 
                        openDelay={500} 
                        display={{ base: 'block', md: 'none' }}
                    >
                        <Link
                            to={"/auth"}
                            as={RouterLink}
                            display="flex"
                            alignItems={"center"}
                            gap={4}
                            _hover={{ 
                                bg: "whiteAlpha.200",
                                textDecoration: 'none',
                                borderRadius: "xl"
                            }}
                            borderRadius="xl"
                            p={3}
                            transition="all 0.2s"
                            onClick={handleLogoutClick}
                        >
                            <BiLogOut size={25} />
                            <Button 
                                variant={"ghost"} 
                                _hover={{ bg: "transparent" }} 
                                isLoading={isLoggingOut}
                                display={{ base: "none", md: "block" }}
                                size="sm"
                                p={0}
                            >
                                Kijelentkezés!
                            </Button>
                        </Link>
                    </Tooltip>
                </Box>
            </Flex>
        </Box>
    );
};

export default Sidebar;
