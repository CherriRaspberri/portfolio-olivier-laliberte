const BASE_ID = "portfolio_projects";
const TABLE = "Projects";
const TOKEN =
  "patpEOf7IvM7kNzlp.a62985958d240f1a5272ec69667a228fc66d57689bf4bc002674c1a95b47a1bd";
const projects = 0;

//Loads projects from AirTable API
function loadProjects() {
  //Fetch from link given (projects DB)
  fetch(`https://api.airtable.com/v0/${BASE_ID}/${TABLE}`, {
    headers: { Authorization: `Bearer ${TOKEN}` },
  })
    .then((response) => {
      //Error checks :
      //- Checks if response is not ok
      //- Checks if response finds nothing
      if (!response.ok) {
        throw new Error("Network response was not ok");
      } else if (response.status === 404) {
        throw new Error("Project not found");
      }
      //Returns response in json
      return response.json();
    })
    //Error catch : displays error msgs to console
    .catch((error) => {
      console.error("Error fetching project:", error);
    });
}

function init() {
  loadProjects().then((projects) => {
    console.table(projects);
  });
}

init();

projects.forEach((project) => {
  // Do something with each project, e.g., display it on the page
  console.log(project);

  /* 
  let projectElement = document.createElement("div");
  projectElement.classList.add("project-item");
  projectElement.textContent = project.name;
  document.querySelector(".projects-list").appendChild(projectElement);
  */
});
