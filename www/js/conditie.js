const inputElement = document.getElementById('input');
const loadButton = document.getElementById('load');
const outputElement = document.getElementById('output');
const outputImage = document.getElementById('img');
const outputPdf = document.getElementById('viewer');
const fileList = document.getElementById('file-list');
const clearButton = document.getElementById('clear');

inputElement.addEventListener('change', handleFiles);
const reader = new FileReader();


reader.addEventListener('load', () => {
    outputElement.value = reader.result;
}, false);

clearButton.addEventListener('click', () => {
    outputElement.value = '';
    while (fileList.firstChild) {
        fileList.style.display = 'none';
        fileList.removeChild(fileList.firstChild);
        outputElement.style.display = 'inline-block';
        outputImage.style.display = 'none';
        outputPdf.style.display = 'none';
    }
});

function clearrr(target) {
    target.value = '';
}

function handleFiles() {

    for (const file of inputElement.files) {
        console.log(file.type);

        fileList.style.display = 'block';
        fileElement = document.createElement('li');
        fileElement.innerText = file.name;

        fileElement.addEventListener('click', () => {
            if (file.type === 'text/plain') {
                reader.readAsText(file);
                outputElement.style.display = 'inline-block';
                outputImage.style.display = 'none';
                outputPdf.style.display = 'none';
            }
        
            else if (file.type === 'image/jpeg' || file.type === 'image/png') {
                outputImage.src = URL.createObjectURL(file);
                outputImage.onload = () => {
                    URL.revokeObjectURL(outputImage.src);
                    outputImage.style.display = 'block';
                    outputElement.style.display = 'none';
                    outputPdf.style.display = 'none';
              };
            }
        
            else if (file.type === 'application/pdf') {
                const obj_url = URL.createObjectURL(file);
                outputPdf.setAttribute("src", obj_url);
                URL.revokeObjectURL(obj_url);
                outputImage.style.display = 'none';
                outputElement.style.display = 'none';
                outputPdf.style.display = 'inline-block';
            }
        });

        fileList.appendChild(fileElement);
    }  
}

function saveToFile(source) {
    const textareaContent = document.getElementById(source).value;

    const blob = new Blob([textareaContent], { type: 'text/plain' });

    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');

    link.href = url;

    link.download = 'textfile.txt';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}
