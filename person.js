function login() {
    
    if (localStorage.getItem("dictionary") === null) {
        localStorage.setItem('dictionary', JSON.stringify(new Map));
    }
    
    dictionary = JSON.parse(localStorage.getItem('dictionary'));
    
    const nameEl = document.querySelector("#username");
    
    dictionary.set(nameEl, new Person(nameEl));
    
    localStorage.setItem("dictionary", dictionary);
    
    window.location.href = "main.html";
  }

class Person {
    userName;
    goals;
    friends;

    constructor(userName) {
        this.userName = userName;
        this.goals = []
        this.friends = []
    }

    addFriend(person) {
        this.friends.push(person);
    }

    addGoal(goal) {
        this.goals.push(goal);
    }
}