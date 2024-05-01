// popup.js
document.addEventListener("DOMContentLoaded", function () {
  const nameInput = document.getElementById("nameInput");
  const linkInput = document.getElementById("linkInput");
  const saveButton = document.getElementById("saveButton");
  const linkList = document.getElementById("linkList");

  saveButton.addEventListener("click", function () {
    const name = nameInput.value;
    const link = linkInput.value;

    if (name && link) {
      const savedLinks = JSON.parse(localStorage.getItem("savedLinks")) || [];
      savedLinks.push({ name, link });
      localStorage.setItem("savedLinks", JSON.stringify(savedLinks));

      displayLinks();
    }
  });

  function displayLinks() {
    linkList.innerHTML = "";
    const savedLinks = JSON.parse(localStorage.getItem("savedLinks")) || [];
    savedLinks.forEach((savedLink, index) => {
      const linkElement = document.createElement("div");
      linkElement.className = "link-item";

      const anchorElement = document.createElement("a");
      anchorElement.href = savedLink.link;
      anchorElement.textContent = savedLink.name;
      anchorElement.target = "_blank";

      const deleteButton = document.createElement("button");
      deleteButton.className = "delete-button";
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", function () {
        savedLinks.splice(index, 1);
        localStorage.setItem("savedLinks", JSON.stringify(savedLinks));
        displayLinks();
      });
      nameInput.value = ""; // Clear the name input field
      linkInput.value = ""; // Clear the link input field

      linkElement.appendChild(anchorElement);
      linkElement.appendChild(deleteButton);
      linkList.appendChild(linkElement);
    });
  }

  displayLinks();
});
