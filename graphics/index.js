//Browser source link: http://localhost:9090/bundles/portals/graphics/index.html

const portalReplicant = nodecg.Replicant("portalName");
portalReplicant.on("change", value => {
    document.querySelector("#portal").innerHTML = value;
});