const searchInput = document.querySelector('.search-bar');
searchInput.addEventListener('keyup', function (e) {
    clearProjectsList();
    search(searchInput.value);
});
const projectsContainer = document.querySelector('.projects-container');

// Function to fetch projects data and filter based on search query
function search(query) {
    fetch('../data/projects.json')
        .then((response) => response.json())
        .then((projects) => {
            console.log('Loaded projects data:', projects);
            projects.forEach((project) => {
                if (project.name.toLowerCase().includes(query.toLowerCase())) {
                    buildProjectCard(project);
                }
            });
        });
}

// Function to build project cards based on the provided project JSON
function buildProjectCard(project) {
    console.log('Building project card for:', project.name);

    // Create a new project card element
    const projectCard = document.createElement('div');
    projectCard.classList.add('project-card');
    // create the card title (project name)
    const cardName = document.createElement('h2');
    cardName.classList.add('project-card__name');
    cardName.textContent = project.name;
    projectCard.appendChild(cardName);
    // create the project description
    const projectDescription = document.createElement('p');
    projectDescription.classList.add('project-card__description');
    projectDescription.textContent = project.description;
    projectCard.appendChild(projectDescription);
    // create the container for the links
    const projectLinksContainer = document.createElement('div');
    projectLinksContainer.classList.add('project-card__link-container');
    projectCard.appendChild(projectLinksContainer);
    // create the github link if present
    if (project.githubURL) {
        const githubLink = document.createElement('a');
        githubLink.classList.add('project-card__link');
        githubLink.href = project.githubURL;
        githubLink.textContent = 'Github Repo';
        projectLinksContainer.appendChild(githubLink);
    }
    // create the live demo link if present
    if (project.liveURL) {
        const liveLink = document.createElement('a');
        liveLink.classList.add('project-card__link');
        liveLink.href = project.liveURL;
        liveLink.textContent = 'Live Project';
        projectLinksContainer.appendChild(liveLink);
    }

    // add project card to list
    projectsContainer.appendChild(projectCard);
}

// Function to clear the project cards
function clearProjectsList() {
    while (projectsContainer.firstChild) {
        projectsContainer.firstChild.remove();
    }
}
