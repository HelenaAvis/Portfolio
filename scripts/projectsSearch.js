const projectsContainer = document.querySelector('.projects-container');

window.addEventListener('DOMContentLoaded', function () {
    search('');
});

const searchInput = document.querySelector('.search-bar');
searchInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        clearProjectsList();
        search(searchInput.value);
    }
});
const searchButton = document.querySelector('.search-button');
searchButton.addEventListener('click', function (e) {
    clearProjectsList();
    search(searchInput.value);
});

// Function to fetch projects data and filter based on search query
function search(query) {
    const queryString = 'q=' + encodeURIComponent(query) + '+user:HelenaAvis+fork:true';
    fetch(`https://api.github.com/search/repositories?${queryString}`)
        .then((response) => response.json())
        .then((projects) => {
            console.log('Loaded projects data:', projects);
            // projects.forEach((project) => {
            //     if (searchType === 'name') {
            //         // Check if the project name includes the search query
            //         if (project.name.toLowerCase().includes(query.toLowerCase())) {
            //             buildProjectCard(project);
            //         }
            //     } else {
            //         // Check if the project tags include the search query
            //         if (
            //             project.tags
            //                 .map(function (tag) {
            //                     return tag.toLowerCase();
            //                 })
            //                 .includes(query.toLowerCase())
            //         ) {
            //             buildProjectCard(project);
            //         }
            //     }
            // });
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
    // create the tag list
    const tagList = document.createElement('div');
    tagList.classList.add('project-card__tag-list');
    project.tags.forEach((t) => {
        const tag = document.createElement('p');
        tag.classList.add('project-card__tag');
        tag.textContent = t;
        tagList.appendChild(tag);
    });
    projectCard.appendChild(tagList);
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
