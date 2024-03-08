// You can access the NodeCG api anytime from the `window.nodecg` object
// Or just `nodecg` for short. Like this!:
document.querySelector("#set").addEventListener("click", setPortalName);

function setPortalName() {
    const portal = document.querySelector("#setPortal").value;
    const portalReplicant = nodecg.Replicant("portalName");

    console.log("??");
    portalReplicant.value = portal;
}
