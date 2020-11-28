let userInfo = {}

const apiCall = async(path, messageBody) => {
    const response = await fetch(`http://127.0.0.1:8000/api/${path}/`, {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(messageBody), // string or object
        headers: {
            'Content-Type': 'application/json'
        },
    });
    const resp = await response; //extract JSON from the http response
    if (resp.status !== 201)
        alert('check the server!');
    return resp.json();
}

const startApp = () => {
    document.querySelector('#workSpace').style.visibility = 'visible';
    document.querySelector('#entryPage').style.display = 'none';
}

const createWorkSpace = async() => {
    const path = 'createWorkSpace';
    workSpaceInfo = await apiCall(path, { name: document.querySelector('#username').value });
    userInfo = {...workSpaceInfo };

    document.querySelector('#inviteLink').value = `${window.location.origin}?spaceId=${userInfo.workSpaceURL || ''}`;
    document.querySelector('#currUser').innerHTML = `<b>You:</b> ${userInfo.name}`;
    startApp();
};

const joinWorkSpace = async() => {
    const path = 'joinWorkSpace'
    workSpaceInfo = await apiCall(path, { name: document.querySelector('#username').value });
    userInfo = {...workSpaceInfo }

    document.querySelector('#inviteLink').value = `${window.location.origin}?spaceId=${userInfo.workSpaceURL || ''}`;
    document.querySelector('#currUser').innerHTML = `<b>You:</b> ${userInfo.name}`;
    startApp();
};

window.addEventListener('load', () => {
    const url_string = window.location.href;
    var url = new URL(url_string);
    var spaceId = url.searchParams.get("spaceId");
    if (spaceId && spaceId.length) {
        document.querySelector('#joinSpace').style.display = 'block';
    } else {
        document.querySelector('#createSpace').style.display = 'block';
    }
});

// to copy invite link
document.querySelector('#inviteLinkButton').addEventListener('click', function(event) {
    var copyTextarea = document.querySelector('#inviteLink');
    copyTextarea.focus();
    copyTextarea.select();
    try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
    } catch (err) {
        console.log('Oops, unable to copy');
    }
});