import {Button, Input} from "@chakra-ui/react";
import {useState} from "react";

const Login = () => {
    const [inputs, setInputs]=useState({
        email:'',
        password:'',
    });

    return <>
        <Input placeholder={'E-mail'} fontSize={15} type={"email"} size={"sm"}
               value={inputs.email}
               onChange={(e) => setInputs({...inputs, email:e.target.value})}
        />
        <Input placeholder={'Jelszó'} fontSize={15} type={"password"} size={"sm"}
               value={inputs.password}
               onChange={(e) => setInputs({...inputs, password:e.target.value})}
        />

        <Button w={"full"} colorScheme='blue' size={"sm"} fontSize={15} >
            Bejelentkezés
        </Button>
    </>
}

export default Login;