import Link from 'next/link'
import './styles.css'


export default function Logoutted() {


    return (
        <div className="container">
            <div className='left'>Plan It
            <div className=''>

            </div>
            
            </div>



            <div className='right'>
                <form action="" className='loginBox'>
                    <div className='loginElement'>
                        <label className="loginLabel" > ID</label>
                        <input className='loginInput' type="text" />
                    </div>
                    <div className='loginElement'>
                        <label className='loginLabel'>PW</label>
                        <input className='loginInput' type="password" />
                    </div>
                    <button className='loginBtn' type="submit">로그인</button>
                </form>
                <div className='loginBottom'>
                    <Link className='loginLink' href={"/"}>회원가입</Link >
                    <Link className='loginLink' href={"/"}>ID/PW 찾기</Link >
                </div>
            </div>
        </div>
    )
}