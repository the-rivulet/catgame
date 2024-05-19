import Decimal from 'break_eternity.js';

let tab = 'main'
let loaftime = 0
const gel = (name: string) => document.getElementById(name)!
const newsfile = ["owo", "uwu", "hello", "uparrow", "x<sup>2</sup>"]

const elements = {
	buyallbutton: gel("buyallbutton"),
	hcbutton: gel("hcbutton"),
	hvcbutton: gel("hvcbutton"),
	catlimbar: gel("catlimbar") as HTMLProgressElement,
	catbarpercent: gel("catbarpercent"),
	cats: gel("cats"),
	cps: gel("cps"),
	catlim: gel("catlim"),
	catsummoners: gel("catsummoners"),
	catfood: gel("catfood"),
	basecats: gel("basecats"),
	catmulti: gel("catmulti"),
	cscost: gel("cscost"),
	cfcost: gel("cfcost"),
	catlimitnum: gel("catlimitnum"),
	maxccs: gel("maxccs"),
	ccs: gel("ccs"),
	ls: gel("ls"),
	bm: gel("bm"),
	lscost: gel("lscost"),
	bmcost: gel("bmcost"),
	lsboost: gel("lsboost"),
	bmboost: gel("bmboost"),
	catssacrificed: gel("catssacrificed"),
	sacrificedboost: gel("sacrificedboost"),
	hc: gel("hc"),
	hcboost: gel("hcboost"),
	timeplayed: gel("timeplayed"),
	energycats: gel("energycats"),
	ecps: gel("ecps"),
	highcats: gel("highcats"),
	voidc: gel("voidc"),
	exenercat: gel("exenercat"),
	voidg: gel("voidg"),
	hypervoidcats: gel("hypervoidcats"),
	hypervoidcatsboost: gel("hypervoidcatsboost"),
	voidb: gel("voidb"),
	catsize: gel("catsize"),
	catweight: gel("catweight"),
	voidpower: gel("voidpower"),
	catlimitboost: gel("catlimitboost"),
	catgodvboost: gel("catgodvboost"),
	hypercatvboost: gel("hypercatvboost"),
	catlimitvboost: gel("catlimitvboost"),
	csas: gel("csas"),
	cfas: gel("cfas"),
	las: gel("las"),
	voidhypercatstuff: gel("voidhypercatstuff") as HTMLSpanElement,
	secretpasses: gel("secretpasses") as HTMLTextAreaElement
};

