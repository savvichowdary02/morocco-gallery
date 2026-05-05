const albums = [
  "All",
  "Casablanca",
  "Fes",
  "Chefchaouen",
  "Sahara Desert",
  "Dades Valley",
  "Marrakesh",
  "Food & Souks"
];

let photos = [];
let selectedAlbum = "All";

const filters = document.getElementById("filters");
const gallery = document.getElementById("gallery");
const emptyState = document.getElementById("emptyState");
const photoInput = document.getElementById("photoInput");
const captionInput = document.getElementById("captionInput");
const albumInput = document.getElementById("albumInput");

function renderFilters() {
  filters.innerHTML = "";

  albums.forEach((album) => {
    const button = document.createElement("button");
    button.className = `filter-btn ${selectedAlbum === album ? "active" : ""}`;
    button.textContent = album;
    button.onclick = () => {
      selectedAlbum = album;
      renderFilters();
      renderGallery();
    };
    filters.appendChild(button);
  });
}

function renderGallery() {
  const visiblePhotos =
    selectedAlbum === "All"
      ? photos
      : photos.filter((photo) => photo.album === selectedAlbum);

  gallery.innerHTML = "";

  emptyState.style.display = photos.length === 0 ? "block" : "none";

  visiblePhotos.forEach((photo) => {
    const card = document.createElement("article");
    card.className = "photo-card";

    card.innerHTML = `
      <div class="photo-wrap">
        <img src="${photo.src}" alt="${photo.caption}">
        <button class="delete-btn" title="Remove photo">🗑</button>
      </div>
      <div class="photo-info">
        <div class="album">📍 ${photo.album}</div>
        <div class="caption">${photo.caption}</div>
        <p class="filename">${photo.name}</p>
      </div>
    `;

    card.querySelector(".delete-btn").onclick = () => {
      photos = photos.filter((item) => item.id !== photo.id);
      renderGallery();
    };

    gallery.appendChild(card);
  });
}

photoInput.addEventListener("change", (event) => {
  const files = Array.from(event.target.files || []);
  const caption = captionInput.value.trim() || "A beautiful Morocco memory";
  const album = albumInput.value;

  const newPhotos = files.map((file) => ({
    id: crypto.randomUUID(),
    src: URL.createObjectURL(file),
    name: file.name,
    caption,
    album
  }));

  photos = [...newPhotos, ...photos];
  captionInput.value = "";
  photoInput.value = "";

  renderGallery();
});

renderFilters();
renderGallery();
