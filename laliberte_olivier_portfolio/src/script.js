const BASE_ID = "appnsFgnlCfcgfek1";
const TABLE = "Projects";
const TOKEN =
  "patpEOf7IvM7kNzlp.a62985958d240f1a5272ec69667a228fc66d57689bf4bc002674c1a95b47a1bd";
const PROJECT_IMAGE_FALLBACK = "./assets/imgs/projects_banner_img.png";

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
  projectsArray.forEach((project) => {
    console.log(project.images);
    //Creates new element and adds a class to it
    let projectElement = document.createElement("div");
    projectElement.classList.add("project-item");
    projectElement.setAttribute("tabindex", "0");

    let projectImage = document.createElement("img");
    projectImage.classList.add("project-item-image");
    projectImage.src = project.images[0].url;
    projectImage.alt = "";
    projectImage.setAttribute("aria-hidden", "true");
    projectElement.appendChild(projectImage);

    let projectGradient = document.createElement("div");
    projectGradient.classList.add("project-item-gradient");
    projectGradient.setAttribute("aria-hidden", "true");
    projectElement.appendChild(projectGradient);

    let projectTags = document.createElement("div");
    projectTags.classList.add("project-item-tags");

    project.category.forEach((category) => {
      let projectTag = document.createElement("span");
      projectTag.classList.add("project-item-tag");
      projectTag.textContent = category;
      projectTags.appendChild(projectTag);
    });
    projectElement.appendChild(projectTags);

    //Creates the text container inside the project card
    let projectContent = document.createElement("div");
    projectContent.classList.add("project-item-content");

    //Project title
    let projectTitle = document.createElement("h3");
    projectTitle.classList.add("project-item-title");
    projectTitle.textContent = project.name;

    //Project description
    let projectDescription = document.createElement("p");
    projectDescription.classList.add("project-item-description");
    projectDescription.textContent = project.description;

    let projectMeta = document.createElement("div");
    projectMeta.classList.add("project-item-meta");

    let projectYear = document.createElement("span");
    projectYear.classList.add("project-item-year");
    projectYear.textContent = project.year;

    projectContent.appendChild(projectTitle);
    projectMeta.appendChild(projectDescription);
    projectMeta.appendChild(projectYear);
    projectContent.appendChild(projectMeta);
    projectElement.appendChild(projectContent);

    //Adds new element to page
    document.querySelector(".projects-list").appendChild(projectElement);
  });
}

init();

//---
