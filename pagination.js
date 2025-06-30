const state = {
  currentPage: 1,
  isRateLimit: false,
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
function renderPosts(posts) {
  const postContainer = document.getElementById("post-container");
  postContainer.innerHTML = "";
  postContainer.className = "border-1 rounded p-4 border-indigo-400";

  posts.forEach((post) => {
    const postElement = document.createElement("div");
    postElement.className =
      "border-1 rounded p-4 border-indigo-400 text-indigo-800";

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

function renderPagination(numFound) {
  // const totalPages = Math.ceil(numFound / 10);

  console.log(numFound, "data numFound");

  const paginationContainer = document.getElementById("pagination-container");
  paginationContainer.innerHTML = "";

  const prevButton = document.createElement("button");
  prevButton.textContent = "Previous";
  prevButton.className =
    "border-2 rounded p-2 hover:cursor-pointer hover:bg-indigo-800 bg-indigo-200 text-indigo-800 hover:text-indigo-200";
  prevButton.disabled = state.currentPage === 1;
  prevButton.onclick = async () => {
    state.currentPage--;
    if (state.isRateLimit === false) {
      const data = await fetchPosts(state.currentPage);
      state.isRateLimit = true;

      console.log("DATA", data);
      renderPosts(data);
      renderPagination(data.numFound);
    } else {
      alert("SLOW DOWN!");
      return;
    }

    setTimeout({}, (state.isRateLimit = false), 2000);
  };

  const nextButton = document.createElement("button");
  nextButton.textContent = "Next";
  nextButton.className =
    "border-2 rounded px-5 py-2 hover:cursor-pointer hover:bg-indigo-800 bg-indigo-200 text-indigo-800 hover:text-indigo-200";
  nextButton.disabled = state.currentPage === 10;
  nextButton.onclick = async () => {
    state.currentPage++;
    if (state.isRateLimit === false) {
      const data = await fetchPosts(state.currentPage);
      state.isRateLimit = true;

      renderPosts(data);
      renderPagination(data.numFound);
    } else {
      alert("SLOW DOWN!");
      return;
    }

    setTimeout({}, (state.isRateLimit = false), 2000);
  };

  const pageCounter = document.createElement("p");
  pageCounter.className = "text-indigo-800";
  pageCounter.textContent = `Page ${state.currentPage} of 10`;

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
  renderPagination(data.numFound);
}
