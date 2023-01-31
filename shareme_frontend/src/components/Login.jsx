import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import shareVideo from '../assets/share.mp4';
import logo from '../assets/logowhite.png';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
import { client } from '../client';


const Login = () => {
    const navigate = useNavigate();


    const createOrGetUser = ((response) => {
        const decodedResponse = jwt_decode(response.credential)
        console.log(response);
        console.log(JSON.stringify(decodedResponse));
        localStorage.setItem('user', JSON.stringify(decodedResponse));
        const { name, sub, email, picture } = decodedResponse

        const doc = {
            _id: sub,
            _type: 'user',
            userName: name,
            image: picture,
        };

        client.createIfNotExists(doc)
            .then(() => {
                navigate('/', { replace: true })
            });
    });
    return (
        <div className='flex justify-start items-center flex-col h-screen'>
            <div className='relative w-full h-full'>
                <video src={shareVideo} type='video/mp4' loop controls={false} muted autoPlay className='w-full h-full object-cover'>
                </video>
            </div>
            <div className='bg-blackOverlay absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0'>
                <div className='p-5'>
                    <img src={logo} alt="logo" />
                </div>
                <div className='shadow-2xl'>
                    <GoogleLogin
                        onSuccess={(response) => createOrGetUser(response)}
                        onError={(response) => console.log('Error')}

                    />
                </div>
            </div>
        </div>
    )
}

export default Login;