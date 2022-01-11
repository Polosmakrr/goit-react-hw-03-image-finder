 
const URL = "https://pixabay.com/api/";
const API_KEY = "24080783-03e8685994000525a28035f2f";

function fetchPick(queryName, page) {
    return fetch(
        `${URL}?q=${queryName}&key=${API_KEY}&image_type=photo&orientation=horizontal&page=${page}&per_page=12`
    )
        
        .then(response => {
            if (response.status === 404) {
                return Promise.reject("Oops, something went wrong");
            }
           return response.json();     
        });
}

export default fetchPick; 