module.exports = async function moveZettel(params) {
    const ARCHIVE_FOLDER = "07 - Archives/";
    const Notice = params.obsidian.Notice;



    // get active file
    const activeFile = params.app.workspace.getActiveFile();
    const activeFileName = activeFile.basename;
    const activeFileFolder = activeFile.parent.path;
    const activeFileExt = activeFile.extension;



    if (activeFileFolder === ARCHIVE_FOLDER) {
        new Notice("File is already in Archives folder");
        return;
    }

    if (activeFileExt !== "md") {
        new Notice("File is not a markdown file");
        return;
    }


    // log active file info
    console.log(activeFileFolder);
    console.log(activeFileName);
    console.log(activeFileExt);



    // move file to private folder
    await params.app.vault.rename(
        activeFile,
        `${ARCHIVE_FOLDER}${activeFileName}.${activeFileExt}`
    );
}
