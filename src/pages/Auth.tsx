import hero from "../assets/auth.png"
import Login from '@/components/Login'


const Auth = () => {
  return (
    <div className='flex justify-between items-center'>
        <img src={hero} className='w-[45%] h-[100vh]' alt="" />
        <div className="mx-auto">
            <Login/>
        </div>
    </div>
  )
}

export default Auth