//region jacorb's code for formatting
function exponentialFormat(num: Decimal, precision: number) {
	let e: string | number = num.exponent;
	let m = num.mantissa;
	if (Number(new Decimal(m).toStringWithDecimalPlaces(precision)) == 10) {
		m = 1
		e++;
	}
	e = ((e >= 1000) ? commaFormat(new Decimal(e), 0) : new Decimal(e).toStringWithDecimalPlaces(0))
	return new Decimal(m).toStringWithDecimalPlaces(precision) + "e" + e
}
function commaFormat(num: Decimal, precision: number) {
	if (num === null || num === undefined) return "NaN"
	if (num.mag < 0.001) return (0).toFixed(precision)
	return num.toStringWithDecimalPlaces(precision).replace(/\B(?=(\d{3})+(?!\d))/g, "'")
}
function regularFormat(num: Decimal, precision: number) {
	if (num === null || num === undefined) return "NaN"
	if (num.mag < 0.001) return (0).toFixed(precision)
	return num.toStringWithDecimalPlaces(precision)
}
function fixValue(x: Decimal, y = 0) {
	return x || new Decimal(y)
}
function sumValues(x: Array<Decimal>) {
	x = Object.values(x)
	if (!x[0]) return Decimal.dZero
	return x.reduce((a, b) => Decimal.add(a, b))
}
function format(decimal: Decimal | number, precision = 2, whole = false) {
	decimal = new Decimal(decimal)
	if (isNaN(decimal.sign) || isNaN(decimal.layer) || isNaN(decimal.mag)) {
		return "NaN"
	}
	if (decimal.sign < 0) return "-" + format(decimal.neg(), precision)
	if (decimal.mag == Number.POSITIVE_INFINITY) return "Infinity"
	if (decimal.eq(0)) return "0"
	if (decimal.gte("eeee1000")) {
		var slog = decimal.slog()
		if (slog.gte(1e3)) return "10^^" + formatWhole(slog)
		else return "10^^" + regularFormat(slog, 3)
	} else if (decimal.gte("eee100000")) return "eee" + format(decimal.log10().log10().log10(), 3)
	else if (decimal.gte("ee100000")) return "ee" + format(decimal.log10().log10(), 3)
	else if (decimal.gte("1e100000")) return "e" + format(decimal.log10(), 3)
	else if (decimal.gte("1e1000")) return exponentialFormat(decimal, 0)
	else if (decimal.gte(1e9)) return exponentialFormat(decimal, precision)
	else if (decimal.gte(1e3)) return commaFormat(decimal, 0)
	else if (decimal.gte(Decimal.pow(0.1, precision)) || whole) return regularFormat(decimal, precision)
	else if (decimal.gt("1e-100000")) return exponentialFormat(decimal, decimal.gte("1e-1000") ? precision : 0)
	else return "1/(" + format(decimal.pow(-1), precision) + ")"
}
function formatWhole(decimal: Decimal | number, reallyWhole = false) {
	decimal = new Decimal(decimal)
	if (decimal.gte(1e9)) return format(decimal, 2)
	if (decimal.lte(0.95) && !decimal.eq(0) && !reallyWhole) return format(decimal, 2)
	else return format(decimal, 0, true)
}
function formatTime(s: Decimal) {
	s = new Decimal(s);
	if (s.gte(1 / 0)) return "Forever"
	else if (s.lt(60)) return format(s) + "s"
	else if (s.lt(3600)) return formatWhole(s.div(60).floor()) + "m " + format(s.toNumber() % 60) + "s"
	else if (s.lt(86400)) return formatWhole(s.div(3600).floor()) + "h " + format(s.div(60).toNumber() % 60) + "m"
	else if (s.lt(31536000)) return formatWhole(s.div(84600).floor()) + "d " + formatWhole(s.div(3600).toNumber() % 24) + "h"
	else if (s.lt(31536000000)) return formatWhole(s.div(31536000).floor()) + "y " + formatWhole(s.div(84600).toNumber() % 365) + "d"
	else return formatWhole(s.div(31536000)) + "y"
}
function toPlaces(x: Decimal, precision: number, maxAccepted: number) {
	x = new Decimal(x)
	let result = x.toStringWithDecimalPlaces(precision)
	if (new Decimal(result).gte(maxAccepted)) {
		result = new Decimal(maxAccepted - Math.pow(0.1, precision)).toStringWithDecimalPlaces(precision)
	}
	return result
}
// endregion

// region start of teste's shitty code

let catsPerSecond = Decimal.dZero

const formatForH = (x: Decimal | number) => format(x)

const formatForZ = (x: Decimal | number) => format(x, 0, true)

const d = {
	startPlaying: new Decimal(Date.now()),
	lastTick: new Decimal(Date.now()),
	highCats: Decimal.dZero,

	cats: new Decimal(11),
	catLimit: Decimal.dOne,

	catSummoners: Decimal.dZero,
	catFood: Decimal.dZero,

	spentCatCoins: Decimal.dZero,
	lessSpace: Decimal.dZero,
	betterMagic: Decimal.dZero,

	catGodSacrificed: Decimal.dZero,

	hyperCats: Decimal.dZero,

	energyCats: Decimal.dZero,
	energyCatMilestone: Decimal.dZero,

	eautobuycs: Decimal.dOne,
	eautobuycf: Decimal.dOne,
	eautobuyl: Decimal.dOne,
	eautobuys: Decimal.dOne,

	voidCats: Decimal.dZero,
	voidGain: Decimal.dZero,
	voidup1: Decimal.dZero,
	voidup2: Decimal.dZero,
	voidup3: Decimal.dZero,
	voidhypercats: Decimal.dZero
}

