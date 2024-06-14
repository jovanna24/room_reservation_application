const loginFormHandler = async (event) => {
  event.preventDefault();

  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    try{

    const response = await fetch('/fetch', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/events');
    } else {
      const result = await response.json();
      alert(response.statusText);
    }
  } catch (error) {
    console.error('Error: ', error);
    alert('Failed to log in');
  }
}
};

const signupFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#name-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (name && email && password) { 
    try {
    const response = await fetch('/events', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/events');
    } else {
      const result = await response.json();
      alert(result.error || response.statusText);
    }
  } catch (error) {
    console.error ('Error: ', error); 
    alert('Failed to sign up!');
  }
}
};

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);
