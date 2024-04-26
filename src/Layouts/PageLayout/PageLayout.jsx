import {Box, Flex} from "@chakra-ui/react";
import Sidebar from "../../Components/Sidebar/Sidebar.jsx";
import {useLocation} from "react-router-dom";

const PageLayout= ({children}) =>{
    const {pathname} = useLocation()
    return(
        <Flex>
            {pathname!== '/auth' ?(
                <Box w={{base: "70px", md: "240px"}}>
                    <Sidebar />
                </Box>
            ) :null }
            {/*Ha a Pathname az auth page-re mutat, akkor nem használjuk a sidebart*/}

            <Box flex={1} w={{base: "calc(100% - 80px)", md:"calc(100% - 240px)"}}>
                {children}
            </Box>
        </Flex>
    )
}

export default PageLayout