import React from "react";
import {Avatar, Box, Flex, Image, Link, Tooltip} from "@chakra-ui/react";
import {Link as RouterLink} from 'react-router-dom'
import {CreatePostLogo, IconGym, NotificationsLogo, SearchLogo} from "../../assets/constants.jsx";
import {IconGymnastics} from "../../assets/constants.jsx";
import {AiFillHome} from "react-icons/ai";
import {BiLogOut} from "react-icons/bi";

const Sidebar = () =>{
    const sidebarItems = [
        {
            icon:<AiFillHome size={25} />,
            text: "Főoldal",
            link: "/",
        },
        {
            icon:<SearchLogo />,
            text: "Keresés",
        },
        {
            icon:<NotificationsLogo />,
            text: "Értesítések",
        },
        {
            icon:<CreatePostLogo />,
            text: "Create",
        },
        {
            icon:<Avatar size={"sm"} name={"Benacsek Dániel"} src='/Profilepic.png' />,
            text: "Profil",
            link: "/Profile",
        },
    ];

    return (
        <Box
            height={"100vh"}
            borderRight={"3px solid"}
            borderColor={"whiteAlpha.300"}
            py={8}
            position={"sticky"}
            top={0}
            left={0}
            px={{base:2, md:4}} >

            <Flex direction={"column"} gap={10} w="full" height={"full"}>
                <Link to={"/"} as={RouterLink} pl={2} display={{base:"none", md:"block"}} cursor="pointer">
                    <IconGym />
                    {/*<Image src='/LiftWiseLogo.png' h={"10"} a='AppStore' border="1px solid white"/>*/}
                </Link>
                <Flex direction={"column"} gap={5} cursor={"pointer"}>
                    {sidebarItems.map((item, index) => (
                        <Tooltip hasArrow label={item.text} placement="right" ml={1} openDelay={500} display={{base:'block', md:'none'}}>
                            <Link
                                display={"flex"}
                                to={item.link || null}
                                as={RouterLink}
                                alignItems={"center"}
                                gap={4}
                                _hover={{bg:"whiteAlpga.400"}}
                                borderRadius={6}
                                p={2}
                                w={{base: 10, md: "full"}}
                                justifyContent={{base:"center", md:"flex-start"}}
                            >
                                {item.icon}
                                <Box display={{base:"none", md:"block"}}>
                                    {item.text}
                                </Box>
                            </Link>
                        </Tooltip>
                    ))}
                </Flex>
                <Tooltip hasArrow label={"Logout"} placement="right" ml={1} openDelay={500} display={{base:'block', md:'none'}}>
                    <Link
                        display={"flex"}
                        to={"/auth"}
                        as={RouterLink}
                        alignItems={"center"}
                        gap={4}
                        _hover={{bg:"whiteAlpga.400"}}
                        borderRadius={6}
                        p={2}
                        w={{base: 10, md: "full"}}
                        justifyContent={{base:"center", md:"flex-start"}}
                    >
                        <BiLogOut size={25} />
                        <Box display={{base:"none", md:"block"}}>
                            Kijelentkezés!
                        </Box>
                    </Link>
                </Tooltip>
            </Flex>
        </Box>
    );
};
export default Sidebar