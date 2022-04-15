export const postRequest = async (url: string, optionsParam: any, stringify: boolean=true) => {
    let body = JSON.stringify(optionsParam.body);
    if (stringify === false) {
        body = optionsParam.body;
        
    }
    return await request(url, {
        ...optionsParam,
        method: 'POST',
        body: body,
    });
};

const request = async (url: string, options: any) => {
    return await fetch(url, options)
        .then(response => response.json())
        .then(response => response)
        .catch(err => console.error(err));
};