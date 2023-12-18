// Variabel för länk
const url = 'http://localhost:3000/users';

// Global styling
document.documentElement.style.cssText = `
  font-size: 62.5%;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
`;

// Ändra bakgrundsfärg på sidan
document.body.style.backgroundColor = '#eef1ff';

// Variabel och Styling för ulElement
const ulElement = document.createElement('ul');
ulElement.style.cssText = `
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
  list-style: none;
  font-family: Arial, sans-serif;
`;

// Lägg till ulElement till DOM-strukturen
document.body.appendChild(ulElement);

// Async funktion för att hämta data
async function fetchData() {
  try {
    const response = await fetch(url); // vänta på svar

    if (!response.ok) {
      // om fel, kasta status
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    //Konvertera till JSON, logga data samt skapa felmeddelande vid error
    const data = await response.json();
    displayUsers(data);
    console.log(data); // logga data
  } catch (error) {
    console.error("Error fetching data:", error); // logga fel
  }
}

// Anropa funktionen displayUsers för att visa användardata
function displayUsers(usersData) {
  const userList = ulElement;
  userList.innerHTML = '';

  // För varje user skapas ett liElement och dess styling
  usersData.forEach(user => {
    const li = document.createElement('li');
    li.style.cssText = `
      width: 50%;
      text-align: center;
      border: .5rem solid black;
      border-radius: 1rem;
      margin-block: 1rem;
      padding: 1rem;
    `;

    // För varje user skapas ett h2 och p element
    const contentHeader = document.createElement('h2');
    const contentParagraph = document.createElement('p');

    // Header innehåller users first name och Paragraph innehåll all info om user
    contentHeader.textContent = user.firstName;
    contentParagraph.textContent = `id: ${user.id}, first name: ${user.firstName}, last name: ${user.lastName}, username: ${user.username}, color: ${user.color}`;

    // Styling på Header, vars färg beror på user.color
    contentHeader.style.cssText = `
      font-size: 2rem;
      color: ${user.color};
    `;

    // Font size paragraph
    contentParagraph.style.fontSize = '1.5rem';

    // lägg till event listeners till li elementen
    li.addEventListener('mouseover', () => { // när muspekaren hovrar över 
      contentHeader.style.color = 'black';
      li.style.cursor = 'pointer';
      li.style.backgroundColor = user.color;
    });

    li.addEventListener('mouseout', () => { // när muspekaren är utanför 
      contentHeader.style.color = user.color;
      li.style.cursor = 'default';
      li.style.backgroundColor = '#C9E4E7';
    });

    // lägg till javascript element i html dokumentet
    userList.appendChild(li);
    li.appendChild(contentHeader);
    li.appendChild(contentParagraph);
  });
}

fetchData();