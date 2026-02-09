async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch("http://localhost:8002/api/login", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  if (data.success) {
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("home").style.display = "block";
  } else {
    document.getElementById("error").innerText = data.message;
  }
}
