const socket = io("https://chat-application-gamma-ruby.vercel.app/");

let currentUser = "";

/* Join Chat */

function joinChat(){

    const username =
    document.getElementById("username").value.trim();

    if(username === ""){
        alert("Please enter username");
        return;
    }

    currentUser = username;

    socket.emit("join", username);

    document.getElementById("joinScreen")
    .style.display = "none";

    document.getElementById("chatScreen")
    .style.display = "flex";
}

/* Send Message */

function sendMessage(){

    const input =
    document.getElementById("messageInput");

    const message = input.value.trim();

    if(message === "") return;

    socket.emit("chatMessage", message);

    input.value = "";
}

/* Enter Key */

document.addEventListener("DOMContentLoaded",()=>{

    const input =
    document.getElementById("messageInput");

    input.addEventListener("keypress",(e)=>{

        if(e.key === "Enter"){
            sendMessage();
        }

    });

});

/* Receive Messages */

socket.on("message",(data)=>{

    const messages =
    document.getElementById("messages");

    const div =
    document.createElement("div");

    div.classList.add("msg");

    if(data.user === "System"){
        div.classList.add("system");
    }

    div.innerHTML = `
        <strong>${data.user}</strong><br>
        ${data.text}
    `;

    messages.appendChild(div);

    messages.scrollTop =
    messages.scrollHeight;
});

/* Online Users */

socket.on("users",(users)=>{

    const userList =
    document.getElementById("users");

    userList.innerHTML = "";

    users.forEach(user=>{

        const li =
        document.createElement("li");

        li.textContent = "🟢 " + user;

        userList.appendChild(li);
    });

});