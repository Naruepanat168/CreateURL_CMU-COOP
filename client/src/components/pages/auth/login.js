import React, { useState } from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { FormControl } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { LoginHeadler } from '../../functions/auth'
import { useDispatch } from 'react-redux'
import home from '../home';

function Login({history}) {
    const dispatch = useDispatch()
    const [buttonDisabled, setButtonDisabled] = useState(false);

    const [fromUser, setUser] = useState({
        username: '',
        password: '',
    })

    const onChange = (e) => {
        setUser({ ...fromUser, [e.target.name]: e.target.value })

    }
    const roleBasedRedirect = (res) => {
        if (res === 'admin') {
          history.push('/admin/dashboard')
        } else {
          history.push('/user/dashboard')
        }
      }

    const onSubmit = async (e) => {
        e.preventDefault();
        setButtonDisabled(true)
        const User = {
            name: fromUser.username,
            password: fromUser.password,
        };
        try {
            await LoginHeadler(User).then(res => {// จัดการกรณี login สำเร็จ
                toast.success('เข้าสู่ระบบสำเร็จ!',{ autoClose: 2000,}); // แสดงข้อความ 'success'
        
                dispatch({
                  type: 'LOGGED_IN_USER',
                  payload: {
                    token: res.data.token,
                    name: res.data.payload.name,
                    role: res.data.payload.role,
                    
                  }
                })
                
                localStorage.setItem('token', res.data.token)
                roleBasedRedirect(res.data.payload.role)

              })
        } catch (err) {
            console.log(err);
            toast.error('เกิดข้อผิดพลาด login ', { autoClose: 2000, });
            setButtonDisabled(false)
        }

    }
    const idTokenResult = localStorage.token;
    return  !idTokenResult
        ?(<div className="container p-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <h1 >Login</h1>
                    <form className="w-100" onSubmit={onSubmit}>
                        <FloatingLabel  label="User Name" className="mb-3">
                            <FormControl type="text" name='username' onChange={onChange} placeholder="User Name" />
                        </FloatingLabel>

                        <FloatingLabel  label="Password" className="mb-3">
                            <FormControl type="password" name='password' onChange={onChange} placeholder="Password" />
                        </FloatingLabel>

                        <button className="btn btn-primary w-100 mt-3" type="submit" disabled={buttonDisabled}style={{ backgroundColor: '#6a0dad', borderColor: '#6a0dad' }}>
                            Send
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
    :   home()
}

export default Login
