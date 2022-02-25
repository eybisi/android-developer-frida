const classSet = new Set()
let overload = false
browser.contextMenus.create({
    id: "copy-frida-snippet",
    title: "Copy frida snippet",
    contexts: ["link"]
  });

browser.runtime.onMessage.addListener(notify);

function notify(message){
    overload = message.overload
}


browser.contextMenus.onClicked.addListener(function(info, tab) {
    switch (info.menuItemId) {
        case "copy-frida-snippet":
            // returns right clicked link such as : https://developer.android.com/reference/android/media/AudioManager#setSpeakerphoneOn(boolean 
            if(info.linkUrl.startsWith("https://developer.android.com/reference/") && info.linkUrl.includes("#")){
                addClassDefinition = false
                isFunction = false
                fullLink = info.linkUrl
                splitted = fullLink.split("#")
                functionOrFieldName = splitted[1]
                if(splitted[1].includes("(") && splitted[1].includes(")")) {
                    isFunction = true
                }
                className = splitted[0].split("reference/")[1].replaceAll("/",".")
                classVariable = className.split(/[.]+/).pop()
                finalStr = ""
                if(classSet.has(className)){
                }else{
                    classSet.add(className)
                    finalStr += `let ${classVariable} = Java.use("${className}");\n` 
                }
                // generating snippet for function
                if(isFunction){
                    functionName = functionOrFieldName.split("(")[0]
                    params = functionOrFieldName.split("(")[1]
                    params = decodeURI(params)
                    // I'm lazy to write code for B[ types

                    argParams = params.toLowerCase().slice(0,-1).split(",")
                    argParams.forEach(function(part, index) {
                        this[index] = part.split(/[.]+/).pop();
                    }, argParams); 
                    argParamsString = argParams.join(", ")
                    //if(typeScript){
                    //    
                    //}
                    //
                    //
                    //


                    // detect overloads
                    if(overload){
                        finalStr += `${classVariable}.${functionName}.overload(${params.slice(0,-1)}).implementation = function(${argParamsString}){ \
            console.log('called ${functionName} !')  
            return this.${functionName}(${argParamString})
    }`
                    }
                    else{
                        finalStr += `${classVariable}.${functionName}.implementation = function(${argParamsString}){ \
            console.log('called ${functionName} !')  
            return this.${functionName}(${argParamsString})
    }`
                    }
                    console.log(finalStr)
                }
                // generating snippet for field name
                else{
                    fieldName = functionOrFieldName
                    finalStr += `console.log(${classVariable}.${fieldName}.value)`

                }
                navigator.clipboard.writeText(finalStr)
            }

    }
})

