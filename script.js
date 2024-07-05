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
            videos = videos.filter(video => video.snippet.publishTime !== '2013-02-18T22:23:24Z');

            let videoContainer = document.querySelector(".right-section");
            for (let video of videos) {
                const videoId = video.id.videoId;
                const videoTitle = video.snippet.title;
                console.log(video.snippet.publishTime);
                videoContainer.innerHTML += `
                            <div class="video-item">
                                <iframe src="https://www.youtube.com/embed/${videoId}" frameborder="0" width = 80%
                                align-line="center" allowfullscreen></iframe>
                                <h3>${videoTitle}</h3>
                            </div>
                        `;
            }
        })
        .catch(error => {
            console.error('Error fetching YouTube API:', error);
        });
}

fetchVideos();

// document.getElementById('load-more').addEventListener('click', () => {
//     if (nextPageToken) {
//         fetchVideos(nextPageToken);
//     }
// });

const element = document.querySelector("#resizeButton");
console.log("Element", element);

element.addEventListener('click', function () {

    const rightSection = document.querySelector('.right-section');
    const container = document.querySelector('#container');
    const navWrapper = document.querySelector('.nav-wrapper')

    rightSection.classList.add("resize-section-right");
    container.classList.add("resize-section-middle")
    navWrapper.classList.add("resize-section-left")
});

