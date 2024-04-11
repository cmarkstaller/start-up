//import React from 'react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './styles.css';

export function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    async function loginOrCreate(endpoint, event) {
        //event.preventDefault();
        
        // const username = document.querySelector('#username').value;
        // const password = document.querySelector('#userpassword').value;
        console.log(username);
        console.log(password);

        const response = await fetch(endpoint, {
            method: 'post',
            body: JSON.stringify({ username: username, password: password }),
            headers: {
            'Content-type': 'application/json; charset=UTF-8',
            },
        });

        if (response.ok) {
            localStorage.setItem('username', username);
            navigate('/main');
            //login();
            // window.location.href = 'main.html';
        
        } else {
            const body = await response.json();
            const modalEl = document.querySelector('#msgModal');
            modalEl.querySelector('.modal-body').textContent = `⚠ Error: ${body.msg}`;
            const msgModal = new bootstrap.Modal(modalEl, {});
            msgModal.show();
        }
    };

  return (
<body>
    <script>logout()</script>
    <div className="wrapper">
        <form>
            <h1>Login</h1>
            <div className="input-box">
                <input type="text" id="username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                <i className='bx bxs-user'></i>
            </div>
            
            <div className="input-box">
                <input type="password" id="userpassword" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <i className='bx bxs-lock-alt'></i>
            </div>

            <div className="remember-forgot">
                <label><input type="checkbox" /> Remember me</label>
                <a href="#">Forgot password?</a>
            </div>

            <button className="btn" type="submit" onClick={() => loginOrCreate(`/api/auth/login`, event)}>Login</button>

            <div className="register-link">
                <p>Don't have an account? <a href="#" id="register-link">Register</a></p>
            </div>
            {/* <script>
                // Get the link element
                var registerLink = document.getElementById("register-link");
            
                // Add onclick event handler to the link element
                registerLink.onclick = function(event) {
                    // Prevent the default behavior of the link
                    event.preventDefault();
                    
                    // Call the register function
                    createUser();
                };
            </script> */}
        </form>
    </div>

    <footer>
        <p>Christopher Markstaller</p>
        <a href="https://github.com/cmarkstaller/start-up">GitHub</a>
    </footer>
    
</body>
  );
}