/**
 * Shared Components for Portfolio Site
 * Generates sidebar profile and navigation across all pages
 */

// Sidebar profile data
const profile = {
    name: "Avery Lee",
    location: "San Francisco Bay Area",
    image: "images/profile_pic.png",
    links: [
        {
            icon: {
                path: '<path fill="currentColor" d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z"></path>',
                viewBox: "0 0 16 16"
            },
            text: "UC Berkeley",
            url: "https://berkeley.edu"
        },
        {
            icon: {
                path: '<path fill="currentColor" d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/>',
                viewBox: "0 0 24 24"
            },
            text: "Cherrytree",
            url: "https://cherrytree.app/"
        },
        {
            icon: {
                path: '<path fill="currentColor" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>',
                viewBox: "0 0 24 24"
            },
            text: "LinkedIn",
            url: "https://www.linkedin.com/in/averyaverylee/"
        },
        {
            icon: {
                path: '<path fill="currentColor" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>',
                viewBox: "0 0 16 16"
            },
            text: "GitHub",
            url: "https://github.com/yoonoolee"
        },
        {
            icon: {
                path: '<path fill="currentColor" d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>',
                viewBox: "0 0 24 24"
            },
            text: "Email",
            url: "mailto:avery_lee@berkeley.edu"
        }
    ]
};

// Navigation pages
const navPages = [
    { name: "Home", url: "index.html" },
    { name: "Experience", url: "experience.html" },
    { name: "Projects", url: "projects.html" },
    { name: "Interests", url: "interests.html" }
];

/**
 * Generate sidebar HTML with profile information
 * @returns {string} HTML string for sidebar
 */
function generateSidebar() {
    try {
        const linksHTML = profile.links.map(link => {
            const isExternal = link.url.startsWith('http');
            const targetAttr = isExternal ? 'target="_blank" rel="noopener noreferrer"' : '';

            return `
                <a href="${link.url}" class="profile-link" ${targetAttr}>
                    <svg height="16" width="16" viewBox="${link.icon.viewBox}" aria-hidden="true">
                        ${link.icon.path}
                    </svg>
                    <span>${link.text}</span>
                </a>
            `;
        }).join('');

        return `
            <div class="profile-pic-wrapper">
                <img src="${profile.image}" alt="${profile.name}" class="profile-pic">
            </div>
            <h2 class="profile-name">${profile.name}</h2>
            <p class="profile-location">
                <svg height="16" width="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                    <path d="M8 0C5.2 0 3 2.2 3 5c0 3.5 5 11 5 11s5-7.5 5-11c0-2.8-2.2-5-5-5zm0 7.5c-1.4 0-2.5-1.1-2.5-2.5S6.6 2.5 8 2.5s2.5 1.1 2.5 2.5S9.4 7.5 8 7.5z"/>
                </svg>
                ${profile.location}
            </p>
            <div class="profile-links">${linksHTML}</div>
        `;
    } catch (error) {
        console.error('Error generating sidebar:', error);
        return '';
    }
}

/**
 * Get current page filename from URL
 * Handles both root path and specific pages
 * @returns {string} Current page filename
 */
function getCurrentPage() {
    const path = window.location.pathname;
    const segments = path.split('/').filter(Boolean);
    const lastSegment = segments[segments.length - 1];

    // If no filename or ends with /, default to index.html
    if (!lastSegment || lastSegment.indexOf('.') === -1) {
        return 'index.html';
    }

    return lastSegment;
}

/**
 * Generate navigation HTML with active state
 * @param {string} currentPage - Current page filename
 * @returns {string} HTML string for navigation
 */
function generateNav(currentPage) {
    try {
        return navPages.map(page => {
            const isActive = page.url === currentPage;
            const activeClass = isActive ? ' class="active"' : '';
            const ariaCurrent = isActive ? ' aria-current="page"' : '';

            return `<a href="${page.url}"${activeClass}${ariaCurrent}>${page.name}</a>`;
        }).join('\n                ');
    } catch (error) {
        console.error('Error generating navigation:', error);
        return '';
    }
}

/**
 * Initialize sidebar and navigation on page load
 */
function initializeComponents() {
    const sidebar = document.querySelector('.sidebar');
    const nav = document.querySelector('nav');

    if (sidebar) {
        sidebar.innerHTML = generateSidebar();
    } else {
        console.warn('Sidebar element not found');
    }

    if (nav) {
        const currentPage = getCurrentPage();
        nav.innerHTML = generateNav(currentPage);
    } else {
        console.warn('Navigation element not found');
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeComponents);
} else {
    initializeComponents();
}
