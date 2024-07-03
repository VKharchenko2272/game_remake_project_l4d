"use strict";

fetch("")
.then((result)=>{
    return result.json()
}).then((data)=>{
    console.log(data)
    let videos = data.items;
    let nextPageToken = data.nextPageToken;
    console.log(nextPageToken);
    let videoContainer = document.querySelector(".right-section")
    for(let video of videos){
        videoContainer.innerHTML += `
            <img src = "${video.snippet.thumbnails.default.url}">
        `
    }
})
