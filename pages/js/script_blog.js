const API_URL = "https://script.google.com/macros/s/AKfycbxFUjLvWZQWVCwcxm_5TRNokvcTNrrNtcHN8aEJE4ApJnVPsbIqopSFj1lfgNnPqOs9/exec";

async function fetchBlogData() {
    try {
        const response = await fetch(API_URL, { mode: 'cors' });
        const data = await response.json();
        updateBlogList(data);
    } catch (error) {
        console.error("Error fetching blog data:", error);
    }
}

function updateBlogList(data) {
    const blogList = document.getElementById("blog-list");
    blogList.innerHTML = "";
    
    data.forEach(blog => {
        const blogItem = document.createElement("a");
        blogItem.classList.add("blog-item");
        blogItem.innerHTML = `
            <div class="blog-header">
                <img src="https://imagekit.io/web/sg37/${blog.member_id}.png" alt="${blog.member}">
                <div>
                    <div class="title">${blog.title}</div>
                    <div class="date">${blog.date} | by ${blog.contributor}</div>
                </div>
            </div>
        `;
        blogItem.href = "#";
        blogItem.onclick = () => loadBlogContent(blog);
        blogList.appendChild(blogItem);
    });
}

function loadBlogContent(blog) {
    const blogContent = document.getElementById("blog-content");
    blogContent.innerHTML = `
        <div class="blog-header">
            <img src="https://imagekit.io/web/sg37/${blog.member_id}.png" alt="${blog.member}">
            <div>
                <div class="title">${blog.title}</div>
                <div class="date">${blog.date} | by ${blog.contributor}</div>
            </div>
        </div>
        <p><a href="${blog.original_url}" target="_blank">Link Original Blog</a></p>
        <div class="content">${blog.content}</div>
    `;
}

fetchBlogData();
