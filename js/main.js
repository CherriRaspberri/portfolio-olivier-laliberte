// Waits for website to load, then initializes the page by loading projects and displaying them
document.addEventListener("DOMContentLoaded", () => {
  // Finder :
  // Gets the modal and its elements from the DOM
  const modal = document.getElementById("project-modal");
  const modalGallery = document.getElementById("project-modal-gallery");
  const modalTitle = document.getElementById("project-modal-title");
  const modalDescription = document.getElementById("project-modal-description");
  const modalTags = document.getElementById("project-modal-tags");
  const modalLink = document.getElementById("project-modal-link");
  const modalYear = document.getElementById("project-modal-year");
  const modalCloseButton = document.querySelector(".project-modal-close");
  const modalBackdrop = document.querySelector(".project-modal-backdrop");
  const modalDialog = document.querySelector(".project-modal-dialog");
  const infiniteBanner = document.querySelector(".infinite-banner");

  //Screen lock variable
  let lockedScrollY = 0;
  let modalTrigger = null;

  // Gets the link for the project, using a fallback if necessary
  function getProjectLink(project) {
    const linkValue = project.link || project.website || project.url || project.external_link || project.externalLink || project.source_url || project.sourceUrl;

    if (typeof linkValue === "string") {
      return linkValue.trim();
    }

    return "";
  }

  // Gets the label for the project link, using a fallback if necessary
  function getProjectLinkLabel(project, fallbackLink) {
    const labelValue = project.link_name;

    if (typeof labelValue === "string" && labelValue.trim()) {
      return labelValue.trim();
    }

    if (fallbackLink) {
      return fallbackLink;
    }

    return "Link";
  }

  // Checks if banner is sticky or at its place on the page
  function isBannerSticky() {
    if (!infiniteBanner) {
      return false;
    }

    const bannerRect = infiniteBanner.getBoundingClientRect();
    return bannerRect.top <= 0 && bannerRect.bottom > 0;
  }

  // Prevents scrolling with mouse wheel or touch input
  function preventScrollInput(event) {
    if (
      modalDialog &&
      event.target instanceof Node &&
      modalDialog.contains(event.target)
    ) {
      return;
    }

    event.preventDefault();
  }

  // Prevents scrolling with keyboard keys
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

    // Checks if the pressed key is one of the scroll keys; prevents the default action if it is
    if (scrollKeys.includes(event.key)) {
      event.preventDefault();
    }
  }

  // Enables the scroll lock
  function enableScrollLock() {
    lockedScrollY = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${lockedScrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    document.addEventListener("wheel", preventScrollInput, { passive: false });
    document.addEventListener("touchmove", preventScrollInput, {
      passive: false,
    });
    document.addEventListener("keydown", preventScrollKeys);
  }

  // Disables the scroll lock
  function disableScrollLock() {
    const storedOffset = document.body.style.top;
    const restoredScrollY = storedOffset
      ? Math.abs(parseInt(storedOffset, 10))
      : lockedScrollY;

    document.removeEventListener("wheel", preventScrollInput);
    document.removeEventListener("touchmove", preventScrollInput);
    document.removeEventListener("keydown", preventScrollKeys);
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.left = "";
    document.body.style.right = "";
    document.body.style.width = "";
    document.body.style.overflow = "";
    document.documentElement.style.overflow = "";

    // Temporarily bypass smooth scrolling to prevent visual jump on restore.
    const previousScrollBehavior = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = "auto";
    window.scrollTo(0, restoredScrollY);
    requestAnimationFrame(() => {
      document.documentElement.style.scrollBehavior = previousScrollBehavior;
    });
  }

  // Closes the project modal and removes the "is-open" class
  function closeProjectModal() {
    if (modalTrigger && document.contains(modalTrigger)) {
      modalTrigger.focus();
    } else {
      modalCloseButton.blur();
    }

    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    disableScrollLock();
    document.body.classList.remove("modal-open");
    document.body.classList.remove("modal-open-banner-sticky");
    modalTrigger = null;
  }

  // Opens the project modal and populates it with the project data
  // If the project has no image, it uses a fallback image
  // If the project receives no name, description, or year, it uses a fallback text
  function openProjectModal(project) {
    modalTrigger = document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null;

    // Filters out any invalid images and creates an array of valid images for the modal gallery
    const modalImages = Array.isArray(project.images) ? project.images.slice(1).filter((image) => image && image.url) : [];
    // If there are no images, use the fallback image
    const galleryImages = modalImages.length > 0 ? modalImages : [{ url: PROJECT_IMAGE_FALLBACK }];

    // Clears the modal gallery and populates it with the project's images or a fallback image
    modalGallery.innerHTML = "";
    galleryImages.forEach((image, index) => {
      const modalImage = document.createElement("img");
      modalImage.src = image.url;
      modalImage.alt = `${project.name || "Project"} image ${index + 1}`;
      modalGallery.appendChild(modalImage);
    });

    // Populates the modal with the project name, description, and year, using fallback text if necessary
    modalTitle.textContent = project.name || "Project";
    modalDescription.textContent =
      project.full_description || "No description available.";
    modalYear.textContent = project.year || "Year unavailable";

    // Populates the modal with the project link if it exists, otherwise hides the link
    const projectLink = getProjectLink(project);
    if (projectLink) {
      modalLink.href = projectLink;
      modalLink.textContent = getProjectLinkLabel(project, projectLink);
      modalLink.title = projectLink;
      modalLink.classList.remove("is-hidden");
    } else {
      modalLink.removeAttribute("href");
      modalLink.textContent = "Link";
      modalLink.removeAttribute("title");
      modalLink.classList.add("is-hidden");
    }

    // Populates the modal with project tags
    modalTags.innerHTML = "";
    const categories = Array.isArray(project.category) ? project.category : [];
    categories.forEach((category) => {
      const tag = document.createElement("span");
      tag.classList.add("project-modal-tag");
      tag.textContent = category;
      modalTags.appendChild(tag);
    });

    // Adds the "is-open" class to the modal to open it
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    modalCloseButton.focus({ preventScroll: true });
    // Removes the "modal-open-banner-sticky" class from the body if the infinite-scrolling banner is not sticky, and adds it if it is sticky
    document.body.classList.toggle("modal-open-banner-sticky", isBannerSticky());

    // Enables scroll lock when the modal is open
    enableScrollLock();
    document.body.classList.add("modal-open");
  }

  // Initializes the page by loading projects and displaying them
  async function init() {
    let projectsArray = [];
    // Loads projects from AirTable API
    const projects = await loadProjects();
    // Adds each project to the projectsArray
    projects.records.forEach((project) => {
      projectsArray.push(project.fields);
    });
    // Sorts the projectsArray by ID in ascending order
    projectsArray.sort((a, b) => a.id - b.id);

    console.log(projectsArray);

    // Displays each project on the page
    projectsArray.forEach((project) => {
      console.log(project.images);
      // Creates new element and adds a class to it
      let projectElement = document.createElement("div");
      projectElement.classList.add("project-item");
      projectElement.setAttribute("tabindex", "0");
      projectElement.setAttribute("role", "button");
      projectElement.setAttribute(
        "aria-label",
        `Open details for ${project.name}`,
      );

      // Adds image to the project card
      let projectImage = document.createElement("img");
      projectImage.classList.add("project-item-image");
      projectImage.src = project.images[0].url;
      projectImage.alt = "";
      projectImage.setAttribute("aria-hidden", "true");
      projectElement.appendChild(projectImage);

      // Adds gradient overlay to the project card
      let projectGradient = document.createElement("div");
      projectGradient.classList.add("project-item-gradient");
      projectGradient.setAttribute("aria-hidden", "true");
      projectElement.appendChild(projectGradient);

      // Adds tags to the project card
      let projectTags = document.createElement("div");
      projectTags.classList.add("project-item-tags");

      // Adds each category as a tag to the project card
      project.category.forEach((category) => {
        let projectTag = document.createElement("span");
        projectTag.classList.add("project-item-tag");
        projectTag.classList.add("bbh-bartle-regular");
        projectTag.textContent = category;
        projectTags.appendChild(projectTag);
      });
      projectElement.appendChild(projectTags);

      // Creates the text container inside the project card
      let projectContent = document.createElement("div");
      projectContent.classList.add("project-item-content");

      // Project title
      let projectTitle = document.createElement("h3");
      projectTitle.classList.add("project-item-title");
      projectTitle.classList.add("climate-crisis-titles");
      projectTitle.textContent = project.name;

      // Project description
      let projectDescription = document.createElement("p");
      projectDescription.classList.add("project-item-description");
      projectDescription.classList.add("saira-condensed-regular");
      projectDescription.textContent = project.description;

      // Project item meta container
      let projectMeta = document.createElement("div");
      projectMeta.classList.add("project-item-meta");

      // Project year
      let projectYear = document.createElement("span");
      projectYear.classList.add("project-item-year");
      projectYear.classList.add("bbh-bogle-regular");
      projectYear.textContent = project.year;

      // Adds the title, description, and year to the project content container
      projectContent.appendChild(projectTitle);
      projectMeta.appendChild(projectDescription);
      projectMeta.appendChild(projectYear);
      projectContent.appendChild(projectMeta);
      projectElement.appendChild(projectContent);

      // Adds event listeners to open the project modal when clicked or when Enter/Space is pressed
      projectElement.addEventListener("click", () => openProjectModal(project));
      projectElement.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openProjectModal(project);
        }
      });

      // Adds new element to page
      document.querySelector(".projects-list").appendChild(projectElement);
    });
  }

  // Adds event listeners to close the project modal when the close button or backdrop is clicked, or when the Escape key is pressed
  modalCloseButton.addEventListener("click", closeProjectModal);
  modalBackdrop.addEventListener("click", closeProjectModal);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("is-open")) {
      closeProjectModal();
    }
  });

  // Initializes the page
  init();
});