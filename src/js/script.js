const html = document.documentElement;
const body = document.body;
const menuLinks = document.querySelectorAll(".admin-menu a");
const collapseBtn = document.querySelector(".admin-menu .collapse-btn");
const toggleMobileMenu = document.querySelector(".toggle-mob-menu");
const switchInput = document.querySelector(".switch input");
const switchLabel = document.querySelector(".switch label");
const switchLabelText = switchLabel.querySelector("span:last-child");
const collapsedClass = "collapsed";
const getSavedMode = () => localStorage.getItem("mode");
const getSelectedMode = () => switchInput.checked ? "light" : "dark";
const saveSelectedMode = (mode) => localStorage.setItem("mode", mode);
const getActiveMode = () => body.getAttribute("data-bs-theme");

function setSwitchState(state) {
	switchInput.checked = state === true;
}

function enableMode(mode) {
	if (!mode) return;
	body.setAttribute("data-bs-theme", mode);
}

function setSwitchLabel(str) {
	if (!str) return;
	switchLabelText.textContent = str;
}

function enableDarkMode() {
	console.log("enableDarkMode");
	setSwitchState(false);
	console.log("confirm setSwitchState", switchInput.checked ? "checked" : "not checked");
	enableMode("dark");
	setSwitchLabel("Light");
	saveSelectedMode("dark");

}

function enableLightMode() {
	console.log("enableLightMode");
	setSwitchState(true);
	console.log("confirm setSwitchState", switchInput.checked ? "checked" : "not checked");
	enableMode("light");
	setSwitchLabel("Dark");
	saveSelectedMode("light");
}

// Function to initialize the theme
function init() {
	const savedMode = getSavedMode();
	if (!savedMode)
	{
		// If no saved mode is found, check for user's preferred color scheme
		const userPreferredMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
		// Load user's preferred color scheme
		if (userPreferredMode === "light")
		{
			enableLightMode();
		} else
		{
			enableDarkMode();
		}
		return;
	}

	// Set initial switch state and label based on saved mode
	if (savedMode === "light")
	{
		enableLightMode();
	} else
	{
		enableDarkMode();
	}
}

// Toggle header state
collapseBtn.addEventListener("click", function () {
	body.classList.toggle(collapsedClass);
	this.getAttribute("aria-expanded") == "true" ?
		this.setAttribute("aria-expanded", "false") :
		this.setAttribute("aria-expanded", "true");
	this.getAttribute("aria-label") == "collapse menu" ?
		this.setAttribute("aria-label", "expand menu") :
		this.setAttribute("aria-label", "collapse menu");
});

// Toggle mobile menu
toggleMobileMenu.addEventListener("click", function () {
	body.classList.toggle("mob-menu-opened");
	this.getAttribute("aria-expanded") == "true" ?
		this.setAttribute("aria-expanded", "false") :
		this.setAttribute("aria-expanded", "true");
	this.getAttribute("aria-label") == "open menu" ?
		this.setAttribute("aria-label", "close menu") :
		this.setAttribute("aria-label", "open menu");
});

// Show tooltip on menu link hover
for (const link of menuLinks)
{
	link.addEventListener("mouseenter", function () {
		if (
			body.classList.contains(collapsedClass) &&
			window.matchMedia("(min-width: 768px)").matches
		)
		{
			const tooltip = this.querySelector("span").textContent;
			this.setAttribute("title", tooltip);
		} else
		{
			this.removeAttribute("title");
		}
	});
}

// Toggle light/dark mode
switchInput.addEventListener("change", function () {
	const selectedMode = getSelectedMode();
	if (selectedMode === "dark") enableDarkMode();
	else enableLightMode();
	chooseTopcoat();
});

init(); // Initialize the theme