function xmlToJson(xml) {
   let obj = {};
 
   if (xml.nodeType === 1) { // element
     if (xml.attributes.length > 0) {
       obj["@attributes"] = {};
       for (let j = 0; j < xml.attributes.length; j++) {
         const attribute = xml.attributes.item(j);
         obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
       }
     }
   } else if (xml.nodeType === 3) { // text
     const trimmedText = xml.nodeValue.trim();
     if (trimmedText) {
       return trimmedText;
     }
   }
 
   if (xml.hasChildNodes()) {
     for (let i = 0; i < xml.childNodes.length; i++) {
       const item = xml.childNodes.item(i);
       const nodeName = item.nodeName;
       if (typeof obj[nodeName] === "undefined") {
         const child = xmlToJson(item);
         if (child) {
           obj[nodeName] = child;
         }
       } else {
         if (typeof obj[nodeName].push === "undefined") {
           const old = obj[nodeName];
           obj[nodeName] = [];
           obj[nodeName].push(old);
         }
         const child = xmlToJson(item);
         if (child) {
           obj[nodeName].push(child);
         }
       }
     }
   }
 
   return obj;
 }
 
 export default xmlToJson;
 