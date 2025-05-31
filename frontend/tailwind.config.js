// frontend/tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'theme-primary-dark': '#0A192F', // Example: Very dark blue (almost black)
        'theme-primary-medium': '#1E3A8A', // Example: Dark blue
        'theme-primary-light': '#3B82F6', // Example: Medium blue (can be an accent)
        'theme-accent-blue': '#60A5FA',  // Example: Lighter blue for highlights/links
        'theme-accent-green': '#10B981', // Example: Green for accents like buttons (already used)
        'theme-text-light': '#E2E8F0',    // Example: Light gray/off-white for text
        'theme-text-dark': '#1F2937',     // Example: Dark gray for text on light backgrounds
        'theme-bg-surface': '#112240',  // Example: Slightly lighter than primary-dark for cards/surfaces
        'theme-border': '#2A4460',     // Example: Border color
      },
    },
  },
  plugins: [],
}
