import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";

import {Route, Routes} from 'react-router-dom'
import Authentication from "./routes/authentication/authentication.component";
import Shop from "./routes/shop/shop.component";
import Checkout from "./routes/checkout/checkout.component";
import {useEffect} from "react";
import {fireBaseAuth, fireStoreRepo} from "./utils/firebase/firebase.utils";
import {setCurrentUser} from "./store/user/user.reducer";
import {useDispatch} from "react-redux";


const App = () => {

    // Dispatch never changes
    const dispatch = useDispatch();

    // Effect callback return value will be executed when component unmounts, so we return the function
    useEffect(() => {
        return fireBaseAuth.onUserAuthStateChanged((user) => {
            if (user) {
                fireStoreRepo.createUserDocumentFromAuth(user).then()
            }
            dispatch(setCurrentUser(user));
        });
    }, [dispatch])


    return (
        <Routes>
            <Route path='/' element={<Navigation/>}>
                <Route index element={<Home/>} />
                <Route path='/shop/*' element={<Shop/>} />
                <Route path='/auth' element={<Authentication/>} />
                <Route path='/checkout' element={<Checkout/>} />
            </Route>
        </Routes>
    );
}

export default App;
