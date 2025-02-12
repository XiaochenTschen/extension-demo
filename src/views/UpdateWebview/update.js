const vscode = acquireVsCodeApi();

document.getElementById('uploadButton').addEventListener('click', () => {
  vscode.postMessage({ command: 'startUpload' });
});

window.addEventListener('message', event => {
  const message = event.data;

  if (message.command === 'updateProgress') {
    document.getElementById('progressBar').style.width = message.progress + '%';
    document.getElementById('progressBar').textContent = message.progress + '%';
  } else if (message.command === 'populateDropdown') {
    const dropdown = document.getElementById('fileSelect');
    dropdown.innerHTML = `<option value="" disabled selected>--- Select ELF ---</option>`;
    message.files.forEach(file => {
      const option = document.createElement('option');
      option.textContent = file;
      option.value = file;
      dropdown.appendChild(option);
    });
  }
});

// 初次加载时请求文件列表
vscode.postMessage({ command: 'loadFiles' });
