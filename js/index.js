/**
 * Typing Animation for Homepage
 * Creates an animated typing effect that cycles through phrases
 */

// Animation timing constants
const TYPING_SPEED = {
    PREFIX: 75,           // Speed for typing "Hi, I'm "
    FIRST_PHRASE: 75,     // Speed for typing "Avery!"
    OTHER_PHRASES: 50,    // Speed for typing other phrases
    DELETING: 25,         // Speed for deleting text
    PAUSE_AFTER_TYPE: 2000,   // Pause after completing a phrase
    PAUSE_AFTER_DELETE: 500,  // Pause after deleting a phrase
    INITIAL_DELAY: 1000   // Delay before starting animation
};

/**
 * Initialize the typing animation
 */
function initTypingAnimation() {
    const phrases = [
        "Avery!",
        "a Master's Student @ UC Berkeley",
        "Cofounder & CTO @ Cherrytree",
        "excited for you to check out my portfolio"
    ];

    const element = document.getElementById('typed-text');
    if (!element) {
        console.error('typed-text element not found');
        return;
    }

    const prefix = "Hi, I'm ";

    let state = {
        phraseIndex: 0,
        charIndex: 0,
        isDeleting: false,
        isTypingPrefix: true,
        prefixIndex: 0,
        completedCycle: false
    };

    function type() {
        // Type the prefix first
        if (state.isTypingPrefix) {
            element.textContent = prefix.substring(0, state.prefixIndex + 1);
            state.prefixIndex++;

            if (state.prefixIndex === prefix.length) {
                state.isTypingPrefix = false;
                setTimeout(type, TYPING_SPEED.PAUSE_AFTER_DELETE);
            } else {
                setTimeout(type, TYPING_SPEED.PREFIX);
            }
            return;
        }

        // Type/delete the current phrase
        const currentPhrase = phrases[state.phraseIndex];
        const text = currentPhrase.substring(0, state.charIndex + (state.isDeleting ? -1 : 1));

        element.textContent = prefix + text;
        state.charIndex += state.isDeleting ? -1 : 1;

        // Calculate delay based on current state
        let delay = state.isDeleting
            ? TYPING_SPEED.DELETING
            : (state.phraseIndex === 0 ? TYPING_SPEED.FIRST_PHRASE : TYPING_SPEED.OTHER_PHRASES);

        // Handle end of typing
        if (!state.isDeleting && state.charIndex === currentPhrase.length) {
            // Stop after completing one full cycle
            if (state.phraseIndex === 0 && state.completedCycle) return;

            delay = TYPING_SPEED.PAUSE_AFTER_TYPE;
            state.isDeleting = true;
        }
        // Handle end of deleting
        else if (state.isDeleting && state.charIndex === 0) {
            state.isDeleting = false;
            state.phraseIndex = (state.phraseIndex + 1) % phrases.length;

            if (state.phraseIndex === 0) {
                state.completedCycle = true;
            }

            delay = TYPING_SPEED.PAUSE_AFTER_DELETE;
        }

        setTimeout(type, delay);
    }

    // Start animation after page load
    window.addEventListener('load', () => {
        setTimeout(type, TYPING_SPEED.INITIAL_DELAY);
    });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTypingAnimation);
} else {
    initTypingAnimation();
}
