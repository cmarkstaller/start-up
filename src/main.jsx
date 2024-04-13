import React, { useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GameNotifier } from './gameNotifier.js';

import './mainstyles.css';

export function Main() {
    
    const navigate = useNavigate();

    const username  = localStorage.getItem("username");

    const [dictionary, updateDictionary] = useState(null); // Initialize with null
    var [rerender, updateRender] = useState(0);

    React.useEffect(() => {
        GameNotifier.addHandler(handleGameEvent);

        return () => {
        GameNotifier.removeHandler(handleGameEvent);
        };
    });

    React.useEffect(() => {
        console.log("no parameters use effect");
    }, []);
    
    React.useEffect(() => {
        console.log("inside dictionary use effect");
        // Fetch dictionary when component mounts
        async function fetchDictionary() {
            const map = await createMap();
            updateDictionary(map);
        }
        fetchDictionary();
    }, [rerender]);

    function handleGameEvent(event) {
        updateRender(rerender += 1);
    }

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    function addFriend() {
        console.log("adding friend");
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
        let keys = await listUsernames();
        // let keys = []
        
        // for (let i = 0; i < values.length; i += 1) {
        //     keys.push(values[i].username);
        // }
        
        if (keys.length !== values.length) {
            console.error("Lists must have the same length.");
            return(createMap());
        }
    
        else {
            const myMap = new Map();
        
            for (let i = 0; i < keys.length; i++) {
                myMap.set(keys[i], values[i]);
            }
        
            return myMap;
        }    
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
        }).then(() => {
            updateRender(rerender += 1);
            GameNotifier.broadcastEvent("hooray", "I want to", "kiss strawberries");
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

    // function PopulateGoalList() {
    //     var userObject = dictionary.get(username);
        
    //     const userGoals = userObject.goals;
    //     const goals = [];
    //     for (const [i, goal] of userGoals.entries()) {
    //         goals.push(
    //             <label key={i}>
    //                 <input type="checkbox"/>
    //                 <span></span>
    //                 <p>{goal}</p>
    //             </label>
    //         );
    //     }    
    //     return(goals); 
    // }

    function PopulateGoalList() {
        var userObject = dictionary.get(username);
        
        const userGoals = userObject.goals;
    
        const handleCheckboxChange = (index) => {
            // Create a copy of the goals array
            const updatedGoals = [...userGoals];
            // Remove the goal at the specified index
            updatedGoals.splice(index, 1);
            // Update the dictionary with the updated goals
            userObject.goals = updatedGoals;
            updateUser(userObject);
            
            // Update the state to trigger a re-render
            // updateDictionary(new Map(dictionary)); // Trigger re-render by creating a new Map instance
        };
    
        return userGoals.map((goal, index) => (
            <label key={index}>
                <input 
                    type="checkbox" 
                    onChange={() => handleCheckboxChange(index)} // Call the handler with the index
                />
                <span></span>
                <p>{goal}</p>
            </label>
        ));
    }

    function PersonalCard() {
        const [goalInput, setGoalInput] = useState('');

        function addGoal() {
            var myUser = dictionary.get(username);
            myUser.goals.push(goalInput);
            updateUser(myUser);
            //updateRender(rerender += 1);
            // GameNotifier.broadcastEvent("hooray", "I want to", "kiss strawberries");
        }
        
        return (
            <div className="card personal">
                <h1>{username}</h1>
                <div className="goals">  
                    <div className="goalList">
                        {/* {dictionary === null ? (
                            <p>Loading...</p> // Render loading message
                        ) : (
                            <PopulateGoalList />
                        )} */}
                        <PopulateGoalList />
                    </div>
                    <div className="addGoal"> 
                        <div id="addGoalInput">
                            <input type="text" id="goalInput" placeholder="Add Goal" value={goalInput} onChange={(e) => setGoalInput(e.target.value)} />
                        </div>
                        
                        <label id="addGoalButton">
                            <button className="btn" onClick={() => addGoal()}><i className='bx bx-plus-circle'></i></button>
                        </label>
                    </div>
                </div>
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
    function PopulateFriendsGoals(props) {
        var friendObject = dictionary.get(props.friendProp);
        
        const friendGoals = friendObject.goals;
        const goals = [];
        for (const [i, goal] of friendGoals.entries()) {
            goals.push(
                <label key={i}>
                    <input type="checkbox" />
                    <span></span>
                    <p>{goal}</p>
                </label>
            );
        }    
        return(goals);
    }

    function PopulateFriend() {
        var myUser = dictionary.get(username);
        
        const userFriends = myUser.friends;
        const friends = [];
        for (const [i, friend] of userFriends.entries()) {
            friends.push(
                <div className="card deleteFriend" key={i}>
                    <h1>{friend}</h1>
                        <div className="goals">
                        <PopulateFriendsGoals friendProp={friend}/>
                        </div>
                </div>
            );
        }    
        return(friends);
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
            {/* <PersonalCard /> */}
            {dictionary === null ? (
                <p>Loading...</p> // Render loading message
                ) : (
                <PersonalCard />
            )}            
            
            <PopulateQuoteCard />
            
            {/* <PopulateFriend /> */}
            {dictionary === null ? (
                <p>Loading...</p> // Render loading message
                ) : (
                <PopulateFriend />
            )}  
            
            <div className="card addfriend">
                <button className="btn" onClick={() => addFriend()}><i className='bx bx-plus-circle'></i></button>
                <p>Add Friend</p>
            </div>
            <div className="card" id="addFriendCard">
            </div>
        </div>
    </div>
  );
}