// localStorage.setItem('user', 'Bob');

// let user = localStorage.getItem('user');
// if (user) {
//     console.log(user);
// }


// let showAlert = localStorage.getItem('showAlert');
// if (!showAlert) {
//     alert('Hello');
//     localStorage.setItem('showAlert', true);
// }

// let user = {
//     name: 'Alica',
//     age: 29,
//     phone: '+3806479286561'
// }

// localStorage.setItem('user', JSON.stringify(user));


// let saveUser = JSON.parse(localStorage.getItem('user'));
// if (saveUser) {
//     console.log(saveUser);
//     // localStorage.removeItem('user');
// }


// sessionStorage.setItem('expiredDate', new Date());

let users = [];

const form = document.querySelector('.form-add-user');
const listUsers = document.querySelector('tbody');
const userInfo = document.querySelector('.user-info');

displaySavedUsers();

form.addEventListener('submit', function(e) {
    e.preventDefault();

    const name = form.elements['name'].value;
    const phone = form.elements['phone'].value;
    const age = form.elements['age'].value;

    const mode = form.getAttribute('data-mode');
    switch(mode) {
        case 'add':
            const user = {
                id: generateIdUser(),
                name,
                phone,
                age
            }
        
            users.push(user);
            addRowUserToTable(user);

            updateStorage();
        break;
        case 'edit':
            const id = +form.getAttribute('data-id');
            const userEdit = {
                id,
                name,
                phone,
                age
            }
            const indexUser = users.findIndex((user) => user.id === id);
            users.splice(indexUser, 1, userEdit);

            listUsers.innerHTML = '';

            users.forEach((user) => {
                addRowUserToTable(user);
            });

            updateStorage();

            // form.reset();
            // form.removeAttribute('data-id');
        break;
    }
});


listUsers.addEventListener('click', function(e) {
    const target = e.target;
    if (target.classList.contains('btn-view')) {
        const id = +target.closest('tr').getAttribute('data-id');
        const user = users.find((user) => user.id === id);
        if (user) {
            userInfo.innerHTML = JSON.stringify(user);
        }
    }
    if (target.classList.contains('btn-edit')) {
        form.classList.add('open');
        form.setAttribute('data-mode', 'edit');
        const id = +target.closest('tr').getAttribute('data-id');
        const user = users.find((user) => user.id === id);
        if (user) {
            form.setAttribute('data-id', user.id);
            form.elements['name'].value = user.name;
            form.elements['phone'].value = user.phone;
            form.elements['age'].value = user.age;
        }
    }
    if (target.classList.contains('btn-delete')) {
        const user = target.closest('tr');
        const id = Number(user.getAttribute('data-id'));
        const index = users.findIndex((userId) => userId.id === id);
        console.log(index);  
        if (index !== -1) {
            deleteConfirm()
                function  deleteConfirm(){
                    var del=confirm("Are you sure you want to delete this user?");
                    if (del==true){
                        users.splice(index, 1);
                        user.remove();
                        updateStorage();
                        alert ("User will be deleted")
                       
                    }else{
                        alert("User Not Deleted")
                    }
                    return del;
                }
        }       

    }   
});


btnAddUser.addEventListener('click', function() {
    form.classList.toggle('open');
    form.setAttribute('data-mode', 'add');
});

btnCloseForm.addEventListener('click', function() {
    form.classList.toggle('open');
});

function displaySavedUsers() {
    let savedUser = localStorage.getItem('users');
    if (savedUser) {
        users = JSON.parse(savedUser);
        users.forEach((user) => {
            addRowUserToTable(user);
        });
    }
}   

function updateStorage() {
    localStorage.setItem('users', JSON.stringify(users));
}

function generateIdUser() {
    let id;
    if (users.length === 0) {
        id = 1;
    } else {
        id = users[users.length - 1].id + 1;
    }
    return id;
}

function addRowUserToTable(user) {
    listUsers.insertAdjacentHTML('beforeend', 
    '<tr data-id="'+user.id+'">'+
        '<td>'+
            user.id+
        '</td>'+
        '<td>'+
            user.name+
        '</td>'+
        '<td>'+
            user.phone+
        '</td>'+
        '<td>'+
            user.age+
        '</td>'+
        '<td>'+
            '<button class="btn-view">View</button>'+
            '<button class="btn-edit">Edit</button>'+
            '<button class="btn-delete">Delete</button>'+
        '</td>'+
    '</tr>'
    );
}

