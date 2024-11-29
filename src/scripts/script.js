document.addEventListener("DOMContentLoaded", () => {
    const sidebarContainer = document.getElementById("sidebar-container");
  
    // Fetch and load sidebar.html
    fetch("components/sidebar.html")
      .then((response) => response.text())
      .then((html) => {
        sidebarContainer.innerHTML = html;
      })
      .catch((error) => {
        console.error("Error loading sidebar:", error);
      });
  });
  