const chatroomSection = document.getElementById("Room-List");
if (chatroomSection) {
    const childIDs = Array.from(chatroomSection.children)
        .filter((child) => child.id)
        .map((child) => child.id);
    console.log(childIDs);
}
export {};
//# sourceMappingURL=chatroomManager.js.map