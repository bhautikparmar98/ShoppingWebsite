import classes from './Auth.module.css';
import {useNavigate, useParams} from 'react-router-dom';
import {useState} from 'react'
function Auth(props){

    const params = useParams()
    const currentRoute = params.authtype

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [confirmpass,setconfirmPass] = useState('')
    const [errorMessage,seterrorMessage] = useState('')
    const navigate = useNavigate()

    let authURL = `http://localhost:5000/${currentRoute}`
    let Timeout

    function formSubmit(e){
        e.preventDefault()
        const formBody = {email:email,password:password,confirmpass:confirmpass}
        fetch(authURL,{
            headers: {'Content-Type':'application/json'},
            method:'PUT',
            body:JSON.stringify(formBody)
        })
        .then(res=>{
            if(res.status === 200 || res.status === 201){
                navigate('/')
                props.setisAuth(true)
                res.json().then(res=>{
                    sessionStorage.setItem('token',res.token)
                    //sessionStorage.setItem('expiresIn',new Date().setHours(new Date().getHours()+1))
                    //we need to store token in an array for every user, and token need to be deleted in backend server also after session over and on Logout
                    Timeout = setTimeout(()=>{
                        sessionStorage.setItem('token','')
                        navigate('/auth/login')
                        props.setisAuth(false)   
                        alert('Session Expired')     
                    },3600000)
                    props.setTimer(Timeout)
                    props.setauthToken(res.token)
                })
            }else{
                res.json().then(err=>seterrorMessage(err.error)).catch(err=>console.log(err))
            }
        })
        .catch(err=>{
            seterrorMessage(err)
        })
    } 
    function ResetHandler(){
        navigate('/reset-password')
    }
    return <div>
        <form className={classes['form-control']} onSubmit={e=>formSubmit(e)} noValidate>
            {errorMessage.length>0 && <div className={classes['error']}>{errorMessage}</div>}
            <label htmlFor='email'> E-mail</label>
            <input id='email' type='email' name='email' value={email} onChange={e=>setEmail(e.target.value)}/>
            <label htmlFor='pass'> Password</label>
            <input id='pass' type='password' name='password' value={password} onChange={e=>setPassword(e.target.value)} />
            {currentRoute==='signup' && <div><label htmlFor='confirmpass'>Confirm Password</label>
            <input id='confirmpass' type='password' name='confirmpass' value={confirmpass} onChange={e=>setconfirmPass(e.target.value)}/></div> }
            {currentRoute==='login' && <button disabled={!(email.length>0 && password.length>0)} className={classes['submit-btn']} type="submit">Login</button>}
            {currentRoute==='signup' && <button  disabled={!(email.length>0 && password.length>0 && confirmpass.length>0)} className={classes['submit-btn']} type="submit">Signup</button>}
            {currentRoute==='login' && <button className={classes['reset-btn']} onClick={ResetHandler} type="button">Forgot Password</button>}
        </form>
    </div>
} 
export default Auth