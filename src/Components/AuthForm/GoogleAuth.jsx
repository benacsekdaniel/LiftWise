import {Flex, Image, Text} from "@chakra-ui/react";
import {useSignInWithGoogle} from "react-firebase-hooks/auth";
import {auth, firestore} from "../../firebase/firebase.js";
import useShowToast from "../../hooks/useShowToast.js";
import useAuthStore from "../../store/authStore.js";
import {doc, getDoc, setDoc} from "firebase/firestore";

const GoogleAuth = ({prefix}) => {
    const [signInWithGoogle, error] = useSignInWithGoogle(auth);
    const showToast = useShowToast();
    const loginUser = useAuthStore((state) => state.login);
    const handleGoogleAuth = async () =>
    {
        try {
            const newUser = await signInWithGoogle(); //returnoli ha successful
            if (!newUser && error) {
                showToast("Hiba!", error.message, "error");
                return;
            }

            const userRef = doc(firestore, "users", newUser.user.uid);
            const userSnap = await getDoc(userRef);

            if(userSnap.exists()){
                const userDoc = userSnap.data();
                localStorage.setItem("user-info", JSON.stringify(userDoc));
                loginUser(userDoc);
            }else{
                const userDoc = {
                    uid: newUser.user.uid,
                    email: newUser.user.email,
                    username: newUser.user.email.split("@")[0],
                    fullName: newUser.user.displayName,
                    bio: "",
                    profilePicURL: newUser.user.photoURL,
                    savedPosts: [],
                    createdAt: Date.now()
            };
                await setDoc(doc(firestore, "users", newUser.user.uid), userDoc);
                localStorage.setItem("user-info", JSON.stringify(userDoc));
                loginUser(userDoc);
            }



        } catch (error) {
            showToast("Hiba!", error.message, "error");
        }
    };


    return (
    <Flex onClick={handleGoogleAuth} alignItems={"center"} justifyContent={"center"} cursor={"pointer"}>
        <Image src='/googleIcon.png' w={5} alt="LoginWGoogle"/>
        <Text mx="2" color={"blue.500"}>
            {prefix} Google felhasználói fiókkal!
        </Text>
    </Flex>
    );
};

export default GoogleAuth;