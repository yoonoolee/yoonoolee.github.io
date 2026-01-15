/**
 * Projects Page - Renders project cards from JSON data
 */

/**
 * Create HTML for a single project card
 * @param {Object} project - Project data object
 * @returns {string} HTML string for project card
 */
function createProjectCard({ title, description, area, libs, color, status, buttons }) {
    const libsHTML = libs
        .map(lib => `<span class="tag">${lib}</span>`)
        .join('');

    const getButtonIcon = (label) => {
        switch(label.toLowerCase()) {
            case 'github':
                return `<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
                </svg>`;
            case 'jupyter':
                return `<img src="images/jupyter_logo.png" width="14" height="14" alt="" aria-hidden="true" style="display: inline-block; filter: brightness(0) invert(1);">`;
            case 'paper':
                return `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
                </svg>`;
            default:
                return '';
        }
    };

    const buttonsHTML = buttons
        ? buttons.map(btn => `
            <a href="${btn.url || '#'}"
               class="project-btn"
               ${btn.url ? 'target="_blank" rel="noopener noreferrer"' : ''}>
                ${getButtonIcon(btn.label)}
                <span>${btn.label}</span>
            </a>
        `).join('')
        : '';

    const statusHTML = status ? `<span class="project-status-tag">${status}</span>` : '';

    return `
        <div class="project-card">
            <div class="project-image" style="background-color: ${color};" role="presentation">
                ${statusHTML}
            </div>
            <div class="project-info">
                <h4 class="project-title">${title}</h4>
                <p class="project-description">${description}</p>

                <div class="project-divider"></div>
                <p class="project-section-label">Technologies & Techniques</p>
                <p class="project-area">${area}</p>

                <div class="project-divider"></div>
                <p class="project-section-label">Tools & Libraries</p>
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
