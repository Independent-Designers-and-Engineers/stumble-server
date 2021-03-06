function compareProfiles(prof1, prof2) {
    let comparison = {
        "ageWarning": null,
        "sharedInterests": {},
        "similarity": 0.0
    };
    if (Math.abs(prof1.age - prof2.age) >= 10) {
        comparison.ageWarning = Math.abs(prof1.age - prof2.age);
    } 
    let prof1Keys = Object.keys(prof1.interests);
    let prof1TotalInterests = 0;
    prof1Keys.forEach( (el) => {
        prof1TotalInterests += prof1["interests"][el]["items"].length
        comparison["sharedInterests"][el] = {};
        if(prof2.interests.hasOwnProperty(el)) {
            comparison["sharedInterests"][el]["items"] = compareArrays(prof1.interests[el]["items"], prof2.interests[el]["items"]);
        }
    })
    let sharedInterestsKeys = Object.keys(comparison.sharedInterests)
    let numSharedInterests = 0;
    sharedInterestsKeys.forEach( (el) => {
        numSharedInterests += comparison.sharedInterests[el]["items"].length;
    })
    let prof2Keys = Object.keys(prof2.interests);
    let prof2TotalInterests = 0;
    prof2Keys.forEach( (el) => {
        prof2TotalInterests += prof2["interests"][el]["items"].length
    })
    if (numSharedInterests > 2) {
        comparison.similarity = (2 * numSharedInterests) / (prof1TotalInterests + prof2TotalInterests);
    }
    return comparison;
}

function compareArrays(array1, array2) {
    sharedItems = [];
    array1.forEach( (el) => {
        if(array2.some((other) => el === other))
            sharedItems.push(el);
    })
    return sharedItems;
}
