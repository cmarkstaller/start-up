import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import './mainstyles.css';

export function Main() {
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    async function logout() {
        localStorage.removeItem('username');
        await fetch(`/api/auth/logout`, {
          method: 'delete',
        });
      }

  return (
    <div className="mainBody">
        <label className="hamburger-menu">
            <input type="checkbox" />
        </label>
        <aside className="sidebar">
            <nav>
                <Link to="/" onClick={handleLogout}>Logout</Link>
            </nav>
        </aside>

        <div className="container">
            <div className="card personal">
                <h1>Username</h1>
                <div className="goals">  
                    <div className="goalList">
                    </div>
                    <div className="addGoal"> 
                        <div id="addGoalInput">
                            <input type="text" id="goalInput" placeholder="Add Goal" />
                        </div>
                        
                        <label id="addGoalButton">
                            <button className="btn" onClick="addGoal()"><i className='bx bx-plus-circle'></i></button>
                        </label>
                    </div>    
                </div>
                {/* <script>populatePerson(); configureWebSocket();</script> */}
            </div>

            <div id="fetchQuote" className="card quote-card">
                {/* <script>displayQuote()</script> */}
            </div>
            <div className="card deleteFriend">
                <h1>Name</h1>
                <div className="goals">
                    <label>
                        <input type="checkbox" />
                        <span></span>
                        <p>Goal 1</p>
                    </label>
                    <label>
                        <input type="checkbox" />
                        <span></span>
                        <p>Goal 2</p>
                    </label>
                    <label>
                        <input type="checkbox" />
                        <span></span>
                        <p>Goal 3</p>
                    </label>
                </div>
            </div>
            {/* <script>displayFriendCards()</script> */}
            

            <div className="card addfriend">
                <button className="btn" onClick="addFriend()"><i className='bx bx-plus-circle'></i></button>
                <p>Add Friend</p>
            </div>

            <div className="card" id="addFriendCard">
            </div>
        </div>
    </div>
  );
}