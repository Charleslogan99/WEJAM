import React from 'react'
import Bee from '../img/Bee.jpg';
import '../index.css';

const Auth_Url = "https://accounts.spotify.com/authorize?client_id=ebc0d5a8595449f495e38c5c494fe380&response_type=code&redirect_uri=http://localhost:3000/&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify&20user-read-playback-state%20user-modify-playback-state"


export default function Login() {
  return (
    <div className="">
<img src={Bee} alt="" className="w-full h-60 lg:h-96"/>
<div className="bg-amber-400 py-96 flex justify-center lg:py-28">
<a className="text-white bg-emerald-900   w-40 h-7 rounded-full text-center" href={Auth_Url}>Login</a>      
    </div>
    </div>
  )
}
