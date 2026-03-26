let notifyActivator = document.querySelector("#notifyActivator");
let notifyArea = document.querySelector("#notifyArea");
notifyActivator.addEventListener("click",function(){
   let newNotification = document.createElement("p");
   newNotification.textContent = "🔔 New Notification!"
   notifyArea.appendChild(newNotification);

});