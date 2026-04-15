// Selection logic for popup.html, which saves the selected skin to storage 
// and redirects the current tab to the same url with the selected skin as a query parameter.

document.addEventListener("DOMContentLoaded", async () => {
    const { skin } = await chrome.storage.sync.get("skin");

    if (skin) {
        const select = document.getElementById("skin");
        select.value = skin;
    }
});
 
// find html element with id "apply" and add click event listener to it
document.getElementById("apply").addEventListener("click", async () => {

    // get value of html element with id "skin", which is the selected skin from the dropdown menu
    const skin = document.getElementById("skin").value;

    // save selection to storage so content.js can access it, {skin} is shorthand for { skin: skin }
    // e.g. if skin = "vector", then { skin } is the same as { skin: "vector" }
    await chrome.storage.sync.set({ skin });

    // chrome.tabs.query(...) gives us the active/selected tab in the current window
    // the result is an array of tabs, since we've only asked for the active tab we get 1 tab back
    // the tab can be deconstructed into an object with properties like url, id, etc.
    // await pauses execution until the promise returned by chrome.tabs.query is resolved, and then deconstructs
    // the first tab from the resulting array
    // const [tab] = ... is shorthand for const tab = ...[0], which gets the first tab from the array of tabs returned by chrome.tabs.query
    // this is called array destructuring assignment, and is a convenient way to extract values from arrays or objects
    // const tabs = await chrome.tabs.query({
    //   active: true,
    //   currentWindow: true
    // });
    // const tab = tabs[0];
    // the above code is the long form of the line below
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    // create new URL object from url of tab (tab can have properties like url, id, title, active, etc.)
    // object lets us get structured information e.g. url.hostname, url.searchParams, url.pathname, etc. 
    // and also modify the url by changing these properties rather than directly manipulating the string
    const url = new URL(tab.url);
    // set query parameter "useskin" to the selected skin, e.g. if skin = "vector", then ?useskin=vector will be added to the url
    url.searchParams.set("useskin", skin);

    // chrome extension API that modifies the existing tab.
    // every chrome tab has unique id, we are chaging tab with id = tab.id, and updating its url 
    // to the new url with the selected skin as a query parameter
    chrome.tabs.update(tab.id, { url: url.toString() });
});