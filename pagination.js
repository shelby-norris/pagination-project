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

async function renderPosts(posts) {
    const postContainer = document.getElementById("post-container");
    postContainer.innerHTML = "";
    // postContainer.className = 

    postData.docs.forEach
}