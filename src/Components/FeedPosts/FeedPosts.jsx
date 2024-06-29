import {Container} from "@chakra-ui/react";
import FeedPost from "./FeedPost.jsx";

const FeedPosts = () => {
    return(
        <Container maxW={"container.sm"} py={10} px={2}>
            <FeedPost username="LiftWiseAdmin" img='healthy1.jpg' avatar='LWBIG.png'/>
            <FeedPost username="LiftWiseAdmin" img='healthy2.jpg' avatar='LWBIG.png'/>
            <FeedPost username="LiftWiseAdmin" img='healthy3.jpg' avatar='LWBIG.png'/>
            <FeedPost username="LiftWiseAdmin" img='exercise.jpg' avatar='LWBIG.png'/>
            <FeedPost username="LiftWiseAdmin" img='exercising1.jpg' avatar='LWBIG.png'/>
            <FeedPost username="LiftWiseAdmin" img='exercising2.jpg' avatar='LWBIG.png'/>
            <FeedPost username="LiftWiseAdmin" img='exercising3.jpg' avatar='LWBIG.png'/>
        </Container>
    )
}

export default FeedPosts