"use strict";

await fetch("")
.then((result)=>{
    return result.json()
}).then((data)=>{
    console.log(data)
    let videos = data.items
    nextPageToken = data.nextPageToken
    let videoContainer = document.querySelector(".right-section")
    for(video of videos){
        videoContainer.innerHTML += `
            <img src = "$video.snippet.thumbnails.default.url">
        `
    }
})
