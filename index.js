const USERS_URL = 'http://localhost:3000/users'
const form = document.querySelector('form')

form.addEventListener('submit', createUser)
getUsers()

function createUser(event){
    event.preventDefault()

    const formData = new FormData(event.target)
    const username = formData.get('username')
    const password = formData.get('password')

    fetch(USERS_URL, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-type": "application/json"
        },
        body: JSON.stringify({ username, password })
    }).then(response => response.json())
        .then(console.log)
}

function getUsers(){
    fetch(USERS_URL)
        .then(response => response.json())
        .then(displayUsers)
}

function displayUsers(users){
    const usersContainer = document.querySelector('#users')

    users.forEach(user => {
        const card = document.createElement('div')
        const username = document.createElement('p')
        const editUserName = document.createElement('form')
        const usernameField = document.createElement('input')
        const submitButton = document.createElement('input')
        const deleteButton = document.createElement('button')
        
        card.className = 'card'
        username.textContent = user.username
        usernameField.name = "username"
        usernameField.type = "text"
        usernameField.placeholder = "Enter Username"
        submitButton.type = "submit"
        submitButton.value = "Submit"
        editUserName.id = 'update-button'
        deleteButton.textContent = "Delete User"

        card.append(username, editUserName)
        editUserName.append(usernameField, submitButton, deleteButton)
        usersContainer.appendChild(card)

        editUserName.addEventListener('submit', (event) => updateUser(event, user))
        deleteButton.addEventListener('click', () => deleteUser(user))
    })
}

function updateUser(event, user) {
    event.preventDefault()

    const formData = new FormData(event.target)
    const username = formData.get('username')

    fetch(`${USERS_URL}/${user.id}`, {
        method: "PATCH",
        headers: {
            "Accept": "application/json",
            "Content-type": "application/json"
        },
        body: JSON.stringify({ username })
    }).then(response => response.json())
        .then(console.log)

}

function deleteUser(user) {
    fetch(`${USERS_URL}/${user.id}`, {
        method: "DELETE"
    }).then(response => response.json())
        .then(console.log)
}