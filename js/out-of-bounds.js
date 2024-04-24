if (document.querySelector('[data-blocked="true"]')) {
    var overlay = document.createElement('div');
    overlay.className = "overlay";

    var message = document.createElement('div');
    message.className = "message text-body";
    message.innerHTML = "Deze functionaliteit is momenteel buiten scope.";

    overlay.appendChild(message);
    document.body.appendChild(overlay);
    
    setTimeout(() => { window.history.back() }, 2000);
}