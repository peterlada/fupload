let handleFiles;

document.addEventListener("DOMContentLoaded", event => {
  let dropArea = document.getElementById('drop-area');
  let uploadProgress = [];
  let progressBar = document.getElementById('progress-bar');

  ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, preventDefaults, false);
  });

  ['dragenter', 'dragover'].forEach(eventName => {
    dropArea.addEventListener(eventName, highlight, false);
  });

  ['dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, unhighlight, false);
  })

  function preventDefaults (e) {
    e.preventDefault();
    e.stopPropagation();
  }

  function highlight(e) {
    dropArea.classList.add('highlight');
  }

  function unhighlight(e) {
    dropArea.classList.remove('highlight');
  }

  dropArea.addEventListener('drop', handleDrop, false);

  function initializeProgress(numFiles) {
    progressBar.value = 0;
    uploadProgress = [];

    for(let i = numFiles; i > 0; i--) {
      uploadProgress.push(0)
    }
  }

  function updateProgress(fileNumber, percent) {
    uploadProgress[fileNumber] = percent
    let total = uploadProgress.reduce((tot, curr) => tot + curr, 0) / uploadProgress.length
    progressBar.value = total
  }

  function handleDrop(e) {
    let dt = e.dataTransfer;
    let files = dt.files;

    handleFiles(files);
  }

  global handleFiles = files => {
    initializeProgress(files.length);
    ([...files]).forEach(uploadAndPreviewFile);
  }

  function uploadAndPreviewFile(file) {
    uploadFile(file);
    previewFile(file);
  }

  function uploadFile(file, i) {
    var url = 'http://peterlada.com';
    var xhr = new XMLHttpRequest();
    var formData = new FormData();
    xhr.open('POST', url, true);

    xhr.upload.addEventListener("progress", function(e) {
      updateProgress(i, (e.loaded * 100.0 / e.total) || 100);
    })

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

});
