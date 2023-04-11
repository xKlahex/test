
const submitButton = document.getElementById('submitButton');


submitButton.addEventListener('click', function(event) {

  event.preventDefault();
  

  const userName = document.getElementById('userName').value;
  

  function checkOnlineStatus() {
    fetch(`https://www.habbo.com/api/public/users?name=${userName}`)
      .then(response => response.json())
      .then(data => {
        // Check if the user is online
        if (data.online) {
          // Send a notification if the user is online
          if (Notification.permission === "granted") {
            new Notification(`User ${userName} is online!`);
          } else if (Notification.permission !== "denied") {
            Notification.requestPermission().then(permission => {
              if (permission === "granted") {
                new Notification(`User ${userName} is online!`);
              }
            });
          }
        }
      })
      .catch(error => console.error(error));
  }
  
  // Call the checkOnlineStatus function every 5 minutes
  setInterval(checkOnlineStatus, 1500);
});
