const BASE_ID = "appnsFgnlCfcgfek1";
const TABLE = "Projects";
const TOKEN =
  "patpEOf7IvM7kNzlp.a62985958d240f1a5272ec69667a228fc66d57689bf4bc002674c1a95b47a1bd";

//Loads projects from AirTable API
async function loadProjects() {
  //Fetch from link given (projects DB)
  const response = await fetch(
    `https://api.airtable.com/v0/${BASE_ID}/${TABLE}`,
    {
      headers: { Authorization: `Bearer ${TOKEN}` },
    },
  );
  return await response.json();
}

//Initializes the page by loading projects and displaying them
async function init() {
  let projectsArray = [];
  //Loads projects from AirTable API
  const projects = await loadProjects();
  //Adds each project to the projectsArray
  projects.records.forEach((project) => {
    projectsArray.push(project.fields);
  });
  //Sorts the projectsArray by ID in ascending order
  projectsArray.sort((a, b) => a.id - b.id);

  console.log(projectsArray);

  //Displays each project on the page
  projectsArray.forEach(project => {
    //Creates new element and adds a class to it
    let projectElement = document.createElement("div");
    projectElement.classList.add("project-item");

    //Creates the text container inside the project card
    let projectContent = document.createElement("div");
    projectContent.classList.add("project-item-content");

    let projectTitle = document.createElement("h3");
    projectTitle.classList.add("project-item-title");
    projectTitle.textContent = "PLACEHOLDER";

    let projectDescription = document.createElement("p");
    projectDescription.classList.add("project-item-description");
    projectDescription.textContent =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";

    projectContent.appendChild(projectDescription);
    projectContent.appendChild(projectTitle);
    projectElement.appendChild(projectContent);

    //Adds new element to page
    document.querySelector(".projects-list").appendChild(projectElement);
  });
};

init();


//---