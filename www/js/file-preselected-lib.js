function handleClassSelection(selectedValue) {

    //console.log(`Selected class: ${selectedValue}`);

    const [classValue, fileType] = selectedValue.split('/');
    //console.log('Class:', classValue);
    //console.log('File type:', fileType); 

    const paths = getFilesForClassAndFolder(classValue, fileType);
    //console.log('Files for class and folder:', filesPath);

    return paths.map(encodePathComponents);;
}

function getFilesForClassAndFolder(selectedValue, folder) {
    const classFiles = fileStructure[selectedValue];

    if (classFiles && folder in classFiles) {
        return classFiles[folder].files || [];
    }

    return [];
}

const encodePathComponents = (path) => {
    return path.split('/').map(component => encodeURIComponent(component)).join('/');
};