let timeSinceLastNewsMessage = Decimal.dZero

const secrets = {

}

function exportSave() {
	(gel("savedata") as HTMLTextAreaElement).value = btoa(JSON.stringify(d))
}

function importSave() {
	const data = JSON.parse(atob((gel("savedata") as HTMLTextAreaElement).value))
	for (const i in data) d[i] = data[i]
	save()
	location.reload()
}

function getCatSize(cats: Decimal) {
	const size_of_cat = new Decimal(11470.9448) //in cm^3/cat
	var size_of_all_cats = size_of_cat.times(cats) // cats * cm^3/cat = cm^3
	const density_of_cat_cm3 = new Decimal(0.00106202412) //in kg/cm^3
	var weight_of_all_cats = size_of_all_cats.times(density_of_cat_cm3) // cm^3 * kg/cm^3 = kg
	var p = [size_of_all_cats, weight_of_all_cats]
	return p
}

/**
 * Updates the content of various HTML elements based on the values of certain variables.
 */
function updateElement() {
	// Calculate catlimtemp
	const catlimtemp = new Decimal(1000).pow(d.catLimit).times(new Decimal(0.85).pow(d.lessSpace));

	// Store repeating elements from gel into an object


	// Update buyallbutton text content
	elements.buyallbutton.textContent = d.catLimit.gte(6) ? "Buy All" : "Locked";

	// Update hcbutton text content
	if (d.cats.gte(new Decimal(1e3).times(new Decimal(4e2).pow(d.hyperCats)))) {
		elements.hcbutton.textContent = "Hyper Cat Reset";
	} else {
		elements.hcbutton.textContent = "You need " + formatForH(new Decimal(1e3).times(new Decimal(4e2).pow(d.hyperCats))) + " Cats to (HC)Reset";
	}

	// Update hvcbutton text content
	if (d.voidCats.gte(new Decimal(1e5).times(new Decimal(2.25).pow(new Decimal(0.93).times(d.voidhypercats))))) {
		elements.hvcbutton.textContent = "Hyper Void-Cat Reset";
	} else {
		elements.hvcbutton.textContent = "You need " + formatForH(new Decimal(1e5).times(new Decimal(2.25).pow(new Decimal(0.93).times(d.voidhypercats)))) + " Void Cats to (HVC)Reset";
	}

	// Update catlimbar and catbarpercent elements
	if (d.cats.gte(1)) {
		const catlimbarValue = d.cats.log(10).divide(catlimtemp.log(10)).mag;
		elements.catlimbar.value = catlimbarValue;
		elements.catbarpercent.textContent = formatForH(d.cats.log(10).divide(catlimtemp.log(10)).times(100)) + "%";
	} else {
		elements.catlimbar.value = 0;
		elements.catbarpercent.textContent = "0%";
	}

	// Update other elements
	elements.cats.textContent = formatForH(d.cats);
	elements.cps.textContent = formatForH(catsPerSecond);
	elements.catlim.textContent = formatForH(catlimtemp);
	elements.catsummoners.textContent = formatForZ(d.catSummoners);
	elements.catfood.textContent = formatForZ(d.catFood);
	elements.basecats.textContent = formatForH(d.catSummoners.pow(d.betterMagic.divide(60).plus(1)));
	elements.catmulti.textContent = formatForH(new Decimal(1.75).pow(d.catFood));
	elements.cscost.textContent = formatForH(new Decimal(10).times(new Decimal(1.75).pow(d.catSummoners)));
	elements.cfcost.textContent = formatForH(new Decimal(25).times(new Decimal(2.05).pow(d.catFood)));
	elements.catlimitnum.textContent = formatForZ(d.catLimit.minus(1));
	elements.maxccs.textContent = formatForZ(d.catLimit);
	elements.ccs.textContent = formatForZ(d.catLimit.minus(d.spentCatCoins));
	elements.ls.textContent = formatForZ(d.lessSpace);
	elements.bm.textContent = formatForZ(d.betterMagic);
	elements.lscost.textContent = formatForZ(new Decimal(1.15).pow(d.lessSpace).floor());
	elements.bmcost.textContent = formatForZ(new Decimal(1.25).pow(d.betterMagic).floor());
	elements.lsboost.textContent = formatForH(new Decimal(0.85).pow(d.lessSpace).times(100));
	elements.bmboost.textContent = formatForH(d.betterMagic.divide(60).plus(1));
	elements.catssacrificed.textContent = formatForH(d.catGodSacrificed);
	elements.sacrificedboost.textContent = formatForH(((d.catGodSacrificed.plus(1)).logarithm(new Decimal(5).minus(voidUpgradeBoosts(1))).plus(1)).pow(1.01));
	elements.hc.textContent = formatForZ(d.hyperCats);
	elements.hcboost.textContent = formatForH(d.hyperCats.plus(1).pow(voidUpgradeBoosts(2)));
	elements.timeplayed.textContent = formatTime(new Decimal(Date.now()).minus(d.startPlaying).divide(1000));
	elements.energycats.textContent = formatForH(d.energyCats);
	elements.ecps.textContent = formatForH(d.cats.log(10));
	elements.highcats.textContent = formatForH(d.highCats);
	elements.voidc.textContent = formatForH(d.voidCats);
	elements.exenercat.textContent = formatForH(d.energyCats);
	elements.voidg.textContent = formatForH(d.energyCats.log(10).times(new Decimal(1.375).pow(d.voidhypercats)));
	elements.hypervoidcats.textContent = formatForZ(d.voidhypercats);
	elements.hypervoidcatsboost.textContent = formatForH(new Decimal(1.375).pow(d.voidhypercats));
	elements.voidb.textContent = formatForH(!isNaN(d.cats.log(10).mag) ? d.voidCats.plus(1).log(3).times((catlimtemp.log(10).divide(d.cats.plus(1).log(10)))).plus(1) : 1);
	elements.catsize.textContent = format(getCatSize(d.cats)[0], 6);
	elements.catweight.textContent = format(getCatSize(d.cats)[1], 6);
	const percent_to_cl = isNaN(d.cats.log(10).divide(catlimtemp.log(10)).mag) ? Decimal.dZero : d.cats.log(10).divide(catlimtemp.log(10));
	elements.voidpower.textContent = formatForH(d.voidCats.pow(0.6).times(Decimal.dOne.minus(percent_to_cl)));
	elements.catlimitboost.textContent = d.voidup3.lt(1) ? "" : "Boost: *" + format((((new Decimal(1.05).plus(voidUpgradeBoosts(3))).pow(d.catLimit.minus(1)))), 3) + " More Cats";
	elements.catgodvboost.textContent = format(voidUpgradeBoosts(1)!, 4);
	elements.hypercatvboost.textContent = format(voidUpgradeBoosts(2)!, 4);
	elements.catlimitvboost.textContent = format(voidUpgradeBoosts(3)!, 4);
	elements.csas.textContent = d.eautobuycs.gte(1) ? "ON" : "OFF";
	elements.cfas.textContent = d.eautobuycf.gte(1) ? "ON" : "OFF";
	elements.las.textContent = d.eautobuyl.gte(1) ? "ON" : "OFF";
}
gel("sas").textContent = d.eautobuys.gte(1) ? "ON" : "OFF";
gel("voidup1").className = d.voidup1.gte(1) ? "vu1button" : "vu0button";
gel("voidup2").className = d.voidup2.gte(1) ? "vu1button" : "vu0button";
gel("voidup3").className = d.voidup3.gte(1) ? "vu1button" : "vu0button";

