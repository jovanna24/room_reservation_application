const loginFormHandler = async (event) => {
  event.preventDefault();

  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    try{

    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      const result = await response.json();
      alert(result.error);
    }
  } catch (error) {
    console.error('Error: ', error);
    alert('Failed to log in');
  }
}
};
const createEvent = async (eventData) => {
  try {
    const response = await fetch('/api/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(eventData)
    });

    if (response.ok) {
      const newEvent = await response.json();
      console.log('Created event:', newEvent);
    } else {
      const errorData = await response.json();
      console.error('Failed to create event:', errorData.error);
      // Handle error case on the client side
    }
  } catch (error) {
    console.error('Error creating event:', error);
  }
};


const signupFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#name-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (name && email && password) { 
    try {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/profile');
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
