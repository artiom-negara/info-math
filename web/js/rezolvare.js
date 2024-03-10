const inputElement = document.getElementById('input');
const inputElement2 = document.getElementById('input2');
const inputElement3 = document.getElementById('input3');
const loadButton = document.getElementById('load');
const outputElement = document.getElementById('output');
const outputElement2 = document.getElementById('cplasplas');
const outputElement3 = document.getElementById('pas');
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

inputElement2.addEventListener('change', handleFiles2);
const reader2 = new FileReader();

inputElement3.addEventListener('change', handleFiles3);
const reader3 = new FileReader();

reader2.addEventListener('load', () => {
    outputElement2.value = reader2.result;
}, false);

reader3.addEventListener('load', () => {
    outputElement3.value = reader3.result;
}, false);

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

function clearrr_cpp() {
    outputElement2.value = `#include <iostream>

int main()
{
    std::cout<<"Hello World";

    return 0;
}
        `;
    inputElement2.value = '';
}

function clearrr_pascal() {
    outputElement3.value = `program Hello;
begin
  writeln ('Hello World')
end.`
    inputElement3.value = '';
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

function handleFiles2() {
    const file = inputElement2.files[0];
    console.log(file.type);
    reader2.readAsText(file);
}

function handleFiles3() {
    const file = inputElement3.files[0];
    console.log(file.type);
    reader3.readAsText(file);
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