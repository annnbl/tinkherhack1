
let color = document.getElementById('color');
let createBtn = document.getElementById('createBtn');
let list = document.getElementById('list');
let CAL = document.getElementById('CAL');

createBtn.onclick = () => {
    let newNote = document.createElement('div');
    newNote.classList.add('note');
    newNote.innerHTML = `
    <span class="close">x</span>
    <textarea
    placeholder="Write Content..."
    rows="10" cols="30"></textarea>`;
    newNote.style.borderColor = color.value;
    list.appendChild(newNote)
}
document.addEventListener('click', (event) => {
    if(event.target.classList.contains('close')){
        event.target.parentNode.remove();
    }
})

let cursor = {
    x: null,
    y: null
}
let note = {
    dom: null,
    x: null,
    y: null
}
document.addEventListener('mousedown', (event) => {
    if(event.target.classList.contains('note')){
        cursor = {
            x: event.clientX,
            y: event.clientY
        }
        note = {
            dom: event.target,
            x: event.target.getBoundingClientRect().left,
            y: event.target.getBoundingClientRect().top
        }
    }
})

document.addEventListener('mousemove', (event) => {
    if(note.dom == null) return;
    let currentCursor = {
        x: event.clientX,
        y: event.clientY
    }
    let distance = {
        x: currentCursor.x - cursor.x,
        y: currentCursor.y - cursor.y
    }
    note.dom.style.left = (note.x + distance.x) + 'px';
    note.dom.style.top = (note.y + distance.y) + 'px';
    note.dom.style.cursor = 'grab';
})
document.addEventListener('mouseup', () => {
    if( note.dom == null) return;
    note.dom.style.cursor = 'auto';
    note.dom = null;  
})
const dialog = document.getElementById('dialog');
const calendarBtn = document.querySelector('.calendar-btn');
const closeButton = dialog.querySelector('button');

calendarBtn.addEventListener('click', () => {
    dialog.showModal();
});

closeButton.addEventListener('click', (event) => {
    event.preventDefault();
    dialog.classList.add('closing');

    setTimeout(() => {
        dialog.classList.remove('closing');
        dialog.close();
    }, 300); // Match the transition duration (0.3s)
});
function embedPlaylist() {
    let url = document.getElementById('playlistInput').value.trim();
    let embedUrl = '';

    if (url.includes('youtube.com') || url.includes('youtu.be')) {
        let videoId = new URL(url).searchParams.get('list');
        if (videoId) {
            embedUrl = `https://www.youtube.com/embed/videoseries?list=${videoId}`;
        } else {
            alert('Invalid YouTube playlist URL');
            return;
        }
    } else if (url.includes('spotify.com')) {
        let embedSpotifyUrl = url.replace('open.spotify.com', 'embed.spotify.com').replace('/playlist/', '/embed/playlist/');
        embedUrl = embedSpotifyUrl;
    } else {
        alert('Please enter a valid YouTube or Spotify playlist URL.');
        return;
    }

    document.getElementById('playlistEmbed').src = embedUrl;
    document.getElementById('playlistEmbed').style.display = 'block';
}


