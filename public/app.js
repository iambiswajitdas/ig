let buttons = document.querySelectorAll('.servers button')
const output = document.querySelector('.view')
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
    output.innerHTML = ''

    let username = document.getElementById('user').value
    let password = document.getElementById('pass').value
    let instaID = document.getElementById('id').value
    // let postURL = document.getElementById('post').value

    if (!username || !password || !instaID) {
        output.innerHTML += '<p>Please enter both username and password and ID</p>';
        return;
    }

    const eventSource = new EventSource(`/follow/?server=${server}&username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}&instaID=${encodeURIComponent(instaID)}`)

    eventSource.onmessage = (event) => {
        output.innerHTML += `<p>${event.data}</p>`;
    }

    eventSource.onerror = (error) => {
        console.log(error)
        output.innerHTML += `<p>Some error occured. Try again...</p>`;
        eventSource.close()
    }

    eventSource.addEventListener('done', () => {
        output.innerHTML += `<p>:)</p>`
        eventSource.close()
    })
}
