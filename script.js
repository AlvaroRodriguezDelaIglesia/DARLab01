const themeToggle = document.getElementById("theme-toggle");
const currentTheme = localStorage.getItem("theme") || "dark";
document.body.dataset.theme = currentTheme;
themeToggle.textContent = currentTheme === "dark" ? "Modo claro" : "Modo oscuro";
if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        const newTheme = document.body.dataset.theme === "dark" ? "light" : "dark";
        document.body.dataset.theme = newTheme;
        localStorage.setItem("theme", newTheme);
        themeToggle.textContent = newTheme === "dark" ? "Modo claro" : "Modo oscuro";
    });
}

document.getElementById("year").textContent = new Date().getFullYear();

const scrollTopBtn = document.getElementById("scroll-top");
if (scrollTopBtn) {
    window.addEventListener("scroll", () => {
        if (window.scrollY > 400) {
            scrollTopBtn.classList.add("visible");
        } else {
            scrollTopBtn.classList.remove("visible");
        }
    });


    scrollTopBtn.addEventListener("click", () => {
        window.scrollTo({top: 0, behavior: "smooth"});
    });
}

const tags = document.querySelectorAll(".tag");
const posts = document.querySelectorAll(".card");

tags.forEach(tag => {
    tag.addEventListener("click", () => {
        tags.forEach(t => t.classList.remove("active"));
        tag.classList.add("active");

        const selectedTag = tag.dataset.tag;

        posts.forEach(post => {
            const postTags = post.dataset.tags.toLowerCase();
            post.style.display =
                selectedTag === "all" || postTags.includes(selectedTag)
                    ? "block"
                    : "none";
        });
    });
});

const searchInput = document.getElementById("search");
if (searchInput) {
    searchInput.addEventListener("input", e => {
        const searchTerm = e.target.value.toLowerCase();

        posts.forEach(post => {
            const title = post.dataset.title.toLowerCase();
            post.style.display = title.includes(searchTerm) ? "block" : "none";
        });
    });
}

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        }
    });
}, {threshold: 0.2});

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
