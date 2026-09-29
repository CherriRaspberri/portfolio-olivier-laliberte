const projects = fetch('https://api.airtable.com/v0/appId/tableId/projetId', {
    headers: {
        'Authorization': 'Bearer your_api_key'
    }
}).then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    else if (response.status === 404) {
        throw new Error('Project not found');
    }
    return response.json();
}).catch(error => {
    console.error('Error fetching project:', error);
});

projects.forEach(project => {
    // Do something with each project, e.g., display it on the page
    console.log(project);

    let projectElement = document.createElement('div');
    projectElement.classList.add('project-item');
    projectElement.textContent = project.name;
    document.querySelector('.projects-list').appendChild(projectElement);
 });