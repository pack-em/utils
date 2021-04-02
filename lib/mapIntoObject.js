// Map into object an array of object elements which have an id property.

const mapIntoObject =  (arr) => arr.reduce((object,element)=>(object[element.id] = element),{});

export default mapIntoObject;
