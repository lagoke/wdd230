const url = 'https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json';
  
async function getProphetData() {
  const response = await fetch(url);
  const data = await response.json();
  displayProphets(data.prophets);
  console.table(data.prophets);
}

getProphetData();



const displayProphets = (prophets) => {
    const cards = document.querySelector('div.cards');
  
    prophets.forEach((prophet) => {
      let card = document.createElement('section');
      let h2 = document.createElement('h2');
      let portrait = document.createElement('img');
      let birthdate = document.createElement('p');
      let birthplace = document.createElement('p');
  
      h2.textContent = `${prophet.name} ${prophet.lastname}`;
      portrait.setAttribute('src', prophet.imageurl);
      portrait.setAttribute('alt', `Portait of ${prophet.name} ${prophet.lastname}`);
      portrait.setAttribute('loading', 'lazy');
      portrait.setAttribute('width', '340');
      portrait.setAttribute('height', '440');
  
      birthdate.textContent = `Date of Birth: ${prophet.birthdate}`;
      birthplace.textContent = `Place of birth: ${prophet.birthplace}`;
  
      card.appendChild(h2);
      card.appendChild(birthdate);
      card.appendChild(birthplace);
      card.appendChild(portrait);
     
  
      cards.appendChild(card);
    });
  };