// Update energy cat elements
const emprefix = ["csa", "cfa", "ear", "as"];
const emvalues = [10000, 75000, 50000, 100000];
for (let i = 0; i < 4; i++) {
	const emElement = gel(emprefix[i] + "em");
	if (d.energyCats.gte(emvalues[i])) {
		emElement.textContent = "Unlocked (" + formatForH(emvalues[i]) + " EC)";
	} else {
		emElement.textContent = formatForH(new Decimal(emvalues[i]).minus(d.energyCats)) + " ECs left (" + formatForH(emvalues[i]) + " Required)";
	}
}

/* x: index, i: tab */
function BuyItem(x, i) {
	var catcoins = d.catLimit.minus(d.spentCatCoins)
	if (i == 1) {
		if (x == 1 && d.cats.greaterThanOrEqualTo(new Decimal(10).times(new Decimal(1.75).pow(d.catSummoners)))) {
			d.cats = d.cats.minus(new Decimal(10).times(new Decimal(1.75).pow(d.catSummoners)))
			d.catSummoners = d.catSummoners.plus(1)
		}
		if (x == 2 && d.cats.greaterThanOrEqualTo(new Decimal(25).times(new Decimal(2.05).pow(d.catFood)))) {
			d.cats = d.cats.minus(new Decimal(25).times(new Decimal(2.05).pow(d.catFood)))
			d.catFood = d.catFood.plus(1)
		}
	}

	if (i == 2) {
		if (x == 1 && catcoins.greaterThanOrEqualTo(new Decimal(1.15).pow(d.lessSpace).floor())) {
			d.spentCatCoins = d.spentCatCoins.add(new Decimal(1.15).pow(d.lessSpace).floor())
			d.lessSpace = d.lessSpace.add(1)
		}
		if (x == 2 && catcoins.greaterThanOrEqualTo(new Decimal(1.25).pow(d.betterMagic).floor())) {
			d.spentCatCoins = d.spentCatCoins.plus(new Decimal(1.25).pow(d.betterMagic).floor())
			d.betterMagic = d.betterMagic.add(1)
		}
	}
	if (i == 3) {
		if (x == 1 && !d.voidup1.eq(1) && d.catGodSacrificed.gte(1e30)) {
			d.voidup1 = Decimal.dOne
		}
		if (x == 2 && !d.voidup2.eq(1) && d.hyperCats.gte(10)) {
			d.voidup2 = Decimal.dOne
		}
		if (x == 3 && !d.voidup3.eq(1) && d.cats.gte(1e35)) {
			d.voidup3 = Decimal.dOne
		}
	}
}
function voidUpgradeBoosts(x: Decimal | number) {
	const catlimtemp = (new Decimal(1000).pow(d.catLimit)).times((new Decimal(0.85).pow(d.lessSpace)))
	const percent_to_cl = isNaN(d.cats.log(10).divide(catlimtemp.log(10)).mag) ? Decimal.dZero :
		d.cats.log(10).divide(catlimtemp.log(10))
	const voidenergy = d.voidCats.pow(0.6).times(Decimal.dOne.minus(percent_to_cl))
	if (x == 1) {
		if (d.voidup1.lt(1)) {
			return Decimal.dZero
		}
		else {
			return (Decimal.dOne.divide(new Decimal(-0.00015).times(voidenergy.plus(5000)))).plus(2)
		}
	}
	if (x == 2) {
		if (d.voidup2.lt(1)) {
			return Decimal.dOne
		}
		else {
			return (Decimal.dOne.divide(new Decimal(-0.00022).times(voidenergy.plus(2280)))).plus(2).divide(2).plus(1)
		}
	}
	if (x == 3) {
		if (d.voidup3.lt(1)) {
			return Decimal.dZero
		}
		else {
			return voidenergy.divide(10000)
		}
	}
	return Decimal.dZero
}
function EnergyMilestone() {
	if (d.energyCats.gte(0)) {
		d.energyCatMilestone = Decimal.dZero
	}
	if (d.energyCats.gte(10000)) {
		d.energyCatMilestone = Decimal.dOne
	}
	if (d.energyCats.gte(50000)) {
		d.energyCatMilestone = Decimal.dTwo
	}
	if (d.energyCats.gte(75000)) {
		d.energyCatMilestone = new Decimal(3)
	}
	if (d.energyCats.gte(100000)) {
		d.energyCatMilestone = new Decimal(4)
	}
}
function save() { localStorage.setItem("catgame-save", btoa(JSON.stringify(d))); localStorage.setItem("catgame-secrets", btoa(JSON.stringify(secrets))) }
function Load() {
	if (localStorage.getItem("catgame-save") != null) {
		var data = JSON.parse(atob(localStorage.getItem("catgame-save") ?? ""))
		for (const i in data) d[i] = new Decimal(data[i])
	};
	if (localStorage.getItem("catgame-secrets") != null) {
		var data = JSON.parse(atob(localStorage.getItem("catgame-secrets") ?? ""))
		for (const i in data) secrets[i] = new Decimal(data[i]);
	}
}
function HardReset() {
	if (confirm("Are you sure?")) {
		if (confirm("Are you REALLY sure?")) {
			localStorage.removeItem("catgame-save")
			localStorage.removeItem("catgame-secrets")
			location.reload()
		}
	}
}
function Tabs() {
	if (tab == "main") { gel("main").style.display = "inline"; }
	else { gel("main").style.display = "none"; }
	if (tab == "options") { gel("options").style.display = "inline"; }
	else { gel("options").style.display = "none"; }
	if (tab == "catlimit") { gel("catlimit").style.display = "inline"; }
	else { gel("catlimit").style.display = "none"; }
	if (tab == "catcoins") { gel("catcoins").style.display = "inline"; }
	else { gel("catcoins").style.display = "none"; }
	if (tab == "catgod") { gel("catgod").style.display = "inline"; }
	else { gel("catgod").style.display = "none"; }
	if (tab == "hypercats") { gel("hypercats").style.display = "inline"; }
	else { gel("hypercats").style.display = "none"; }
	if (tab == "energy") { gel("energy").style.display = "inline"; }
	else { gel("energy").style.display = "none"; }
	if (tab == "void") { gel("void").style.display = "inline"; }
	else { gel("void").style.display = "none"; }

	if (loaftime > 10) {
		gel("loafing").style.display = "none";
	}
	loaftime += 1
	//secretcodes
	//hyper specifi-cats
	if (tab == "hyperspecificats") {
		gel("hyperspecificats").style.display = "inline";
		gel("hyperspecificcats").textContent = format(d.cats, 12)
		gel("hyperspecifichighcats").textContent = format(d.highCats, 12)
		gel("hyperspecificcatsize").textContent = format(getCatSize(d.cats)[0], 12)
		gel("hyperspecificcatweight").textContent = format(getCatSize(d.cats)[1], 12)
	}
	else { gel("hyperspecificats").style.display = "none"; }
	//dogs^4
	if (tab == "dogsdogsdogsdogs") { gel("dogsdogsdogsdogs").style.display = "inline"; }
	else { gel("dogsdogsdogsdogs").style.display = "none"; }
	//stupidoptions
	if (tab == "stupidoptionslol") { gel("stupidoptionslol").style.display = "inline"; }
	else { gel("stupidoptionslol").style.display = "none"; }
	//??????

	// if ((d.voidCats.gte(100000) || d.voidhypercats.gte(1)) && d.catLimit.gte(11)) {
	// 	elements.voidhypercatstuff.disabled = false;
	// 	elements.voidhypercatstuff.style = "visibility: visible";
	// } else {
	// 	elements.voidhypercatstuff.disabled = true;
	// 	elements.voidhypercatstuff.style = "visibility: hidden";
	// }

	gel("overlay").style.display = d.voidGain.gte(1) ? "inline" : "none"

	if (d.cats.greaterThanOrEqualTo(999) || d.catLimit.greaterThanOrEqualTo(2)) { gel("catlimbutton").style.display = "inline"; }
	else { gel("catlimbutton").style.display = "none"; }
	if (d.catLimit.greaterThanOrEqualTo(2)) { gel("catcoinbutton").style.display = "inline"; }
	else { gel("catcoinbutton").style.display = "none"; }
	if (d.catLimit.greaterThanOrEqualTo(4)) { gel("catgodbutton").style.display = "inline"; }
	else { gel("catgodbutton").style.display = "none"; }
	if (d.catLimit.greaterThanOrEqualTo(7)) { gel("hypercatsbutton").style.display = "inline"; }
	else { gel("hypercatsbutton").style.display = "none"; }
	if (d.catLimit.greaterThanOrEqualTo(8)) { gel("energybutton").style.display = "inline"; }
	else { gel("energybutton").style.display = "none"; }
	if (d.catLimit.greaterThanOrEqualTo(11)) { gel("voidbutton").style.display = "inline"; }
	else { gel("voidbutton").style.display = "none"; }
}
function CatGodSacrifice() {
	var p = d.cats
	if (d.catSummoners.gte(1)) {
		d.cats = Decimal.dZero
		d.catGodSacrificed = d.catGodSacrificed.plus(p)
	}
}
function HyperCatsReset(multicat) {
	const mulcat = new Decimal(multicat)
	if (mulcat.gte(1)) { }
	else {
		if (d.cats.gte(new Decimal(1e3).times(new Decimal(4e2).pow(d.hyperCats)))) {
			d.cats = new Decimal(11)
			d.catSummoners = Decimal.dZero
			d.catFood = Decimal.dZero
			d.hyperCats = d.hyperCats.plus(1)
		}
	}
}
function VHyperCatsReset(multicat) {
	const mulcat = new Decimal(multicat)
	if (mulcat.gte(1)) { }
	else {
		if (d.voidCats.gte(new Decimal(1e5).times(new Decimal(2.25).pow(new Decimal(0.93).times(d.voidhypercats))))) {
			d.voidCats = new Decimal(1e5).times(new Decimal(2.25).pow(new Decimal(0.93).times(d.voidhypercats)))
			d.voidhypercats = d.voidhypercats.plus(1)
		}
	}
}
function CatLimReset(force = 0) {
	let catlimtemp = (new Decimal(1000).pow(d.catLimit)).times((new Decimal(0.85).pow(d.lessSpace)))
	if (d.cats.greaterThanOrEqualTo(catlimtemp) || force == 1) {
		d.cats = new Decimal(11)
		if (force == 0) { d.catLimit = d.catLimit.plus(1) }
		d.catSummoners = Decimal.dZero
		d.catFood = Decimal.dZero
		d.catGodSacrificed = Decimal.dZero
		d.hyperCats = Decimal.dZero
		d.energyCats = Decimal.dZero
	}
}
function BuyAll() {
	if (d.catLimit.gte(6)) {
		while (d.cats.greaterThanOrEqualTo(new Decimal(10).times(new Decimal(1.75).pow(d.catSummoners))) || d.cats.greaterThanOrEqualTo(new Decimal(25).times(new Decimal(2.05).pow(d.catFood)))) {
			BuyItem(2, 1); BuyItem(1, 1);
		}
	}
}
function Respec(x) {
	if (x == 1) {
		if (confirm("Are you sure? you will regain all your Cat Coins, but you will have to retry the CL!")) {
			d.spentCatCoins = Decimal.dZero
			d.lessSpace = Decimal.dZero
			d.betterMagic = Decimal.dZero
			CatLimReset(1)
		}
	}
}
function VerifyCode(code) {
	if (code.length !== 16) return;
	switch (code) {
		case "hyperspecificats":
			tab = "hyperspecificats";
			break;
		case "killsyourselfasap":
			HardReset()
			break
		case "dogsdogsdogsdogs":
			d.cats = Decimal.dZero
			tab = "dogsdogsdogsdogs"
			break
		case "mewwhenthecatsdo":
			console.log("mew in 3m")
			setTimeout(() => { console.log('mew'); alert("mew sound not found") }, 180000);
			break
		case "excludeallstyles":
			document.querySelectorAll('style,link[rel="stylesheet"]').forEach(item => item.remove())
			break
		case "moregamesbyteste":
			window.location.href = "https://testehome.glitch.me/cmowre";
			break
		case "stupidoptionslol":
			tab = "stupidoptionslol"
			break
		default:
			alert("Invalid code")
	} elements.secretpasses.value = "";
}
Load()
gel("newsticker").textContent = newsfile[Math.floor(Math.random() * (newsfile.length - 1))]
setInterval(() => { save() }, 10000)
setInterval(() => {
	let catlimtemp = (new Decimal(1000).pow(d.catLimit)).times((new Decimal(0.85).pow(d.lessSpace)))
	if (d.cats.gte(d.highCats)) { d.highCats = d.cats }
	let dt = (new Decimal(Date.now()).minus(d.lastTick).divide(1000))
	// deltatime = (new Decimal(Date.now()).minus(d.lastTick).divide(1000))
	d.lastTick = new Decimal(Date.now());
	document.title = formatForH(d.cats) + " Cats | CatGame"
	Tabs()

	// CS^((cc.BM/60)+1)*(1.75^CF)
	let base_cps = (d.catSummoners.pow(d.betterMagic.divide(60).plus(1))).times(new Decimal(1.75).pow(d.catFood))

	//1.05^CL
	let catlimit_boost = ((new Decimal(1.05).plus(voidUpgradeBoosts(3))).pow(d.catLimit.minus(1)))

	//(log5(cg.SA+1)+1)^1.01
	let catgod_boost = ((d.catGodSacrificed.plus(1)).logarithm(new Decimal(5).minus(voidUpgradeBoosts(1))).plus(1)).pow(1.01)
	let hypercat_boost = d.hyperCats.plus(1).pow(voidUpgradeBoosts(2))

	// log3(VC+1)*(log10(CL.v)/(log10(cats+1))+1 if >1 or not undefined, else 1
	let void_boost = !Decimal.isNaN(d.voidCats.plus(1).log(3).times((catlimtemp.log(10).divide(d.cats.plus(1).log(10)))).plus(1)) && d.voidCats.plus(1).log(3).times((catlimtemp.log(10).divide(d.cats.plus(1).log(10)))).plus(1).gte(1) ? d.voidCats.plus(1).log(3).times((catlimtemp.log(10).divide(d.cats.plus(1).log(10)))).plus(1) : 1

	catsPerSecond = base_cps.times(catlimit_boost).times(catgod_boost).times(hypercat_boost).times(void_boost)

	updateElement()

	if (d.catLimit.greaterThanOrEqualTo(8) && !isNaN(d.cats.log(10).mag) && !d.voidGain.gte(1)) { d.energyCats = d.energyCats.plus(d.cats.log(10).times(dt)) }

	if (d.catLimit.greaterThanOrEqualTo(11) && !isNaN(d.energyCats.log(10).mag) && d.voidGain.gte(1)) {
		d.voidCats = d.voidCats.plus((d.energyCats.log(10).times(new Decimal(1.375).pow(d.voidhypercats)
		)).mul(dt))
	}

	d.cats = d.cats.plus(catsPerSecond.mul(dt))

	if (d.cats.greaterThanOrEqualTo(catlimtemp)) { d.cats = catlimtemp }
	if (d.catLimit.greaterThanOrEqualTo(8)) {
		EnergyMilestone()
		if (d.energyCatMilestone.gte(4) && d.eautobuys.gte(1) && !d.voidGain.gte(1)) {
			d.catGodSacrificed = d.catGodSacrificed.plus(d.cats.divide(20).mul(dt))
		}
		if (d.energyCatMilestone.gte(2) && d.eautobuyl.gte(1) && !d.voidGain.gte(1)) {
			CatLimReset(0)
		}
		if (d.energyCatMilestone.gte(3) && d.eautobuycf.gte(1) && !d.voidGain.gte(1)) {
			BuyItem(2, 1)
		}
		if (d.energyCatMilestone.gte(1) && d.eautobuycs.gte(1) && !d.voidGain.gte(1)) {
			BuyItem(1, 1)
		}
	}
	if (tab == "dogsdogsdogsdogs") { d.cats = Decimal.dZero }

	timeSinceLastNewsMessage = timeSinceLastNewsMessage.add(dt)
	if (timeSinceLastNewsMessage.gte(10)) {
		console.log(newsfile[Math.floor(Math.random() * (newsfile.length - 1))])
		gel("newsticker").textContent = newsfile[Math.floor(Math.random() * (newsfile.length - 1))]
		timeSinceLastNewsMessage = Decimal.dZero
	}
}, 1000 / 100)

VerifyCode(elements.secretpasses.value)