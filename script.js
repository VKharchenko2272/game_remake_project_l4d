"use strict";

const API_URL = "";
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
                if (document.title === 'Videos') {
                    videoContainer = document.querySelector(".videos");
                    console.log(document.title);
                    console.log(videoContainer);
                }
                const videoId = video.id.videoId;
                const videoTitle = video.snippet.title;
                console.log(video.snippet.publishTime);
                console.log(videoContainer);

                const videoElement = document.createElement('div');
                videoElement.classList.add('video-item');
                videoElement.innerHTML = `
                    <iframe src="https://www.youtube.com/embed/${videoId}" frameborder="0" width="100%"
                    align="center" allowfullscreen></iframe>
                    <p class="video-title">${videoTitle}</p>
                `;
                videoContainer.appendChild(videoElement);
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
let resizeButtonCheck = true;

element.addEventListener('click', function () {
    const rightSection = document.querySelector('.right-section');
    const container = document.querySelector('#container');
    const navWrapper = document.querySelector('.nav-wrapper');
    const buttonImage = document.querySelector("#resizeButton");
    let action;

    if (resizeButtonCheck) {
        action = 'add';
        changeSize(action);
    } else {
        action = 'remove';
        changeSize(action);
    }

    function changeSize(action) {
        if (action === 'add') {
            rightSection.classList.add("resize-section-right");
            container.classList.add("resize-section-middle");
            navWrapper.classList.add("resize-section-left");
            buttonImage.style.background = 'url(img/triangle-opposite.png)';
            resizeButtonCheck = false;
        } else if (action === 'remove') {
            rightSection.classList.remove("resize-section-right");
            container.classList.remove("resize-section-middle");
            navWrapper.classList.remove("resize-section-left");
            buttonImage.style.background = 'url(img/triangle.png)';
            resizeButtonCheck = true;
        }
    }
});
