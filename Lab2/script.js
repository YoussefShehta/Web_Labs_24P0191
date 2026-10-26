const nameInput = document.getElementById("name");
const greetBtn = document.getElementById("greet");
const title = document.getElementById("title");
const list = document.getElementById("list");

greetBtn.addEventListener("click", function () {
  const name = nameInput.value.trim(); 
  if (name !== "") {
    title.textContent = "Hello, " + name + "!";
    const li = document.createElement("li");
    li.textContent = name;
    list.appendChild(li); 
    nameInput.value = "";
    li.addEventListener("click", function () {
      title.textContent = "Goodbye, " + name + "!"; 
      li.remove(); 
    });

  }
});