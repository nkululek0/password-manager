// create password account function
async function createPasswordAccount(accountName, accountUsername, accountPassword) {
    try {
        let response = await fetch(`/api/create-password-account/users/${ username }`, {
            method: "PATCH",
            body: JSON.stringify({ accountName, accountUsername, accountPassword }),
            headers: { "Content-Type": "application/json" }
        });

        let data = await response.json();

        if(data.user) {
            return true
        }

        if(data.error) {
            return data.error;
        }
    } catch(err) {
        console.log(err);
    }
}

// update password account function
async function updatePasswordAccount(accountName, accountUsername, accountPassword) {
    try {
        let response = await fetch(`api/update-password-account/users/${ username }/${ accountName }`, {
            method: "PATCH",
            body: JSON.stringify({ accountName, accountUsername, accountPassword }),
            headers: { "Content-Type": "application/json" }
        });

        let data = await response.json();

        if(data.user) {
            return true;
        }

        if(data.error) {
            console.log(data);
            return data.error;
        }
    } catch(err) {
        console.log(err);
    }
}

// delete password account
async function deletePasswordAccount(accountName) {
    try {
        let response = await fetch(`/api/delete-password-account/users/${ username }/${ accountName }`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" }
        });

        let data = await response.json();

        if(data.user) {
            return true;
        } else if(data.error) {
            return data.error;
        }
    } catch(err) {
        console.error(err);
    }
}

// delete user account
async function deleteUserAccount(email) {
    try {
        let response = await fetch(`/api/delete-user-account/users/${ email }`, {
            method: "DELETE",
            headers: { "Content-type": "application/json" }
        });

        let data = await response.json();

        if(data.error) {
            alert(data.error);
            return data.error;
        } else {
            return true;
        }
    } catch(err) {
        console.error(err);
    }
}