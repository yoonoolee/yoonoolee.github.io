/**
 * Projects Page - Renders project cards from JSON data
 */

/**
 * Create HTML for a single project card
 * @param {Object} project - Project data object
 * @returns {string} HTML string for project card
 */
function createProjectCard({ title, description, area, libs, color, buttons }) {
    const libsHTML = libs
        .map(lib => `<span class="tag">${lib}</span>`)
        .join('');

    const buttonsHTML = buttons
        ? buttons.map(btn => `
            <a href="${btn.url || '#'}"
               class="project-btn"
               ${btn.url ? 'target="_blank" rel="noopener noreferrer"' : ''}>
                ${btn.label}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" stroke-width="2" aria-hidden="true">
                    <path d="M7 17L17 7M17 7H7M17 7V17"/>
                </svg>
            </a>
        `).join('')
        : '';

    return `
        <div class="project-card">
            <div class="project-image" style="background-color: ${color};" role="presentation"></div>
            <div class="project-info">
                <h4 class="project-title">${title}</h4>
                <p class="project-description">${description}</p>
                <p class="project-area">${area}</p>
                <div class="project-tags">${libsHTML}</div>
                ${buttonsHTML ? `<div class="project-buttons">${buttonsHTML}</div>` : ''}
            </div>
        </div>
    `;
}

/**
 * Render projects to the page
 * @param {Object} projects - Projects data organized by category
 */
function renderProjects(projects) {
    const pythonContainer = document.getElementById('python-projects');
    const sqlContainer = document.getElementById('sql-projects');

    if (pythonContainer && projects.python) {
        pythonContainer.innerHTML = projects.python
            .map(createProjectCard)
            .join('');
    }

    if (sqlContainer && projects.sql) {
        sqlContainer.innerHTML = projects.sql
            .map(createProjectCard)
            .join('');
    }
}

/**
 * Load project data from JSON file
 */
async function loadProjects() {
    try {
        const response = await fetch('data/projects.json');

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const projects = await response.json();
        renderProjects(projects);
    } catch (error) {
        console.error('Error loading projects:', error);

        // Display user-friendly error message
        const pythonContainer = document.getElementById('python-projects');
        if (pythonContainer) {
            pythonContainer.innerHTML = `
                <p style="color: #4a4a4a;">
                    Unable to load projects. Please try refreshing the page.
                </p>
            `;
        }
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadProjects);
} else {
    loadProjects();
}
