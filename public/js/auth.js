const miFormulario = document.querySelector('form');

const url = (window.location.hostname.includes('localhost'))
        ?'http://localhost:8080/api/auth/'
        :'http://localhost:8080/api/auth/';


miFormulario.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = {};

    for(let el of miFormulario.elements){
        if(el.name.length > 0)
            formData[el.name] = el.value;
    }

    fetch(url + 'login', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: { 'Content-Type':'application/json' }
    })
    .then(resp => resp.json())
    .then(({msg,token}) => {
        if(msg)
            return console.error(msg);

        localStorage.setItem('token', token);
        window.location = 'chat.html';
    })
    .catch(console.log)
});

function handleCredentialResponse(response) {
    const data = { id_token: response.credential }
    fetch(url+'google', {
        method: 'POST',
        headers: { 'Content-Type':'application/json' },
        body: JSON.stringify(data)
    }).then(resp => resp.json())
        .then(data => {
            const { token } = data;
            // console.log(token)
            localStorage.setItem('token', token);

            // console.log('Nuestro server',data)
            localStorage.setItem('email',data.usuario.correo)
            window.location = 'chat.html';
        })
        .catch(console.log)
        // console.log("Encoded JWT ID token: " + response.credential);
}

const button = document.getElementById('google_signout');
button.onclick = () => {
//   console.log(google.accounts.id);
  google.accounts.id.disableAutoSelect();
  // Borrar la sesion del correo de gmail
  google.accounts.id.revoke(localStorage.getItem('email'), done => {
    localStorage.clear();
    location.reload();
  });
}

window.onload = function () {
  google.accounts.id.initialize({
    client_id: "450011682165-msqlcp5jb0811g2eqnc12kk682t6h4mi.apps.googleusercontent.com",
    callback: handleCredentialResponse
  });
  google.accounts.id.renderButton(
    document.getElementById("buttonDiv"),
    { theme: "outline", size: "large" }  // customization attributes
  );
  google.accounts.id.prompt(); // also display the One Tap dialog
}