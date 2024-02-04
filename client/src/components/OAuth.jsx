import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth'
import {useNavigate} from "react-router-dom"
import axios from 'axios';
import {app} from "../firebase.js";
import {useDispatch} from "react-redux";
import {signInSuccess} from "../redux/user/userSlice.js";

const OAuth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleGoogleClick = async()=>{
        try {
            const provide = new GoogleAuthProvider();
            const auth = getAuth(app);
            const result = await signInWithPopup(auth,provide);
            console.log(result)
         axios.post('/api/v1/auth/google',{
                name: result.user.displayName,
                email: result.user.email,
                photo: result.user.photoURL,
            }).then(({data})=>{
                dispatch(signInSuccess(data));
                navigate("/");

            });
       
        } catch (error) {
            console.log('Could not signin with google',error);
        }

    }
  return (
    <button type='button' onClick={handleGoogleClick} className='bg-red-600 text-white p-3 rounded-lg uppercase  hover:opacity-95'>Continue With Google</button>
  )
}

export default OAuth