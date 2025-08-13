import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from './ui/button';
import { FcGoogle } from "react-icons/fc";
import { showToast } from '@/helpers/showToast';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '@/helpers/firebase';
import { RouteIndex } from '@/helpers/RouteName';
import { getEvn } from '@/helpers/getEnv';
import { useDispatch } from 'react-redux';
import { setUser } from '@/redux/user/user.slice';

const GoogleLogin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogin = async () =>{
        try {
            const googleResponse = await signInWithPopup(auth, provider)
            console.log(googleResponse);
            
            const user = googleResponse.user;
            const bodyData = {
                username: user.displayName,
                email: user.email,
                avatar: user.photoURL
            }
            const response = await fetch(`${getEvn('VITE_API_BASE_URL')}/auth/google-login`, {
                method: 'post',
                headers: { 'Content-type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(bodyData)
            })
            const data = await response.json();
            if(!response.ok){
                return showToast('error', data.message)
            }
            dispatch(setUser(data.user));
            
            // Check if there's a redirect path stored
            const redirectPath = sessionStorage.getItem('redirectAfterLogin');
            if (redirectPath) {
                sessionStorage.removeItem('redirectAfterLogin'); // Clear the stored path
                navigate(redirectPath);
            } else {
                navigate(RouteIndex);
            }
            
            showToast('success', data.message)

        } catch (error) {
            showToast('error', error.message)
        }
    }
  return (
    <Button variant='outline' className='w-full' onClick={handleLogin}  >
        <FcGoogle/>
        Continue With Google
    </Button>
  )
}

export default GoogleLogin;