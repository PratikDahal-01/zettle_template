module.exports = async function moveZettel(params) {
    const SLEEPING_FOLDER = "03 - Sleeping/";
    const Notice = params.obsidian.Notice;



    // get active file
    const activeFile = params.app.workspace.getActiveFile();
    const activeFileName = activeFile.basename;
    const activeFileFolder = activeFile.parent.path;
    const activeFileExt = activeFile.extension;



    if (activeFileFolder === SLEEPING_FOLDER) {
        new Notice("File is already in sleeping folder");
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
        `${SLEEPING_FOLDER}${activeFileName}.${activeFileExt}`
    );
}
