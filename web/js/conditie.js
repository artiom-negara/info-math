const inputElement = document.getElementById('input');
const loadButton = document.getElementById('load');
const outputElement = document.getElementById('output');
const outputImage = document.getElementById('img');
const outputPdf = document.getElementById('viewer');
const fileList = document.getElementById('file-list');
const clearButton = document.getElementById('clear');
const preselectedDiv = document.getElementById('preselected-div');

var preselectedFiles = []

inputElement.addEventListener('change', () => {
    clearPreselectedFiles();
    handleFiles(inputElement.files);
});

clearButton.addEventListener('click', () => {
    // Reset the input element
    inputElement.value = '';

    // Clear the output area
    outputElement.value = '';
    // Hide and clear the fileList
    while (fileList.firstChild) {
        fileList.removeChild(fileList.firstChild);
    }
    fileList.style.display = 'none';

    // Reset display styles for output elements
    outputElement.style.display = 'inline-block';
    outputImage.style.display = 'none';
    outputPdf.style.display = 'none';

    clearPreselectedFiles();
});

preselectedDiv.querySelectorAll('input[type="radio"][name="classesRadio"]').forEach(radio => {
    radio.addEventListener('change', function() {
        if (this.checked) {
            preselectedFiles = handleClassSelection(this.value);
            fetchAndLoadPreselectedFiles(preselectedFiles);
        }
    });
    // Check if this radio button is already checked and trigger the function accordingly
    if (radio.checked) {
        preselectedFiles = handleClassSelection(radio.value);
        fetchAndLoadPreselectedFiles(preselectedFiles);
    }
});


function clearPreselectedFiles() {
    preselectedDiv.querySelectorAll('input[type="radio"][name="classesRadio"]').forEach(radio => {
        radio.checked = false;
    });
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

function fetchAndLoadPreselectedFiles(preselectedFiles) {

    // Assuming preselectedFiles is an array of file paths to be loaded
    const fetchFilePromises = preselectedFiles.map(filePath =>
        fetch(filePath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to fetch file: ${filePath}`);
            }
            return response.blob();
        })
        .then(blob => new File([blob], filePath.split('/').pop(), { type: blob.type }))
    );

    // Wait for all files to be fetched and converted to File objects
    Promise.all(fetchFilePromises)
    .then(files => {
        // Now 'files' is an array of File objects
        handleFiles(files);
    })
    .catch(error => {
        console.error('Error fetching files:', error);
    });
}
