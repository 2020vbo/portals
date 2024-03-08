// You can access the NodeCG api anytime from the `window.nodecg` object
// Or just `nodecg` for short. Like this!:
const portalReplicant = nodecg.Replicant("portalName");
portalReplicant.on("change", value => {
    document.querySelector("#portal").innerHTML = value;
});
