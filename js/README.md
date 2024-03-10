# File Structure Generator

### Generating the File Structure JSON

To generate the file structure JSON, follow these steps:

1. Open the `file-index-generator.js` file.
2. Modify the `targetDir` variable to specify the directory whose file structure you want to represent, by default it points to the `dosare` folder
3. Run the script using Node.js:

```bash
 node file-index-generator.js 
```


4. The script will generate a `file-index.js` file containing the JSON representation of the file structure.

You can manually update the `file-index.js` file with any changes to the file structure or regenerate it using the script as needed.

### Using the File Structure in Website Functionality

The generated `file-index.js` file is used in the functionality of the website to allow users to select pre-selected files based on their class and file type preferences. The `file-preselected-lib.js` library provides helper functions for handling class selection events and retrieving files corresponding to the selected class and folder.

```json
{
    const fileStructure = {
      "clasa5": {
        "Cplusplus": {
          "files": [
            "clasa5/Cplusplus/sol_cl5_#1.txt",
            "clasa5/Cplusplus/sol_cl5_#1gen .txt",
            "clasa5/Cplusplus/sol_cl5_#2.txt",
            "clasa5/Cplusplus/sol_cl5_#3.txt",
            "clasa5/Cplusplus/sol_cl5_#4.txt"
          ]
        },
        "Enunturi": {
          "files": [
            "clasa5/Enunturi/enunt_cl5_Ro_#1.pdf",
            "clasa5/Enunturi/enunt_cl5_Ro_#1gen.pdf",
            "clasa5/Enunturi/enunt_cl5_Ro_#2.pdf",
            "clasa5/Enunturi/enunt_cl5_Ro_#3.pdf",
            "clasa5/Enunturi/enunt_cl5_Ro_#4.pdf"
          ]
        },
        "Pascal": {
          "files": [
            "clasa5/Pascal/sol_cl5_#1.pas"
          ]
        },
        "Solutii": {
          "files": [
            "clasa5/Solutii/sol_cl5_Ro_#1.pdf",
            "clasa5/Solutii/sol_cl5_Ro_#2.pdf",
            "clasa5/Solutii/sol_cl5_Ro_#3.pdf",
            "clasa5/Solutii/sol_cl5_Ro_#4.pdf"
          ]
        },
        "files": []
      },
      "clasa6": {
        "Cplusplus": {
          "files": []
        },
        "Enunturi": {
          "files": []
        },
        "Pascal": {
          "files": []
        },
        "Solutii": {
          "files": []
        },
        "files": []
      },
      "clasa7": {
        "Cplusplus": {
          "files": []
        },
        "Enunturi": {
          "files": [
            "clasa7/Enunturi/enunt_cl7_Ro_#1.pdf"
          ]
        },
        "Pascal": {
          "files": []
        },
        "Solutii": {
          "files": [
            "clasa7/Solutii/sol_cl7_Ro_#1.pdf"
          ]
        },
        "files": []
      },
      "clasa8": {
        "Cplusplus": {
          "files": []
        },
        "Enunturi": {
          "files": []
        },
        "Pascal": {
          "files": []
        },
        "Solutii": {
          "files": []
        },
        "files": []
      },
      "clasa9": {
        "Cplusplus": {
          "files": []
        },
        "Enunturi": {
          "files": []
        },
        "Pascal": {
          "files": []
        },
        "Solutii": {
          "files": []
        },
        "files": []
      },
      "files": []
    };
}
```