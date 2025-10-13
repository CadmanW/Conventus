const formEl = document.querySelector("#login-form");

formEl.addEventListener("submit", async (event) => {
    event.preventDefault();

    const reqBody = {email: formEl.elements.email.value, password: formEl.elements.password.value};

    try {
        const response = await fetch("", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(reqBody)
        });

        if (!response.ok) {
            throw Error(`Response status: ${response.status}`);
        }

        const data = await response.json();

        console.log(data);


    } catch (e) {
        console.log(e);
    }

});