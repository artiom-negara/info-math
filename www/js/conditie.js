const inputElement = document.getElementById('input');
const loadButton = document.getElementById('load');
const outputElement = document.getElementById('output');
const outputImage = document.getElementById('img');
const outputPdf = document.getElementById('viewer');
const fileList = document.getElementById('file-list');
const clearButton = document.getElementById('clear');

inputElement.addEventListener('change', () => {
    handleFiles(inputElement.files);
});

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

function handleClassSelection(event) {
    // Access the value of the radio button that was changed
    var selectedValue = event.target.value;
    console.log(`Selected class: ${selectedValue}`);
    // Perform actions based on selectedValue
}

function clearrr(target) {
    target.value = '';
}

function handleFiles(filesArray) {
    fileList.style.display = 'block'; // Show the list
    fileList.innerHTML = ''; // Clear existing list items

    Array.from(filesArray).forEach(file => {
        console.log(file.type);

        let fileElement = document.createElement('li');
        fileElement.innerText = file.name;

        fileElement.addEventListener('click', () => {
            const reader = new FileReader();

            reader.onload = () => {
                if (file.type === 'text/plain') {
                    outputElement.value = reader.result;
                    outputElement.style.display = 'inline-block';
                    outputImage.style.display = 'none';
                    outputPdf.style.display = 'none';
                }
                else if (file.type.startsWith('image/')) { // Covering both jpeg and png
                    outputImage.src = URL.createObjectURL(file);
                    outputImage.onload = () => {
                        URL.revokeObjectURL(outputImage.src); // Clean up memory
                    };
                    outputImage.style.display = 'block';
                    outputElement.style.display = 'none';
                    outputPdf.style.display = 'none';
                }
                else if (file.type === 'application/pdf') {
                    const objUrl = URL.createObjectURL(file);
                    outputPdf.src = objUrl;
                    outputPdf.onload = () => {
                        URL.revokeObjectURL(objUrl); // Clean up memory
                    };
                    outputImage.style.display = 'none';
                    outputElement.style.display = 'none';
                    outputPdf.style.display = 'block';
                }
            };

            if (file.type === 'text/plain') {
                reader.readAsText(file);
            } else if (file.type.startsWith('image/') || file.type === 'application/pdf') {
                reader.readAsDataURL(file); // For images and PDFs, load as data URL
            }
        });

        fileList.appendChild(fileElement);
    });
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
