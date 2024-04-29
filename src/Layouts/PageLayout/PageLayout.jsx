import {Box, Flex, Spinner} from "@chakra-ui/react";
import Sidebar from "../../Components/Sidebar/Sidebar.jsx";
import {useLocation} from "react-router-dom";
import {useAuthState} from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";
import Navbar from "../../Components/Navbar/Navbar.jsx";

const PageLayout= ({children}) =>{
    const {pathname} = useLocation()
    const [user, loading] = useAuthState(auth);
    const canRenderSidebar = pathname !== "/auth" && user;
    const canRenderNavbar = !user && !loading && pathname !== "/auth";

    const checkingUserIsAuth = !user && loading;
    if (checkingUserIsAuth) return <PageLayoutSpinner />;



    return(
        <Flex flexDirection={canRenderNavbar ? "column" : "row"}>
            {canRenderSidebar ?(
                <Box w={{base: "70px", md: "240px"}}>
                    <Sidebar />
                </Box>
            ) :null }
            {canRenderNavbar ? <Navbar /> : null}
            {/*Ha a Pathname az auth page-re mutat, akkor nem használjuk a sidebart*/}
            <Box flex={1} mx={"auto"} w={{base: "calc(100% - 80px)", md:"calc(100% - 240px)"}}>
                {children}
            </Box>
        </Flex>
    )
}

export default PageLayout

const PageLayoutSpinner = () => {
    return (
        <Flex flexDir='column' h='100vh' alignItems='center' justifyContent='center'>
            <Spinner size='xl' />
        </Flex>
    );
};