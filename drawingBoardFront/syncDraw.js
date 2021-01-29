let lastEntityId = 0;
const syncEvery = 1000;
let usersInWorkSpace = 0;
let updatingUsers = false;

const updateUserCall = async() => {
    const path = 'usersOnBoard';
    if ('workSpaceId' in userInfo) {
        const response = await getApiCall(path, { workSpaceId: userInfo.workSpaceId });
        const participants = document.querySelector('#usersOnBoard');
        if (participants) {
            participants.innerHTML = '';
            response.forEach(element => {
                const li = document.createElement('li');
                li.innerText = `${element.drawUserName}${element.isAdmin? '-(Admin)':''}-${element.isActive? '-(Active)':''}`;
                participants.appendChild(li);;
            });
            usersInWorkSpace = response.length;
            updatingUsers = false;
        }
    }
}

const formatData = data => {
    const jsonFormat = {
        start: {
            x: data.x1,
            y: data.y1,
        },
        end: {
            x: data.x2,
            y: data.y2,
        },
        color: data.colour,
        thick: data.thick,
    };
    if (!updatingUsers && usersInWorkSpace !== data.userCount) {
        updateUserCall();
        updatingUsers = true;
    }
    return jsonFormat;
}

const checkForUpdates = async() => {
    const path = 'updateDrawBoard'
    response = await getApiCall(path, { lastEntityId: lastEntityId, workSpaceId: userInfo.workSpaceId });
    console.log('responsexx: ', response);
    response.forEach(element => {
        const shapeObj = new Shape();
        shapeObj.copy(formatData(element));
        othersShapes.push(shapeObj);
        lastEntityId = max(element.id, lastEntityId)
    });
}

const startSyncing = () => {
    const interval = setInterval(function() {
        checkForUpdates();
    }, syncEvery);
}

const pushShape = async(copyObj) => {
    console.log(userInfo);
    if ('workSpaceId' in userInfo) {
        const props = copyObj.clone();
        const shapeBody = {
            x1: Math.round(props.start.x),
            x2: Math.round(props.end.x),
            y1: Math.round(props.start.y),
            y2: Math.round(props.end.y),
            colour: props.color,
            thick: props.thick,
            workSpaceId: userInfo.workSpaceId,
        };

        const path = 'drawOnBoard';
        response = await apiCall(path, shapeBody);
    }
}