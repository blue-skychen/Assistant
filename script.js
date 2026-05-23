async function sendMessage() {
  const input = document.getElementById("input");
  const role = document.getElementById("role").value;
  const chat = document.getElementById("chat");

  const message = input.value;
  if (!message) return;

  // 显示用户消息
  chat.innerHTML += `<p><b>你：</b>${message}</p>`;

  input.value = "";

  // 请求后端
  const res = await fetch("http://localhost:3000/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ message, role })
  });

  const data = await res.json();

  // 显示AI回复
  chat.innerHTML += `<p><b>AI：</b>${data.reply}</p>`;
}