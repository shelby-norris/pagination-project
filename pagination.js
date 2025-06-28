const state = {
  currentPage: 1,
};

// Write a function that takes a page as a parameter and fetches the corresponding posts from the API
async function fetchPosts(page) {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`
    );

    if (!response.ok) {
      throw new Error("Network Error. Status: ", response.status);
    }

    const data = await response.json();
    console.log(data);

    return data;

  } catch (error) {
    console.log("ERROR ", error.message);
  } finally {
    console.log("Finished");
  }
}

fetchPosts(1);
fetchPosts(2);

// Write a function that dynamically creates and displays the posts on the page
function renderPosts(postData) {
  const postContainer = document.getElementById("post-container");
  postContainer.innerHTML = "";
  postContainer.className = "border-1 rounded p-4 border-indigo-400";

  postData.forEach((post) => {
    const postElement = document.createElement("div");
    postElement.className = "border-1 rounded p-4 border-indigo-400 text-indigo-800";

    const titleElement = document.createElement("p");
    titleElement.textContent = post.title;
    titleElement.className = "font-bold mb-2";

    const bodyElement = document.createElement("p");
    bodyElement.textContent = post.body;

    postElement.appendChild(titleElement);
    postElement.appendChild(bodyElement);

    postContainer.appendChild(postElement);
  });
}


// Pagination Logic

function renderPagination(id) {
  const totalPages = Math.ceil(id / 10);

  const paginationContainer = document.getElementById("pagination-container");
  paginationContainer.innerHTML = "";

  const prevButton = document.createElement("button");
  prevButton.textContent = "Previous";
  prevButton.className =
    "border-2 rounded p-2 hover:cursor-pointer hover:bg-indigo-800 bg-indigo-200 text-indigo-800 hover:text-indigo-200";
  prevButton.disabled = state.currentPage === 1;
  prevButton.onclick = async () => {
    state.currentPage--;
    const data = await fetchPosts(state.currentPage);

    renderPosts(data);
    renderPagination(data);
  };

  const nextButton = document.createElement("button");
  nextButton.textContent = "Next";
  nextButton.className =
    "border-2 rounded px-5 py-2 hover:cursor-pointer hover:bg-indigo-800 bg-indigo-200 text-indigo-800 hover:text-indigo-200";
  nextButton.disabled = state.currentPage === totalPages;
  nextButton.onclick = async () => {
    state.currentPage++;
    const data = await fetchPosts(state.currentPage);

    renderPosts(data);
    renderPagination(data);
  };

  const pageCounter = document.createElement("p");
  pageCounter.className = "text-indigo-800";
  pageCounter.textContent = `Page ${state.currentPage} of ${totalPages}`;

  paginationContainer.appendChild(prevButton);
  paginationContainer.appendChild(pageCounter);
  paginationContainer.appendChild(nextButton);
}

// Display Posts/Pagination
document
  .getElementById("display-posts")
  .addEventListener("click", handleDisplay);

async function handleDisplay(event) {
  event.preventDefault();
  const data = await fetchPosts(state.currentPage);
  console.log("Fetched Posts: ", data);
  renderPosts(data);
  renderPagination(data);
}
