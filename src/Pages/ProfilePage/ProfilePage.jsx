// import {Container, Flex} from "@chakra-ui/react";
// import ProfileHeader from "../../Components/Profile/ProfileHeader.jsx";
// import ProfileBody from "../../Components/Profile/ProfileBody.jsx";
//
// const ProfilePage = () => {
//     return <Container maxW="container.lg" py={5}>
//         <Flex py={10} px={4} pl={{base:4, md:10}} w={"full"} mx={"auto"} flexDirection={"column"}>
//             <ProfileHeader />
//         </Flex>
//         <Flex px={{base: 2, sm: 4}} maxW={"full"} mx={"auto"} borderTop={"3px solid"} borderColor={"whiteAlpha.300"} direction={"column"}>
//             <ProfileBody />
//
//         </Flex>
//     </Container>
// }
//
// export default ProfilePage

import { Container, Flex, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import ProfileHeader from "../../Components/Profile/ProfileHeader.jsx";
import ProfileBody from "../../Components/Profile/ProfileBody.jsx";
import useLogout from "../../hooks/useLogout.js";

const ProfilePage = () => {
    const navigate = useNavigate();


    return (
        <Container maxW="container.lg" py={5}>
            <Flex py={10} px={4} pl={{ base: 4, md: 10 }} w={"full"} mx={"auto"} flexDirection={"column"}>
                <ProfileHeader />
                {/* Add Logout button */}

            </Flex>
            <Flex px={{ base: 2, sm: 4 }} maxW={"full"} mx={"auto"} borderTop={"3px solid"} borderColor={"whiteAlpha.300"} direction={"column"}>
                <ProfileBody />
            </Flex>
        </Container>
    );
};

export default ProfilePage;