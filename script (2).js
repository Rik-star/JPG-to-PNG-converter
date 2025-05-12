const fileInput = document.getElementById('fileInput');
const dropZone = document.getElementById('dropZone');
const uploadBtn = document.getElementById('uploadBtn');
const clearBtn = document.getElementById('clearBtn');
const downloadAllBtn = document.getElementById('downloadAllBtn');
const previewSection = document.getElementById('previewSection');

let images = [];

function handleFiles(files) {
  [...files].forEach(file => {
    const reader = new FileReader();
    reader.onload = e => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        canvas.toBlob(blob => {
          const url = URL.createObjectURL(blob);
          images.push({ name: file.name.replace(/\.[^.]+$/, '.png'), url });
          const a = document.createElement('a');
          a.href = url;
          a.download = file.name.replace(/\.[^.]+$/, '.png');
          a.textContent = 'Download PNG';
          a.className = 'btn';
          const div = document.createElement('div');
          div.className = 'image-preview';
          div.appendChild(document.createTextNode(file.name));
          div.appendChild(document.createElement('br'));
          div.appendChild(a);
          previewSection.appendChild(div);
        }, 'image/png');
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

dropZone.addEventListener('dragover', e => {
  e.preventDefault();
  dropZone.style.borderColor = '#2980b9';
});

dropZone.addEventListener('dragleave', () => {
  dropZone.style.borderColor = '#ccc';
});

dropZone.addEventListener('drop', e => {
  e.preventDefault();
  dropZone.style.borderColor = '#ccc';
  handleFiles(e.dataTransfer.files);
});

uploadBtn.addEventListener('click', () => {
  handleFiles(fileInput.files);
});

clearBtn.addEventListener('click', () => {
  previewSection.innerHTML = '';
  images = [];
});

downloadAllBtn.addEventListener('click', () => {
  images.forEach(img => {
    const a = document.createElement('a');
    a.href = img.url;
    a.download = img.name;
    a.click();
  });
});
