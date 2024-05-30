import { data, save } from './data';
import Decimal from 'break_eternity.js';

export function gel<T extends HTMLElement>(name: string): T {
    return document.getElementById(name) as T;
}

export function getCatSize(cats: Decimal): [Decimal, Decimal] {
    const sizeOfCat = new Decimal(11470.9448); // in cm^3/cat
    const sizeOfAllCats = sizeOfCat.times(cats); // cats * cm^3/cat = cm^3
    const densityOfCatCm3 = new Decimal(0.00106202412); // in kg/cm^3
    const weightOfAllCats = sizeOfAllCats.times(densityOfCatCm3); // cm^3 * kg/cm^3 = kg
    return [sizeOfAllCats, weightOfAllCats];
}

export function exportSave() {
    (document.getElementById('savedata') as HTMLTextAreaElement).value = btoa(JSON.stringify(data));
}

export function importSave() {
    const importedData = JSON.parse(atob((document.getElementById('savedata') as HTMLTextAreaElement).value));
    Object.assign(data, importedData);
    save();
    location.reload();
}