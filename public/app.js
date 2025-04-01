let buttons = document.querySelectorAll('.servers button')
let server = 1


buttons.forEach(btn => {
    btn.addEventListener('click', e=> {
        buttons.forEach(clr => {
            clr.classList.remove('active')
        })
        btn.classList.add('active')
    })
})

function setServer(val) {server = val}

async function follow() {
    let username = document.getElementById('user').value
    let password = document.getElementById('pass').value
    let instaID = document.getElementById('id').value
    // let postURL = document.getElementById('post').value
    const output = document.querySelector('.view');

    if (!username || !password || !instaID) {
        output.innerHTML += '<p>Please enter both username and password and ID</p>';
        return;
    }

    output.innerHTML += '<p>Running...</p>';
    try {
        const response = await fetch(`/follow/?server=${server}&username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}&instaID=${encodeURIComponent(instaID)}`)
        const text = await response.text();
        output.innerHTML += `<p>${text}</p>`;
    } catch (error) {
        output.innerHTML += `Error: ${error.message}</p>`;
    }
}
