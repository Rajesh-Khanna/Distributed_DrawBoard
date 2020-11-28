let lastEntityId = 0;
const syncEvery = 1000;

const checkForUpdates = async() => {
    const path = 'updateDrawBoard'
    response = await getApiCall(path, { lastEntityId: lastEntityId, workSpaceId: userInfo.workSpaceId });
    othersShapes = othersShapes.concat(response);
}

const startSyncing = () => {
    const interval = setInterval(function() {
        checkForUpdates();
    }, syncEvery);
    //   clearInterval(interval); // thanks @Luca D'Amico
}