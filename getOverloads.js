codeElems = content.document.getElementsByTagName("code")
codeElems = Array.prototype.slice.call( codeElems )
overload = false
foundOne = false
codeElems = codeElems.filter((element) => {
    if("firstChild" in element){
        firstChild = element.firstChild
        if(firstChild !== undefined){
            if(firstChild.getAttribute("href") !== undefined){
                foundOne = true
                return firstChild.getAttribute("href").startsWith("/reference")
            }
        }
    }
})
if(foundOne){
    codeElems.forEach(function(part, index) {
        this[index] = element.firstChild.getAttribute("href")
    }, codeElems);
    overload = codeElems.some(elem => elem.split("#")[1].split("(")[0] == functionName)

}

window.addEventListener("click",notifyExtension);

function notifyExtension(e){
    if(e.target.tagName != "copy-frida-snippet"){
        return;
    }
    browser.runtime.sendMessage({"overload":overload})

}
