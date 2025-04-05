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

async function follow(e) {
    e.disabled = true
    output.innerHTML = `<p>Started Server${server}</p>`

    let username = document.getElementById('user').value
    let password = document.getElementById('pass').value
    let instaID = document.getElementById('id').value
    // let postURL = document.getElementById('post').value

    if (!username || !password || !instaID) {
        output.innerHTML += '<p>Please enter both username and password and ID</p>';
        e.disabled = false
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
        e.disabled = false
    }

    eventSource.addEventListener('done', () => {
        output.innerHTML += `<p>:)</p>`
        eventSource.close()
        e.disabled = false
    })
}

async function like(e) {
    e.disabled = true
    output.innerHTML = `<p>Started Server${server}</p>`

    let username = document.getElementById('user').value
    let password = document.getElementById('pass').value
    let postLink = document.getElementById('post').value

    if (!username || !password || !postLink) {
        output.innerHTML += '<p>Please enter both username and password and Link</p>'
        e.disabled = false
        return;
    }

    const eventSource = new EventSource(`/like/?server=${server}&username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}&postLink=${encodeURIComponent(postLink)}`)

    eventSource.onmessage = (event) => {
        output.innerHTML += `<p>${event.data}</p>`;
    }

    eventSource.onerror = (error) => {
        console.log(error)
        output.innerHTML += `<p>Some error occured. Try again...</p>`;
        eventSource.close()
        e.disabled = false
    }

    eventSource.addEventListener('done', () => {
        output.innerHTML += `<p>:)</p>`
        eventSource.close()
        e.disabled = false
    })
}
