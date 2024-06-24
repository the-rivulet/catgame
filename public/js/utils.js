import { data, save } from './data.js';
import { Decimal } from './break.js';
alert("awawa");
export function gel(name) {
    return document.getElementById(name);
}
alert(gel);
export function getCatSize(cats) {
    const sizeOfCat = new Decimal(11470.9448); // in cm^3/cat
    const sizeOfAllCats = sizeOfCat.times(cats); // cats * cm^3/cat = cm^3
    const densityOfCatCm3 = new Decimal(0.00106202412); // in kg/cm^3
    const weightOfAllCats = sizeOfAllCats.times(densityOfCatCm3); // cm^3 * kg/cm^3 = kg
    return [sizeOfAllCats, weightOfAllCats];
}
export function exportSave() {
    document.getElementById('savedata').value = btoa(JSON.stringify(data));
}
export function importSave() {
    const importedData = JSON.parse(atob(document.getElementById('savedata').value));
    Object.assign(data, importedData);
    save();
    location.reload();
}
