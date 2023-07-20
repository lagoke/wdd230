function updateSubmittedDrinksCount() {
    let count = localStorage.getItem("submittedDrinksCount");
    count = count ? parseInt(count) + 1 : 1;
    localStorage.setItem("submittedDrinksCount", count);
    displaySubmittedDrinksCount();
  }
  
  function displaySubmittedDrinksCount() {
    const count = localStorage.getItem("submittedDrinksCount") || 0;
    const infoCard = document.getElementById("info-card");
    if (infoCard) {
      infoCard.textContent = `Total Submitted Specialty Drinks: ${count}`;
    }
  }
  displaySubmittedDrinksCount();