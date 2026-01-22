
// Use local backend if running on localhost, otherwise use relative /api for Vercel
const API_BASE = window.location.hostname === 'localhost' ? 'http://localhost:8050' : '';

async function fetchUsers() {
  try {
    const res = await fetch(`${API_BASE}/api/users`);
    const users = await res.json();
    const usersDiv = document.getElementById('users');
    usersDiv.innerHTML = '';
    users.forEach(user => {
      const userDiv = document.createElement('div');
      userDiv.className = 'user';
      userDiv.innerHTML = `
        <img class="avatar" src="${user.avatar || 'https://via.placeholder.com/64'}" alt="avatar">
        <div class="info">
          <div class="name">${user.name || 'No Name'}</div>
          <div class="bio">${user.bio || ''}</div>
          <div class="repos">Repos: ${user.repos ?? 'N/A'}</div>
        </div>
      `;
      usersDiv.appendChild(userDiv);
    });
  } catch (err) {
    document.getElementById('users').innerText = 'Failed to load users.';
  }
}

fetchUsers();


async function addUser(username) {
  try {
    const res = await fetch(`${API_BASE}/api/github-user`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username })
    });
    if (!res.ok) {
      const err = await res.json();
      alert(err.message || 'Failed to add user');
    } else {
      fetchUsers();
    }
  } catch (err) {
    alert('Failed to add user');
  }
}

document.getElementById('githubForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const username = document.getElementById('usernameInput').value.trim();
  if (username) {
    addUser(username);
    document.getElementById('usernameInput').value = '';
  }
});

fetchUsers();
