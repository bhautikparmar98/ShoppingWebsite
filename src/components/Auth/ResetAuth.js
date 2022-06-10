import classes from './Auth.module.css';
import {useState} from'react';
import {useNavigate} from 'react-router-dom'

function ResetAuth(){

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [confirmpass,setconfirmPass] = useState('')
    const [errorMessage,seterrorMessage] = useState('')
    const navigate = useNavigate()

    function ResetPassword(e){
        e.preventDefault()
        const formBody = {email:email,password:password,confirmpass:confirmpass}
        fetch('http://localhost:5000/resetpassword',{
            headers: {'Content-Type':'application/json'},
            method:'PUT',
            body:JSON.stringify(formBody)
        })
        .then(res=>{
            if(res.status === 200 || res.status === 201){
               alert('Password Reset Succesfull !')
               navigate('/auth/login')
            }else{
                res.json().then(err=>seterrorMessage(err.error)).catch(err=>console.log(err))
            }
        })
        .catch(err=>{
            seterrorMessage(err)
        })
    } 

    return <div>
          <form className={classes['form-control']} onSubmit={e=>ResetPassword(e)} noValidate>
            {errorMessage.length>0 && <div className={classes['error']}>{errorMessage}</div>}
            <label htmlFor='email'> E-mail</label>
            <input id='email' type='email' name='email' value={email} onChange={e=>setEmail(e.target.value)}/>
            <label htmlFor='pass'> Password</label>
            <input id='pass' type='password' name='password' value={password} onChange={e=>setPassword(e.target.value)} />
            <div><label htmlFor='confirmpass'>Confirm Password</label>
            <input id='confirmpass' type='password' name='confirmpass' value={confirmpass} onChange={e=>setconfirmPass(e.target.value)}/></div>
            <button className={classes['confirm-reset-btn']}  disabled={!(email.length>0 && password.length>0 && confirmpass.length>0)} type="submit">Reset Password</button> 
        </form>
    </div>
}
export default ResetAuth