import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import './mainstyles.css';

export function Main() {
    const navigate = useNavigate();

    const username  = localStorage.getItem("username");

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    function addGoal() {
        console.log("adding goal");
    }

    class Person {
        userName;
        goals;
        friends;
      
        constructor(userName, goals = [], friends = []) {
            this.userName = userName;
            this.goals = goals;
            this.friends = friends;
        }
      
        getname() {
            return(this.userName);
        }
      
        addFriend(person) {
            this.friends.push(person);
        }
      
        addGoal(goal) {
            this.goals.push(goal);
        }
    }
    
    async function logout() {
        localStorage.removeItem('username');
        await fetch(`/api/auth/logout`, {
          method: 'delete',
        });
    }

    // Turn two lists into a map
    async function createMap() {
        //let keys = await listUsernames();
        let values = await listUsers();
        let keys = []
        
        for (let i = 0; i < values.length; i += 1) {
        keys.push(values[i].username);
        }
        
        if (keys.length !== values.length) {
        console.error("Lists must have the same length.");
        return null;
        }
    
        const myMap = new Map();
    
        for (let i = 0; i < keys.length; i++) {
        myMap.set(keys[i], values[i]);
        }
    
        return myMap;
    }
    
    // addUser(usernameEl);
    async function addUser(username) {
        fetch('/api/addUser', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(new Person(username))
        });
    }
    
    // let myUser = await getUser(usernameEl);
    async function getUser(username) {
        let getUserObject = await fetch(`/api/getUser/${username}`, {
            method: 'GET',
            headers: {'content-type': 'application/json'}
        });
        
        let userData = await getUserObject.json();
        console.log(userData);
        console.log(typeof(userData));
        let myUser = new Person(userData.userName, userData.goals, userData.friends);
        return(myUser);
    }
    
    // updateUser(myUser);
    async function updateUser(myUser) {
        fetch('/api/updateUser', {
            method: 'PUT',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(myUser)
        });
    }
    
    // let personList = await listUsers();
    async function listUsers() {
        let response = await fetch('/api/listUsers', {
            method: 'GET',
            headers: {'content-type': 'application/json'}
        });
    
        let personList = await response.json();
        return(personList);
    }
    
    async function listUsernames() {
        let response = await fetch('/api/listUsers', {
            method: 'GET',
            headers: {'content-type': 'application/json'}
        });
    
        let userarray = []
        let personList = await response.json();
        
        for (let i = 0; i < personList.length; i += 1) {
        userarray.push(personList[i].username);
        }
        return(userarray);
    }

    function PopulateGoalList() {
        return(
            <label>
                <input type="checkbox" />
                <span></span>
                <p>here is my goal</p>
            </label>
        );
        
        // try {
        //     console.log("yup");
        //     var dictionary = await createMap();
        //     var userObject = dictionary.get(username);
        //     for (var goal of userObject.goals) {
        //         console.log(goal);
        //     }
        //     return (
        //         <div>Here is my list</div>
        //     );
        // } catch (error) {
        //     console.error("Error fetching data:", error);
        //     // Return an error message or handle the error gracefully
        //     return <div>Error fetching data</div>;
        // }    
    }

    function PersonalCard() {
        return (
            <div className="card personal">
                <h1>{username}</h1>
                <div className="goals">  
                    <div className="goalList">
                        <PopulateGoalList />
                    </div>
                    <div className="addGoal"> 
                        <div id="addGoalInput">
                            <input type="text" id="goalInput" placeholder="Add Goal" />
                        </div>
                        
                        <label id="addGoalButton">
                            <button className="btn" onClick={() => addGoal()}><i className='bx bx-plus-circle'></i></button>
                        </label>
                    </div>
                </div>
                {/* configureWebSocket();</script> */}
            </div>
        );
    }

    function PopulateQuoteCard() {
        return (
            <div id="fetchQuote" className="card quote-card">
                <p className="quote">here is my quote</p>
                <p className="person">Here is the author</p>
            </div>
        );
    }

    function PopulateFriends() {
        return (
            <div className="card deleteFriend">
                <h1>Name</h1>
                <div className="goals">
                    <label>
                        <input type="checkbox" />
                        <span></span>
                        <p>shaboy</p>
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
        );
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
            <PersonalCard />
            
            <PopulateQuoteCard />
            
            <PopulateFriends />
            
            {/* <script>displayFriendCards()</script> */}
            

            {/* <div className="card addfriend">
                <button className="btn" onClick="addFriend()"><i className='bx bx-plus-circle'></i></button>
                <p>Add Friend</p>
            </div>

            <div className="card" id="addFriendCard">
            </div> */}
        </div>
    </div>
  );
}