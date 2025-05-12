const PORT = 5000;

// Function to fetch and display users
async function fetchUsers() {
    try {
    const response = await fetch(`http://localhost:${PORT}/api/users`);
        if (!response.ok) {
            console.log('An error happened during the request');
        }
        const users = await response.json();
        const userList = document.getElementById('userList');
        users.forEach(user => {
            const li = document.createElement('li');
            li.textContent = `ID: ${user.id}, Name: ${user.name}, Email: ${user.email}`;
            userList.appendChild(li);
        });
    } catch (error) {
        console.error('Error fetching users:', error);
    }
}

// Function to fetch and display items
async function fetchItems() {
    try {
    const response = await fetch(`http://localhost:${PORT}/api/items`);
        if (!response.ok) {
            console.log('An error happened during the request');
        }
        const items = await response.json();
        const itemList = document.getElementById('itemList');
        items.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `ID: ${item.id}, Name: ${item.name}, Type: ${item.type}, Effect: ${item.effect}`;
            itemList.appendChild(li);
        });
    } catch (error) {
        console.error('Error fetching items:', error);
    }
}

async function main(){
  const buttonUsers = document.getElementById("fetchUsersButton");
  buttonUsers.addEventListener('click', fetchUsers);
  const buttonItems = document.getElementById("fetchItemsButton");
  buttonItems.addEventListener('click', fetchItems);
}

main()
