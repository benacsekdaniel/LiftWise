import {Container} from "@chakra-ui/react";
import FeedPost from "./FeedPost.jsx";

const FeedPosts = () => {
    return(
        <Container maxW={"container.sm"} py={10} px={2}>
            <FeedPost username="Ronnie Coleman" img='/RONNIE.jpg' avatar='LWBIG.png'/>
            <FeedPost username="Chris Bumstead" img='CBUM.jpg' avatar='LWBIG.png'/>
            <FeedPost username="Jay Cutler" img='JAY.jpg' avatar='LWBIG.png'/>
            <FeedPost username="Jack Black" img='JACK.jpg' avatar='LWBIG.png'/>
            <FeedPost username="Gorilla" img='gorilla.jpg' avatar='LWBIG.png'/>
        </Container>
    )
}

export default FeedPosts