import {Button, Flex, Text} from "@chakra-ui/react";
import React from "react";

const Suggestion = ({ name, link }) => {
    const handleClick = () => {
        window.open(link, '_blank');
    };

    return (
        <Flex justify="space-between" alignItems="center" w="full" >
            <Flex>
                {/* Display the suggestion name */}
                <Text size="sm">{name}</Text>
            </Flex>
            {/* Button that redirects to the specified link */}
            <Button onClick={handleClick} colorScheme="blue" fontSize={"small"} >
                Megtekintés
            </Button>
        </Flex>
    );
};

export default Suggestion