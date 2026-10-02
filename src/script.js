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

//Waits for weebsite to load
document.addEventListener("DOMContentLoaded", () => {
  //Finder :
  //Gets the modal and its elements from the DOM
  const modal = document.getElementById("project-modal");
  const modalImage = document.getElementById("project-modal-image");
  const modalTitle = document.getElementById("project-modal-title");
  const modalDescription = document.getElementById("project-modal-description");
  const modalTags = document.getElementById("project-modal-tags");
  const modalYear = document.getElementById("project-modal-year");
  const modalCloseButton = document.querySelector(".project-modal-close");
  const modalBackdrop = document.querySelector(".project-modal-backdrop");
  const infiniteBanner = document.querySelector(".infinite-banner");
  let lockedScrollY = 0;

  //Checks if banner is stickyor at its place on the page
  function isBannerSticky() {
    if (!infiniteBanner) {
      return false;
    }

    const bannerRect = infiniteBanner.getBoundingClientRect();
    return bannerRect.top <= 0 && bannerRect.bottom > 0;
  }

  //Locks the scroll position to the current Y position
  function lockScrollPosition() {
    window.scrollTo(0, lockedScrollY);
  }

  //Prevents scrolling with mouse wheel or touch input
  function preventScrollInput(event) {
    event.preventDefault();
  }

  //Prevents scrolling with keyboard keys
  function preventScrollKeys(event) {
    const scrollKeys = [
      "ArrowUp",
      "ArrowDown",
      "PageUp",
      "PageDown",
      "Home",
      "End",
      " ",
    ];

    //Checks if the pressed key is one of the scroll keys; prevents the default action if it is
    if (scrollKeys.includes(event.key)) {
      event.preventDefault();
    }
  }

  //Enables the scroll lock
  function enableScrollLock() {
    lockedScrollY = window.scrollY;
    window.addEventListener("scroll", lockScrollPosition, { passive: false });
    document.addEventListener("wheel", preventScrollInput, { passive: false });
    document.addEventListener("touchmove", preventScrollInput, {
      passive: false,
    });
    document.addEventListener("keydown", preventScrollKeys);
  }

  //Disables the scroll lock
  function disableScrollLock() {
    window.removeEventListener("scroll", lockScrollPosition);
    document.removeEventListener("wheel", preventScrollInput);
    document.removeEventListener("touchmove", preventScrollInput);
    document.removeEventListener("keydown", preventScrollKeys);
  }

  //Closes the project modal and removes the "is-open" class
  function closeProjectModal() {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    disableScrollLock();
    document.body.classList.remove("modal-open");
    document.body.classList.remove("modal-open-banner-sticky");
  }

  //Opens the project modal and populates it with the project data
  //If the project has no image, it uses a fallback image
  //If the project receives no name, description, or year, it uses a fallback text
  function openProjectModal(project) {
    const imageSource =
      project.images && project.images[0] && project.images[0].url
        ? project.images[0].url
        : PROJECT_IMAGE_FALLBACK;

    modalImage.src = imageSource;
    modalImage.alt = project.name || "Project preview";
    modalTitle.textContent = project.name || "Project";
    modalDescription.textContent =
      project.description || "No description available.";
    modalYear.textContent = project.year || "Year unavailable";

    modalTags.innerHTML = "";
    const categories = Array.isArray(project.category) ? project.category : [];
    categories.forEach((category) => {
      const tag = document.createElement("span");
      tag.classList.add("project-modal-tag");
      tag.textContent = category;
      modalTags.appendChild(tag);
    });

    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.toggle("modal-open-banner-sticky", isBannerSticky());
    enableScrollLock();
    document.body.classList.add("modal-open");
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
      projectElement.setAttribute("role", "button");
      projectElement.setAttribute(
        "aria-label",
        `Open details for ${project.name}`,
      );

      //Adds image to the project card
      let projectImage = document.createElement("img");
      projectImage.classList.add("project-item-image");
      projectImage.src = project.images[0].url;
      projectImage.alt = "";
      projectImage.setAttribute("aria-hidden", "true");
      projectElement.appendChild(projectImage);

      //Adds gradient overlay to the project card
      let projectGradient = document.createElement("div");
      projectGradient.classList.add("project-item-gradient");
      projectGradient.setAttribute("aria-hidden", "true");
      projectElement.appendChild(projectGradient);

      //Adds tags to the project card
      let projectTags = document.createElement("div");
      projectTags.classList.add("project-item-tags");

      //Adds each category as a tag to the project card
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

      //Project item meta container
      let projectMeta = document.createElement("div");
      projectMeta.classList.add("project-item-meta");

      //Project year
      let projectYear = document.createElement("span");
      projectYear.classList.add("project-item-year");
      projectYear.textContent = project.year;

      //Adds the title, description, and year to the project content container
      projectContent.appendChild(projectTitle);
      projectMeta.appendChild(projectDescription);
      projectMeta.appendChild(projectYear);
      projectContent.appendChild(projectMeta);
      projectElement.appendChild(projectContent);

      //Adds event listeners to open the project modal when clicked or when Enter/Space is pressed
      projectElement.addEventListener("click", () => openProjectModal(project));
      projectElement.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openProjectModal(project);
        }
      });

      //Adds new element to page
      document.querySelector(".projects-list").appendChild(projectElement);
    });
  }

  //Adds event listeners to close the project modal when the close button or backdrop is clicked, or when the Escape key is pressed
  modalCloseButton.addEventListener("click", closeProjectModal);
  modalBackdrop.addEventListener("click", closeProjectModal);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("is-open")) {
      closeProjectModal();
    }
  });

  //Initializes the page
  init();
});
