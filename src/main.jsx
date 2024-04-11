import React from 'react';

import './mainstyles.css';

export function Main() {
  return (
    <div className="mainBody">
        <label className="hamburger-menu">
            <input type="checkbox" />
        </label>
        <aside className="sidebar">
            <nav>
                <div><a href="index.html">Logout</a></div>
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
                            <button className="btn" onclick="addGoal()"><i className='bx bx-plus-circle'></i></button>
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
                <button className="btn" onclick="addFriend()"><i className='bx bx-plus-circle'></i></button>
                <p>Add Friend</p>
            </div>

            <div className="card" id="addFriendCard">
            </div>
        </div>
    </div>
  );
}