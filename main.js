let gallery = document.getElementById('gallery');
let fileInput = document.getElementById('file-input');
let fileLoader = document.getElementById('file-loader');
let showGalleryBtn = document.getElementById('show');
let loadImageBtn = document.getElementById('load');

function createImage(src) {
    let img = document.createElement('img');
    img.src = src;
    return img;
}

function addImg(input) {
    if ( input.files && input.files[0] ) {
        let reader = new FileReader();
        reader.onload = function(e) {
            let img = createImage(e.target.result);
            gallery.appendChild(img);
            input.src = img.src;
        };
        reader.readAsDataURL(input.files[0]);
    }
}

fileInput.addEventListener('change', function() {
    addImg(this);
});

function showElement(element) {
    element.style.display = 'block';
}

loadImageBtn.addEventListener('click', function () {
    showElement(fileLoader);
});

showGalleryBtn.addEventListener('click', function () {
    if ( gallery.children.length !== 0 ) {
        showElement(gallery);
    } else {
        alert("Sorry, but you didn't load images in gallery");
    }
});

// drag-and-drop
let dropArea = document.getElementById('drop-area');

['dragover', 'drop'].forEach(event => {
    dropArea.addEventListener(event, preventDefaults, false)
});

function preventDefaults (e) {
    e.preventDefault();
    e.stopPropagation();
}

['dragenter', 'dragover'].forEach(event => {
    dropArea.addEventListener(event, highlight, false)
});

['dragleave', 'drop'].forEach(event => {
    dropArea.addEventListener(event, unhighlight, false)
});

function highlight(e) {
    dropArea.classList.add('highlight');
}

function unhighlight(e) {
    dropArea.classList.remove('highlight');
}

dropArea.addEventListener('drop', handleDrop, false);

function handleDrop(e) {
    let dt = e.dataTransfer;
    let files = dt.files;
    handleFiles(files)
}

function uploadFile(file) {
    let url = 'ВАШ URL ДЛЯ ЗАГРУЗКИ ФАЙЛОВ';
    let xhr = new XMLHttpRequest();
    let formData = new FormData();
    xhr.open('POST', url, true);
    formData.append('file', file);
    xhr.send(formData);
}

function previewFile(file) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function() {
        let img = createImage(reader.result);
        gallery.appendChild(img);
    }
}

function handleFiles(files) {
    files = [...files];
    files.forEach(uploadFile);
    files.forEach(previewFile);
}