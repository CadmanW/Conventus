const formEl = document.querySelector("#login-form");

formEl.addEventListener("submit", async (event) => {
    event.preventDefault();

    const reqBody = {email: formEl.elements.email.value, password: formEl.elements.password.value};

    try {
        const response = await fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(reqBody)
        });

        if (!response.ok) {
            throw Error(`Response status: ${response.status}`);
        }

        const responseJSON = await response.json();

        if (responseJSON.account_created) {
            alert(`Account for ${reqBody.email} created. You may now login.`)
        }

        if (responseJSON.login_success) {
            location.replace("/main/main.html");
        }

        console.log(responseJSON);


    } catch (e) {
        console.log(e);
    }

});