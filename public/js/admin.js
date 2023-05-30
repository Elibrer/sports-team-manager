let idEl;
let usernameEl;
let emailEl;
let passwordEl;
let adminEl;
let teamNameEl;



let saveUserBtn;
let editUserButton;
let newUserBtn;
let userList;
let deleteBtn;
let viewBtn;


if (window.location.pathname === '/admin') {
  idEl = document.querySelector('.id-el');
  usernameEl = document.querySelector('.username-el');
  emailEl = document.querySelector('.email-el');
  passwordEl = document.querySelector('.password-el');
  adminEl = document.querySelector('.admin-el');
  teamNameEl = document.querySelector('.team-name-el');


  editUserButton = document.querySelector('.edit-user');
  saveUserBtn = document.querySelector('.save-user');
  newUserBtn = document.querySelector('.new-user');
  userList = document.querySelectorAll('.list-container .list-group');
  deleteBtn = document.querySelectorAll('.delete-user');
  viewBtn = document.querySelectorAll('.view-user');
}

// Show an element
const show = (elem) => {
  elem.style.display = 'inline';
};

// Hide an element
const hide = (elem) => {
  elem.style.display = 'none';
};

let activeUser = {};

const getUsers = () =>
  fetch('/api/users', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
});

const isAdmin = () => {
  let is_admin = isAdminEl.innerHTML;

  if (is_admin === 'true') {
    is_admin = true;
  } else {
    is_admin = false;
  } 
  console.log("Admin: " + is_admin)
  return is_admin;
}

const booleanCheck = (value) => {
  if (value === 'true') {
    return true;
  } else {
    return false;
  }
}

const editUser = async (userId, updateUser) => {
  console.log(updateUser)
  await fetch(`/api/users/${userId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updateUser),
  });
};

const saveUser = async (user) => {
  console.log(user)

  await fetch('/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  renderUserList();
};

const deleteUser = (id) => {
  return fetch(`/api/users/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

const renderActiveUser = async (userId) => {
    hide(saveUserBtn);
    
    if (userId) {
        const userData = await fetch(`/api/users/${userId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      const user = await userData.json();
      activeUser = user;
    
      console.log(activeUser.team.team_name)
      idEl.value = activeUser.id;
      usernameEl.value = activeUser.username;
      emailEl.value = activeUser.email;
      passwordEl.setAttribute('type', 'password')
      passwordEl.value = activeUser.password;
      adminEl.value = activeUser.is_admin;
      teamNameEl.value = activeUser.team.team_name;
    } else {
      idEl.value = '';
      idEl.setAttribute('readonly', true);
      usernameEl.value = '';
      emailEl.value = '';
      passwordEl.value = '';
      adminEl.value = '';
      adminEl.setAttribute('placeholder', 'true/false');
      teamNameEl.value = '';
    }
  };
const handleUserEdit = async () => {
  let userId = activeUser.id;
  let admin = booleanCheck(adminEl.value);

  const updateUser = {
    username: usernameEl.value,
    email: emailEl.value,
    password: passwordEl.value,
    is_admin: admin,
    team_name: teamNameEl.value,
  };

  await editUser(userId, updateUser);
  location.reload();
}

const handleUserSave = async () => {
    let admin = booleanCheck(adminEl.value);
    const newUser = {
      username: usernameEl.value,
      email: emailEl.value,
      password: passwordEl.value,
      is_admin: admin,
      team_name: teamNameEl.value,
      };
    console.log(newUser)
    
    await saveUser(newUser);
    location.reload();
  };

const handleUserDelete = async (e, userId) => {
    e.stopPropagation();
    console.log("DELETE!")
    if (activeUser.id === userId) {
      activeUser = {};
    }
    modal.style.display = "block";

    modalBtn.addEventListener('click', async () => {
      modal.style.display = "none";
      try {
        const delResponse = await deleteUser(userId);
        if (delResponse.ok) {
          console.log("DELETED!!!!!!!!")
          getAndRenderUsers();
          renderActiveUser();
          location.reload();
        }
      } catch (error) {
        console.log(error);
      }
    });       
};

const handleUserView = async (e, userId) => {
    newUserMode = false;
    saveMode = true;
    show(editUserButton)
    e.preventDefault();
    console.log(userId)
    renderActiveUser(userId);
};

const handleNewUserView = (e) => {
    newUserMode = true;
    saveMode = false;
    hide(editUserButton);
    activeUser = {};
    renderActiveUser();
};

const handleRenderSaveBtn = () => {
    if (!usernameEl.value.trim() || !emailEl.value.trim() || !adminEl.value.trim() || !teamNameEl.value.trim()) {
      hide(saveUserBtn);
    } else {
      if (newUserMode === true) {
      show(saveUserBtn);
      } else {
        hide(saveUserBtn);
      }
    }
};

const renderUserList = async () => {
  
    const viewButtons = document.querySelectorAll('.view-user');
    viewButtons.forEach((button) => {
      const userId = button.getAttribute('data-view');
      button.addEventListener('click', (e) => handleUserView(e, userId));
    });

    const deleteButtons = document.querySelectorAll('.delete-user');
    deleteButtons.forEach((button) => {
      const userId = button.getAttribute('data-delete');

      button.addEventListener('click', (e) => handleUserDelete(e, userId));
    });
};


const getAndRenderUsers = async () => {
  hide(editUserButton)
  if (!saveMode) {
    handleRenderSaveBtn();
  }
  getUsers();
  handleNewUserView()
  await renderUserList();
}

if (window.location.pathname === '/admin') {
    editUserButton.addEventListener('click', handleUserEdit);
    saveUserBtn.addEventListener('click', handleUserSave);
    newUserBtn.addEventListener('click', handleNewUserView);
    idEl.addEventListener('keyup', handleRenderSaveBtn);
    usernameEl.addEventListener('keyup', handleRenderSaveBtn);
    emailEl.addEventListener('keyup', handleRenderSaveBtn);
    passwordEl.addEventListener('keyup', handleRenderSaveBtn);
    adminEl.addEventListener('keyup', handleRenderSaveBtn);
    teamNameEl.addEventListener('keyup', handleRenderSaveBtn);
}

const modalBtn = document.getElementById("modal-close");
const modalCancel = document.getElementById("modal-cancel");

var span = document.getElementsByClassName("close")[0];

var modal = document.querySelector("#myModal");
if (modal !== null) {
  modal.style.display = "none";
}
modalCancel.onclick = function() {
  modal.style.display = "none";
  location.reload();
}
span.onclick = function() {
  modal.style.display = "none";
  location.reload();
}

let saveMode = true;
getAndRenderUsers();