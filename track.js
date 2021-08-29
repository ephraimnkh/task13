let tracks = [];
let trackID = document.getElementById("trackID");
let artist = document.getElementById("artist");
let title = document.getElementById("title");
let album = document.getElementById("album");
let genre = document.getElementById("genre");
let trackIDLabel = document.getElementById("trackIDLabel");
let artistLabel = document.getElementById("artistLabel");
let titleLabel = document.getElementById("titleLabel");
let albumLabel = document.getElementById("albumLabel");
let genreLabel = document.getElementById("genreLabel");

// This code runs everytime this JS File loads.
/* 
    This code will load the tracks from the session storage if this code has run before 
    but if this is the first time then the empty tracks array will be set as the value of the tracks
    key in the session storage.
*/
if (sessionStorage.getItem("hasCodeRunBefore") === null) {
    sessionStorage.setItem("tracks", JSON.stringify(tracks));
    sessionStorage.setItem("hasCodeRunBefore", true);
} else {
    tracks = JSON.parse(sessionStorage.getItem("tracks"));
    updateTrackDisplay();
}

// Track Object
function Track(artist, title, album, genre) {
    this.artist = artist;
    this.title = title;
    this.album = album;
    this.genre = genre;
}

function performAction(action) {
    removeTrackDisplay();
    // Add new track to array and update session storage.
    if (action === 'add') {
        let newTrack = new Track(artist.value, title.value, album.value, genre.value);
        tracks.push(newTrack);
        clearFormFields();
    }
    // Update a track and use splice to update that track in the tracks array then update session storage.
    if (action === 'update') {
        let newTrack = new Track(artist.value, title.value, album.value, genre.value);
        tracks.splice(getTrackID() - 1, 1, newTrack);
    }
    // Delete a track by grabbing it's index and splicing the tracks array and update session storage.
    if (action === 'delete') {
        let withinRange = isNumber(getTrackID()) && isWithinRange(getTrackID(), tracks) ? true : false;
        let text = tracks.length > 1 ? `Pick an ID Between 1 and ${tracks.length}` : "You can only pick ID 1";
        if (withinRange) tracks.splice(getTrackID() - 1, 1);
        else alert(`${text}`);
    }
    updateSessionStorage(tracks);
    updateTrackDisplay();
}

// This function changes form fields according to the type of form the user wants.
// The form button text, color, and function are updated according
// to the purpose of the user.
function changeForm(formFunction) {
    // Clear all form fields whenever the user changes the form function.
    clearFormFields();

    // Show form fields for add and update as they are needed for track info.
    if (formFunction === 'add' || formFunction === 'update') hideFormFields(false);

    // Show TrackID when updating or deleting a track so you can reference tracks.
    if (formFunction === 'update' || formFunction === 'delete') hideTrackIDField(false);

    // Hide trackID since ID is not needed when creating a track.
    if (formFunction === 'add') {
        hideTrackIDField(true);
        changeFormButton("Add Track", "btn btn-primary rounded", "performAction('add')");
    }

    if (formFunction === 'update') {
        changeFormButton("Update Track", "btn btn-success rounded", "performAction('update')");
    }

    // Hide form fields as they are not needed when deleting a track.
    if (formFunction === 'delete') {
        hideFormFields(true);
        changeFormButton("Delete Track", "btn btn-danger rounded", "performAction('delete')");
    }
}

function addTrackInfo() {
    let formFunction = document.getElementById("formFunction").value;
    if (formFunction !== 'update') return;
    let track = tracks[getTrackID() - 1];
    // Only set track values if track is found. Track won't be found if user did not enter a valid trackID.
    // Fields will be cleared if no trackID is found.
    if (track != null) {
        artist.value = track.artist;
        title.value = track.title;
        album.value = track.album;
        genre.value = track.genre;
    } else clearFormFields(formFunction);
}

// Updates the list of tracks.
function updateTrackDisplay() {
    // First check if there is a need to update by checking if there are any tracks.
    // Show or hide the display based on if there are tracks or not.
    if (tracks.length > 0) {
        hideTrackDisplay(false);
        // Build track holding ordered list with valid bootstrap classes for styling.
        let ol = document.createElement("ol");
        ol.className = "list-group list-group-numbered";
        // Set id for holding list so it can be removed when needed by removeTrackDisplay().
        ol.setAttribute("id", "favoriteTracks");
        // Run throught each track and build the list item for it using valid bootstrap classes and 
        // the correct append hierarchy.
        tracks.forEach((track) => {
            // Create elements for list item.
            let li = document.createElement("li");
            li.className = "list-group-item d-flex justify-content-between align-items-start";
            let div = document.createElement("div");
            div.className = "ms-2 me-auto";
            let div2 = document.createElement("div");
            div2.className = "fw-bold";
            let titleText = document.createTextNode(track.title);
            let text = document.createTextNode(track.album + ", " + track.artist + ", " + track.genre);
            // Appending elements/nodes from innermost to outermost.
            div2.appendChild(titleText);
            div.appendChild(div2);
            div.appendChild(text);
            li.appendChild(div);
            ol.appendChild(li);
        });
        // Add ordered list to container on HTML page.
        favoriteTracksContainer.appendChild(ol);
    } else hideTrackDisplay(true);
}

// updates the tracks session storage value.
function updateSessionStorage(array) {
    sessionStorage.setItem("tracks", JSON.stringify(array));
}

// Removes the Track Display before the updateTrackDisplay function is called
// so there isn't multiple track displays on screen when the update creates a 
// new ordered list to display tracks.
function removeTrackDisplay() {
    // Check if the display even exists yet before removing.
    if (document.getElementById("favoriteTracks")) document.getElementById("favoriteTracks").remove();
}

function clearFormFields(formFunction) {
    if (formFunction !== 'update') trackID.value = "";
    artist.value = "";
    title.value = "";
    album.value = "";
    genre.value = "";
}

// Hides the container containing the tracks and the Label.
function hideTrackDisplay(show) {
    favoriteTracksContainer.hidden = show;
    favoriteTracksLabel.hidden = show;
}

function hideTrackIDField(show) {
    trackID.hidden = show;
    trackIDLabel.hidden = show;
}

function hideFormFields(show) {
    artist.hidden = show;
    title.hidden = show;
    album.hidden = show;
    genre.hidden = show;
    artistLabel.hidden = show;
    titleLabel.hidden = show;
    albumLabel.hidden = show;
    genreLabel.hidden = show;
}

// Updates the Form Button to whatever values you provide for the onclick, styling classes and text.
function changeFormButton(text, classes, onclickFunction) {
    submitBtn.innerHTML = text;
    submitBtn.className = classes;
    submitBtn.setAttribute("onclick", onclickFunction);
}

// Returns whether a value is a number or not by specifying true|false.
function isNumber(value) {
    return !Number.isNaN(value);
}

// Returns whether an index is within the range of valid indices for an array by specifying true|false.
function isWithinRange(index, array) {
    return index >= 1 && index <= array.length;
}

function getTrackID() {
    return document.getElementById("trackID").value;
}