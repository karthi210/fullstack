fetch("/api/health")
  .then(res => res.json())
  .then(data => {
    document.getElementById("status").innerText = data.message;
  })
  .catch(() => {
    document.getElementById("status").innerText = "Backend not reachable";
  });
