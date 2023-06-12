function createCompanyElement(company, displayType) {
    const li = document.createElement('li');
  
    const name = document.createElement('h4');
    name.textContent = company.company;
    li.appendChild(name);
  
    if (displayType === 'grid') {
      const logo = document.createElement('img');
      logo.src = company.logo;
      logo.alt = `${company.company} logo`;
      li.appendChild(logo);
  
      const address = document.createElement('p');
      address.textContent = company.address;
      address.classList.add('company-address');
      li.appendChild(address);
  
      const phone = document.createElement('p');
      phone.textContent = company.phone;
      phone.classList.add('phone-number');
      li.appendChild(phone);
    }
  
    const website = document.createElement('a');
    website.href = company.websiteurl;
    website.textContent = company.websiteurl;
    li.appendChild(website);
  
    const membership = document.createElement('p');
    membership.textContent = `Membership level: ${company.membershiplevel}`;
    membership.classList.add('membership-level');
    li.appendChild(membership);
  
    li.classList.add(displayType);
    return li;
  }
  
  
  function displayCompanies(data, displayType) {
    const companyList = document.querySelector('.company-list');
    companyList.innerHTML = '';
  
    data.forEach(company => {
      const li = createCompanyElement(company, displayType);
      companyList.appendChild(li);
    });
  }
  
  fetch('data.json')
    .then(response => response.json())
    .then(data => {
      displayCompanies(data, 'list');
  
      document.getElementById('gridBtn').addEventListener('click', () => {
        displayCompanies(data, 'grid');
      });
  
      document.getElementById('listBtn').addEventListener('click', () => {
        displayCompanies(data, 'list');
      });
    })
    .catch(error => console.error(error));
  
  
    document.getElementById("gridBtn").addEventListener("click", function() {
      const companyList = document.querySelector(".company-list");
      companyList.style.display = "grid";
      companyList.style.gridTemplateColumns = "1fr 1fr";
    });
    
    document.getElementById("listBtn").addEventListener("click", function() {
      const companyList = document.querySelector(".company-list");
      companyList.style.display = "flex";
      companyList.style.flexDirection = "column";
    });
  
    function toggleButtons() {
    const gridBtn = document.getElementById('gridBtn');
    const listBtn = document.getElementById('listBtn');
  
    if (window.innerWidth < 560) {
      gridBtn.style.display = 'none';
      listBtn.style.display = 'none';
    } else {
      gridBtn.style.display = 'inline-block';
      listBtn.style.display = 'inline-block';
    }
  }
  
  // Only toggleButtons when the script is loaded
  toggleButtons();
  
  // Add an event listener to the window resize event
  window.addEventListener('resize', toggleButtons);
  
  