const API_URL = ``;
let nextPageToken = '';

function fetchVideos(pageToken = '') {
    let url = API_URL;
    if (pageToken) {
        url += `&pageToken=${pageToken}`;
    }

    fetch(url)
        .then(result => result.json())
        .then(data => {
            console.log(data);
            let videos = data.items;
            nextPageToken = data.nextPageToken;
            console.log(nextPageToken);
            let videoContainer = document.querySelector(".right-section");
            for (let video of videos) {
                const videoId = video.id.videoId;
                const videoTitle = video.snippet.title;
                console.log(video.snippet.publishTime);
                videoContainer.innerHTML += `
                            <div class="video-item">
                                <iframe src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>
                                <h3>${videoTitle}</h3>
                            </div>
                        `;
            }
        })
        .catch(error => {
            console.error('Error fetching YouTube API:', error);
        });
}

// Future
// fetchVideos();


// document.getElementById('load-more').addEventListener('click', () => {
//     if (nextPageToken) {
//         fetchVideos(nextPageToken);
//     }
// });