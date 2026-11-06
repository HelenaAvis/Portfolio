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
            console.log('Loaded projects data:', projects.items);

            projects.items.forEach((project) => {
                buildProjectCard(project);
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
    const cardLink = document.createElement('a');
    cardLink.classList.add('project-card__link');
    cardLink.href = project.html_url;
    const cardName = document.createElement('h2');
    cardName.classList.add('project-card__name');
    cardName.textContent = project.name;
    cardLink.appendChild(cardName);
    projectCard.appendChild(cardLink);

    // create the tag list
    const tagList = document.createElement('div');
    tagList.classList.add('project-card__tag-list');

    // fetch the list of repo languages
    fetch(project.languages_url)
        .then((response) => response.json())
        .then((languages) => {
            Object.entries(languages).forEach((language) => {
                const tag = document.createElement('p');
                tag.classList.add('project-card__tag');
                tag.textContent = language[0];
                tagList.appendChild(tag);
            });
        });
    projectCard.appendChild(tagList);

    // create the project description
    const projectDescription = document.createElement('p');
    projectDescription.classList.add('project-card__description');
    projectDescription.textContent = project.description;
    projectCard.appendChild(projectDescription);

    // add project card to list
    projectsContainer.appendChild(projectCard);
}

// Function to clear the project cards
function clearProjectsList() {
    while (projectsContainer.firstChild) {
        projectsContainer.firstChild.remove();
    }
}
