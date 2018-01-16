function preventDefaults (e) {
  e.preventDefault();
  e.stopPropagation();
}

function handleDrop(e) {
  let dt = e.dataTransfer;
  let files = dt.files;

  handleFiles(files);
}

function handleFiles(files) {
  ([...files]).forEach(uploadAndPreviewFile);
}

function uploadAndPreviewFile(file) {
  uploadFile(file);
  previewFile(file);
}

function uploadFile(file) {
  let url = 'http://peterlada.com';
  let formData = new FormData();

  formData.append('file', file);

  fetch(url, {
    method: 'POST',
    body: formData
  })
  .then(() => { /* Done. Inform the user */ })
  .catch(() => { /* Error. Inform the user */ });
}

function uploadFileLegacy(file) {
  var url = 'YOUR URL HERE';
  var xhr = new XMLHttpRequest();
  var formData = new FormData();
  xhr.open('POST', url, true);

  xhr.addEventListener('readystatechange', e => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      // Done. Inform the user
    } else if (xhr.readyState == 4 && xhr.status != 200) {
      // Error. Inform the user
    }
  });

  formData.append('file', file);
  xhr.send(formData);
}

function previewFile(file) {
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = function() {
    let img = document.createElement('img');
    img.src = reader.result;
    document.getElementById('gallery').appendChild(img);
  }
}

document.addEventListener("DOMContentLoaded", event => {
  let dropArea = document.getElementById('drop-area');

  ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, preventDefaults, false);
  });

  ['dragenter', 'dragover'].forEach(eventName => {
    dropArea.addEventListener(eventName, highlight, false);
  });

  ['dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, unhighlight, false);
  })

  function highlight(e) {
    dropArea.classList.add('highlight');
  }

  function unhighlight(e) {
    dropArea.classList.remove('highlight');
  }

  dropArea.addEventListener('drop', handleDrop, false);
});
