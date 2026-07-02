const m_canv = document.querySelector(".m_canv");
let width = (m_canv.width = 400);
let height = (m_canv.height = 400);

const ctx = m_canv.getContext("2d");
ctx.textAlign = "center";
ctx.font = "20px Garamond";

const CARDS = {
    MONSTER_EVIL: 0,
    EVENT_EVIL: 1,
    ITEM_FEATURE_TOTEM_EVIL: 2,
    EVENT_GOOD: 3,
    ITEM_GOOD: 4,
    BONUS_HERO_GOOD: 5,
    HERO: 6,
    ROOM: 7,
    EVIL_FULL: 8,
    GOOD_FULL: 9,
	NEW_EVIL: 10,
	NEW_GOOD: 11
};

const COLORS = {
    BLOOD_RED: "rgb(205, 14, 14)",
    UNHOLY_ORANGE: "rgb(177, 82, 53)",
    DEMONIC_PURPLE: "rgb(184, 38, 177)",
    GHOSTLY_BLUE: "rgb(41, 89, 166)",
    OMINOUS_YELLOW: "rgb(173, 173, 23)",
    DINGY_GRAY: "rgb(66, 66, 66)",
    SLATE_BLACK: "rgb(0, 0, 0)",
    GHOST_WHITE: "rgb(255, 255, 255)"
};

const fronts = 0;
const backs = 1;

const up_down = 0;
const left_right = 1;

function embed_image(identifier, x, y) {
	let img = Alert_Icon;
	switch (identifier) {
		// case "{Spirit}":
		// 	img = Spirit_Icon;
        //     // ctx.fillStyle = COLORS.GHOSTLY_BLUE;
		// 	break;
		// case "{Unholy}":
		// 	img = Unholy_Icon;
        //     // ctx.fillStyle = COLORS.UNHOLY_ORANGE;
		// 	break;
		// case "{Demon}":
		// 	img = Demon_Icon;
        //     // ctx.fillStyle = COLORS.DEMONIC_PURPLE;
		// 	break;
		case "{Health}":
			img = Health_Icon;
            // ctx.fillStyle = COLORS.BLOOD_RED;
			break;
		case "{Wisdom}":
			img = Wisdom_Icon;
            // ctx.fillStyle = COLORS.GHOSTLY_BLUE;
			break;
		case "{Might}":
			img = Might_Icon;
            // ctx.fillStyle = COLORS.UNHOLY_ORANGE;
			break;
		case "{Power}":
			img = Power_Icon;
            // ctx.fillStyle = COLORS.DEMONIC_PURPLE;
			break;
		// case "{Power}":
		// 	img = Blast_Icon;
        //     // ctx.fillStyle = COLORS.DEMONIC_PURPLE;
		// 	break;
		case "{Lit}":
			img = Lit_Icon;
            // ctx.fillStyle = COLORS.OMINOUS_YELLOW;
			break;
		case "{Unlit}":
			img = Unlit_Icon;
            // ctx.fillStyle = COLORS.DINGY_GRAY;
			break;
		case "{Armour}":
			img = Armour_Icon;
            // ctx.fillStyle = COLORS.UNHOLY_ORANGE;
			break;
		case "{Souls}":
			img = Souls_Icon;
            // ctx.fillStyle = COLORS.GHOSTLY_BLUE;
			break;
		case "{Bones}":
			img = Bones_Icon;
            // ctx.fillStyle = COLORS.BLOOD_RED;
			break;
		case "{Damage}":
			img = Damage_Icon;
            // ctx.fillStyle = COLORS.BLOOD_RED;
			break;
	}
	ctx.drawImage(img, Math.round(x), Math.round(y));
};

function get_style_after_image(identifier) {
	let color = COLORS.SLATE_BLACK;
    let weight = "bold";
	switch (identifier) {
		// case "{Spirit}":
        //     color = COLORS.GHOSTLY_BLUE;
		// 	break;
		// case "{Unholy}":
        //     color = COLORS.UNHOLY_ORANGE;
		// 	break;
		// case "{Demon}":
        //     color = COLORS.DEMONIC_PURPLE;
		// 	break;
		case "{Health}":
            color = COLORS.BLOOD_RED;
			break;
		case "{Wisdom}":
            color = COLORS.GHOSTLY_BLUE;
			break;
		case "{Might}":
            color = COLORS.UNHOLY_ORANGE;
			break;
		case "{Power}":
            color = COLORS.DEMONIC_PURPLE;
			break;
		// case "{Power}":
        //     color = COLORS.DEMONIC_PURPLE;
		// 	break;
		case "{Lit}":
            color = COLORS.OMINOUS_YELLOW;
			break;
		case "{Unlit}":
            color = COLORS.OMINOUS_YELLOW;
			break;
		case "{Armour}":
            color = COLORS.UNHOLY_ORANGE;
			break;
		case "{Souls}":
            color = COLORS.GHOSTLY_BLUE;
			break;
		case "{Bones}":
            color = COLORS.UNHOLY_ORANGE;
			break;
		case "{Damage}":
            color = COLORS.BLOOD_RED;
			break;
	}
	return [color, weight];
};

function interpret_text(text, x, y, w, h) {
	// ctx.fillStyle = COLORS.SLATE_BLACK;
	// ctx.textAlign = "center";
	// ctx.font = (h*0.08)+"px Garamond";
	let images = [];
    let words = [];
	let chunks = text.split(" ");
	let lines = [""];
    let curr_color = COLORS.SLATE_BLACK;
    let curr_weight = "normal";
    let base_font = ctx.font;
	for (let i = 0; i < chunks.length; i++) {
		if (chunks[i].includes("{")) {
			images.push({line: lines.length-1, pos: lines[lines.length-1].length, img: chunks[i]});
			lines[lines.length-1] += "    ";
            [curr_color, curr_weight] = get_style_after_image(chunks[i]);
		}else if (chunks[i] === "\n") {
			lines.push("");
		}else {
			if (ctx.measureText(lines[lines.length-1]).width+ctx.measureText(chunks[i]).width > w*0.85) {
				lines.push("");
			}
            words.push({line: lines.length-1, pos: lines[lines.length-1].length, word: chunks[i], color: curr_color, font: curr_weight+" "+base_font});
			lines[lines.length-1] += chunks[i]+" ";
            curr_color = COLORS.SLATE_BLACK;
            curr_weight = "normal";
		}
	}

	let mod_height = Math.floor(lines.length/3);
	// for (let i = 0; i < lines.length; i++) {
	// 	ctx.fillText(lines[i], x, y+((i-mod_height)*h*0.07));
	// }

    ctx.textAlign = "left";
    for (let i = 0; i < words.length; i++) {
		let mod_x = -(ctx.measureText(lines[words[i].line]).width/2)+ctx.measureText(lines[words[i].line].slice(0, words[i].pos)).width;
        ctx.fillStyle = words[i].color;
        // ctx.font = words[i].font;
        ctx.fillText(words[i].word, x+mod_x, y+((words[i].line-mod_height)*h*0.07));
        // ctx.font = base_font;
    }

	for (let i = 0; i < images.length; i++) {
		let mod_x = -(ctx.measureText(lines[images[i].line]).width/2)+ctx.measureText(lines[images[i].line].slice(0, images[i].pos)).width;
		embed_image(images[i].img, x+mod_x+2, y+((images[i].line-mod_height)*h*0.07)-42);
	}
};
function interpret_text_right_aligned(text, x, y, w, h) {
	// ctx.fillStyle = COLORS.SLATE_BLACK;
	// ctx.textAlign = "center";
	// ctx.font = (h*0.08)+"px Garamond";
	let images = [];
    let words = [];
	let chunks = text.split(" ");
	let lines = [""];
    let curr_color = COLORS.SLATE_BLACK;
    let curr_weight = "normal";
    let base_font = ctx.font;
	for (let i = 0; i < chunks.length; i++) {
		if (chunks[i].includes("{")) {
			images.push({line: lines.length-1, pos: lines[lines.length-1].length, img: chunks[i]});
			lines[lines.length-1] += "    ";
            [curr_color, curr_weight] = get_style_after_image(chunks[i]);
		}else if (chunks[i] === "\n") {
			lines.push("");
		}else {
			if (ctx.measureText(lines[lines.length-1]).width+ctx.measureText(chunks[i]).width > w*0.85) {
				lines.push("");
			}
            words.push({line: lines.length-1, pos: lines[lines.length-1].length, word: chunks[i], color: curr_color, font: curr_weight+" "+base_font});
			lines[lines.length-1] += chunks[i]+" ";
            curr_color = COLORS.SLATE_BLACK;
            curr_weight = "normal";
		}
	}

	let mod_height = Math.floor((lines.length+1)/3);
	// for (let i = 0; i < lines.length; i++) {
	// 	ctx.fillText(lines[i], x, y+((i-mod_height)*h*0.07));
	// }

    ctx.textAlign = "left";
    for (let i = 0; i < words.length; i++) {
		let mod_x = -(ctx.measureText(lines[words[i].line]).width)+ctx.measureText(lines[words[i].line].slice(0, words[i].pos)).width;
        ctx.fillStyle = words[i].color;
        // ctx.font = words[i].font;
        ctx.fillText(words[i].word, x+mod_x, y+((words[i].line-mod_height)*h*0.07));
        // ctx.font = base_font;
    }

	for (let i = 0; i < images.length; i++) {
		let mod_x = -(ctx.measureText(lines[images[i].line]).width)+ctx.measureText(lines[images[i].line].slice(0, images[i].pos)).width;
		embed_image(images[i].img, x+mod_x+2, y+((images[i].line-mod_height)*h*0.07)-42);
	}
};

class Cust_Button {
    constructor(x, y, w, h, text, on_click) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.text = text;
        this.on_click = on_click;
    }
    draw() {
        ctx.fillStyle = "rgb(125, 125, 125)";
        ctx.fillRect(this.x, this.y, this.w, this.h);
        ctx.fillStyle = "rgb(200, 200, 200)";
        ctx.fillText(this.text, this.x+(this.w*0.5), this.y+(this.h*0.65));
    }
    click(mx, my) {
        if (mx > this.x && mx < this.x+this.w && my > this.y && my < this.y+this.h) {
            setTimeout(this.on_click, 1);
        }
    }
};

class Monster_Card {
	title;
	stats;
	special;
    type;
    set;

	constructor(title, stats, special, type, set) {
		this.title = title;
		this.stats = stats;
		this.special = special;
        this.type = type;
		this.set = set;
	}
	get_name() {
		return this.title;
	}
	draw(x, y, w, h, orient) {
		ctx.strokeStyle = COLORS.SLATE_BLACK
		ctx.lineWidth = 15;
		ctx.beginPath();
		ctx.roundRect(Math.round(x+2), Math.round(y+2), Math.round(w-4), Math.round(h-4), 24);
		ctx.stroke();
		
		ctx.fillStyle = COLORS.SLATE_BLACK;
		ctx.textAlign = "left";
		ctx.font = (h*0.1)+"px Garamond";
		ctx.fillText(this.title, x+(w*0.075), y+(h*0.12), w*0.85);

		// switch (this.type) {
		// 	case "Spirit":
		// 		ctx.fillStyle = COLORS.GHOSTLY_BLUE;
		// 		break;
		// 	case "Unholy":
		// 		ctx.fillStyle = COLORS.UNHOLY_ORANGE;
		// 		break;
		// 	case "Demon":
		// 		ctx.fillStyle = COLORS.DEMONIC_PURPLE;
		// 		break;
		// 	case "Armour":
		// 		ctx.fillStyle = COLORS.UNHOLY_ORANGE;
		// 		break;
		// }
		// embed_image("{"+this.type+"}", x+(w*0.12), y+(h*0.20)-45);
		// ctx.font = (h*0.07)+"px Garamond";
		// ctx.fillText(this.type, x+(w*0.12)+45, y+(h*0.20), w*0.85);
		
		ctx.strokeStyle = COLORS.SLATE_BLACK;
		ctx.lineWidth = 4;
        ctx.strokeRect(Math.round(x+(w*0.14)), Math.round(y+(h*0.23)), w*0.18, w*0.15);
        ctx.strokeRect(Math.round(x+(w*0.32)), Math.round(y+(h*0.23)), w*0.18, w*0.15);
        ctx.strokeRect(Math.round(x+(w*0.50)), Math.round(y+(h*0.23)), w*0.18, w*0.15);
        ctx.strokeRect(Math.round(x+(w*0.68)), Math.round(y+(h*0.23)), w*0.18, w*0.15);

		ctx.textAlign = "center";
		ctx.font = (h*0.07)+"px Garamond";
        ctx.fillStyle = COLORS.BLOOD_RED;
		interpret_text(this.stats[0]+" {Health}", x+(w*0.235), y+(h*0.31), w, h);
        ctx.fillStyle = COLORS.GHOSTLY_BLUE;
		interpret_text(this.stats[1]+" {Wisdom}", x+(w*0.415), y+(h*0.31), w, h);
        ctx.fillStyle = COLORS.UNHOLY_ORANGE;
		interpret_text(this.stats[2]+" {Might}", x+(w*0.595), y+(h*0.31), w, h);
        ctx.fillStyle = COLORS.DEMONIC_PURPLE;
		interpret_text(this.stats[3]+" {Power}", x+(w*0.775), y+(h*0.31), w, h);

		ctx.fillStyle = COLORS.SLATE_BLACK;
		ctx.textAlign = "center";

		ctx.font = (h*0.07)+"px Garamond";
		interpret_text(this.special, x+(w/2), y+(h*0.55), w, h);

		ctx.fillStyle = COLORS.SLATE_BLACK;
		ctx.textAlign = "center";
		ctx.font = (h*0.07)+"px Garamond";
		ctx.fillText(this.type, x+(w*0.5), y+(h*0.95), w*0.9);

		ctx.fillStyle = COLORS.SLATE_BLACK;
		ctx.font = (h*0.07)+"px Garamond";
		embed_image("{"+this.set+"}", x+(w*0.88), y+(h*0.95)-45);

		// ctx.strokeStyle = COLORS.SLATE_BLACK;
		// ctx.lineWidth = 4;
	    // ctx.beginPath();
        // ctx.moveTo(Math.round(x), Math.round(y+(h*0.80)));
        // ctx.lineTo(Math.round(x+(w*1.0)), Math.round(y+(h*0.80)));
        // ctx.stroke();
        
		// ctx.font = (h*0.06)+"px Garamond";
		// interpret_text("Summon:", x+(w/2), y+(h*0.87), w, h);
		// ctx.font = (h*0.06)+"px Garamond";
		// interpret_text(this.summon, x+(w/2), y+(h*0.95), w, h);
	}
	draw_back(x, y, w, h, orient) {
		ctx.strokeStyle = COLORS.SLATE_BLACK;
		ctx.lineWidth = 25;
		ctx.beginPath();
		ctx.roundRect(x+5, y+5, w-10, h-10, 20);
		ctx.stroke();
		
		ctx.fillStyle = COLORS.DEMONIC_PURPLE;
		ctx.textAlign = "center";
		ctx.font = (h*0.15)+"px Garamond";
		ctx.fillText("Vampire", x+(w/2), y+(h*0.4), w*0.85);
		ctx.save();
		ctx.translate(x+(w/2), y+(h*0.6));
		ctx.rotate(Math.PI);
		ctx.fillText("Vampire", 0, 0);
		ctx.restore();
	}
};
// class Monster_Card_Special {
// 	title;
// 	stats;
// 	special;

// 	constructor(title, stats, special) {
// 		this.title = title;
// 		this.stats = stats;
// 		this.special = special;
// 	}
// 	get_name() {
// 		return this.title;
// 	}
// 	draw(x, y, w, h, orient) {
// 		ctx.strokeStyle = COLORS.SLATE_BLACK
// 		ctx.lineWidth = 15;
// 		ctx.beginPath();
// 		ctx.roundRect(Math.round(x+2), Math.round(y+2), Math.round(w-4), Math.round(h-4), 24);
// 		ctx.stroke();
		
// 		ctx.fillStyle = COLORS.SLATE_BLACK;
// 		ctx.textAlign = "left";
// 		ctx.font = (h*0.1)+"px Garamond";
// 		ctx.fillText(this.title, x+(w*0.075), y+(h*0.12), w*0.85);

// 		ctx.fillStyle = COLORS.BLOOD_RED;
// 		embed_image("{Damage}", x+(w*0.12), y+(h*0.20)-45);
// 		ctx.font = (h*0.07)+"px Garamond";
// 		ctx.fillText("Vampire", x+(w*0.12)+45, y+(h*0.20), w*0.85);
		
// 		ctx.strokeStyle = COLORS.SLATE_BLACK;
// 		ctx.lineWidth = 4;
//         ctx.strokeRect(Math.round(x+(w*0.14)), Math.round(y+(h*0.25)), w*0.18, w*0.15);
//         ctx.strokeRect(Math.round(x+(w*0.32)), Math.round(y+(h*0.25)), w*0.18, w*0.15);
//         ctx.strokeRect(Math.round(x+(w*0.50)), Math.round(y+(h*0.25)), w*0.18, w*0.15);
//         ctx.strokeRect(Math.round(x+(w*0.68)), Math.round(y+(h*0.25)), w*0.18, w*0.15);

// 		ctx.textAlign = "center";
// 		ctx.font = (h*0.07)+"px Garamond";
//         ctx.fillStyle = COLORS.BLOOD_RED;
// 		interpret_text(this.stats[0]+" {Health}", x+(w*0.235), y+(h*0.33), w, h);
//         ctx.fillStyle = COLORS.GHOSTLY_BLUE;
// 		interpret_text(this.stats[1]+" {Wisdom}", x+(w*0.415), y+(h*0.33), w, h);
//         ctx.fillStyle = COLORS.UNHOLY_ORANGE;
// 		interpret_text(this.stats[2]+" {Might}", x+(w*0.595), y+(h*0.33), w, h);
//         ctx.fillStyle = COLORS.DEMONIC_PURPLE;
// 		interpret_text(this.stats[3]+" {Power}", x+(w*0.775), y+(h*0.33), w, h);

// 		ctx.fillStyle = COLORS.SLATE_BLACK;
// 		ctx.textAlign = "center";

// 		ctx.font = (h*0.07)+"px Garamond";
// 		interpret_text(this.special, x+(w/2), y+(h*0.60), w, h);
// 	}
// 	draw_back(x, y, w, h, orient) {
// 		ctx.strokeStyle = COLORS.SLATE_BLACK;
// 		ctx.lineWidth = 25;
// 		ctx.beginPath();
// 		ctx.roundRect(x+5, y+5, w-10, h-10, 20);
// 		ctx.stroke();
		
// 		ctx.fillStyle = COLORS.DEMONIC_PURPLE;
// 		ctx.textAlign = "center";
// 		ctx.font = (h*0.15)+"px Garamond";
// 		ctx.fillText("Vampire", x+(w/2), y+(h*0.4), w*0.85);
// 		ctx.save();
// 		ctx.translate(x+(w/2), y+(h*0.6));
// 		ctx.rotate(Math.PI);
// 		ctx.fillText("Vampire", 0, 0);
// 		ctx.restore();
// 	}
// };
class Standard_Card {
	title;
	text;
    type;
    set;
    is_evil;

	constructor(title, text, type, set, is_evil) {
		this.title = title;
		this.text = text;
        this.type = type;
        this.set = set;
		this.is_evil = is_evil;
	}
	get_name() {
		return this.title;
	}
	draw(x, y, w, h, orient) {
		ctx.strokeStyle = COLORS.SLATE_BLACK
		ctx.lineWidth = 15;
		ctx.beginPath();
		ctx.roundRect(Math.round(x+2), Math.round(y+2), Math.round(w-4), Math.round(h-4), 24);
		ctx.stroke();
		
		ctx.fillStyle = COLORS.SLATE_BLACK;
		ctx.textAlign = "center";
		ctx.font = (h*0.1)+"px Garamond";
		ctx.fillText(this.title, x+(w*0.5), y+(h*0.12), w*0.9);

		ctx.fillStyle = COLORS.SLATE_BLACK;
		ctx.textAlign = "center";
		ctx.font = (h*0.08)+"px Garamond";
		interpret_text(this.text, x+(w/2), y+(h*0.50), w, h);

		ctx.fillStyle = COLORS.SLATE_BLACK;
		ctx.textAlign = "center";
		ctx.font = (h*0.07)+"px Garamond";
		ctx.fillText(this.type, x+(w*0.5), y+(h*0.95), w*0.9);

		ctx.fillStyle = COLORS.SLATE_BLACK;
		ctx.font = (h*0.07)+"px Garamond";
		embed_image("{"+this.set+"}", x+(w*0.88), y+(h*0.95)-45);
	}
	draw_back(x, y, w, h, orient) {
		ctx.strokeStyle = COLORS.SLATE_BLACK;
		ctx.lineWidth = 25;
		ctx.beginPath();
		ctx.roundRect(x+5, y+5, w-10, h-10, 20);
		ctx.stroke();
		
		let txt = "";
		if (this.is_evil) {
			ctx.fillStyle = COLORS.DEMONIC_PURPLE;
			txt = "Vampire";
		}else {
			ctx.fillStyle = COLORS.GHOSTLY_BLUE;
			txt = "Adventurers";
		}
		ctx.textAlign = "center";
		ctx.font = (h*0.15)+"px Garamond";
		ctx.fillText(txt, x+(w/2), y+(h*0.4), w*0.85);
		ctx.save();
		ctx.translate(x+(w/2), y+(h*0.6));
		ctx.rotate(Math.PI);
		ctx.fillText(txt, 0, 0);
		ctx.restore();
	}
};
// class Item_Card {
// 	title;
// 	text;
//     trading;
//     is_evil;

// 	constructor(title, text, trading, is_evil) {
// 		this.title = title;
// 		this.text = text;
//         this.trading = trading;
// 		this.is_evil = is_evil;
// 	}
// 	get_name() {
// 		return this.title;
// 	}
// 	draw(x, y, w, h, orient) {
// 		ctx.strokeStyle = COLORS.SLATE_BLACK
// 		ctx.lineWidth = 15;
// 		ctx.beginPath();
// 		ctx.roundRect(Math.round(x+2), Math.round(y+2), Math.round(w-4), Math.round(h-4), 24);
// 		ctx.stroke();
		
// 		ctx.fillStyle = COLORS.SLATE_BLACK;
// 		ctx.textAlign = "center";
// 		ctx.font = (h*0.1)+"px Garamond";
// 		ctx.fillText(this.title, x+(w*0.5), y+(h*0.12), w*0.9);

// 		ctx.fillStyle = COLORS.SLATE_BLACK;
// 		ctx.textAlign = "center";
// 		ctx.font = (h*0.06)+"px Garamond";
// 		interpret_text(this.text, x+(w/2), y+(h*0.35), w, h);
        
// 		interpret_text("This item card remains with this Hero"+this.trading, x+(w*0.5), y+(h*0.78), w, h);

// 		ctx.fillStyle = COLORS.SLATE_BLACK;
// 		ctx.font = (h*0.06)+"px Garamond";
// 		ctx.textAlign = "center";
// 		ctx.fillText("Item", x+(w*0.5), y+(h*0.95), w*0.9);
// 	}
// 	draw_back(x, y, w, h, orient) {
// 		ctx.strokeStyle = COLORS.SLATE_BLACK;
// 		ctx.lineWidth = 25;
// 		ctx.beginPath();
// 		ctx.roundRect(x+5, y+5, w-10, h-10, 20);
// 		ctx.stroke();
		
// 		let txt = "";
// 		if (this.is_evil) {
// 			ctx.fillStyle = COLORS.DEMONIC_PURPLE;
// 			txt = "Vampire";
// 		}else {
// 			ctx.fillStyle = COLORS.GHOSTLY_BLUE;
// 			txt = "Adventurers";
// 		}
// 		ctx.textAlign = "center";
// 		ctx.font = (h*0.15)+"px Garamond";
// 		ctx.fillText(txt, x+(w/2), y+(h*0.4), w*0.85);
// 		ctx.save();
// 		ctx.translate(x+(w/2), y+(h*0.6));
// 		ctx.rotate(Math.PI);
// 		ctx.fillText(txt, 0, 0);
// 		ctx.restore();
// 	}
// };
// class Special_Item_Card {
// 	title;
// 	text;
//     trading;
//     is_evil;

// 	constructor(title, text, trading, is_evil) {
// 		this.title = title;
// 		this.text = text;
//         this.trading = trading;
// 		this.is_evil = is_evil;
// 	}
// 	get_name() {
// 		return this.title;
// 	}
// 	draw(x, y, w, h, orient) {
// 		ctx.strokeStyle = COLORS.SLATE_BLACK
// 		ctx.lineWidth = 15;
// 		ctx.beginPath();
// 		ctx.roundRect(Math.round(x+2), Math.round(y+2), Math.round(w-4), Math.round(h-4), 24);
// 		ctx.stroke();
		
// 		ctx.fillStyle = COLORS.SLATE_BLACK;
// 		ctx.textAlign = "center";
// 		ctx.font = (h*0.1)+"px Garamond";
// 		ctx.fillText(this.title, x+(w*0.5), y+(h*0.12), w*0.9);

// 		ctx.fillStyle = COLORS.SLATE_BLACK;
// 		ctx.textAlign = "center";
// 		ctx.font = (h*0.06)+"px Garamond";
// 		interpret_text(this.text, x+(w/2), y+(h*0.35), w, h);
        
// 		interpret_text("This item card remains with this Hero unless dropped or traded. If it would be lost, it is dropped instead.", x+(w*0.5), y+(h*0.72), w, h);

// 		ctx.fillStyle = COLORS.SLATE_BLACK;
// 		ctx.font = (h*0.06)+"px Garamond";
// 		ctx.textAlign = "center";
// 		ctx.fillText("Special Item", x+(w*0.5), y+(h*0.95), w*0.9);
// 	}
// 	draw_back(x, y, w, h, orient) {
// 		ctx.strokeStyle = COLORS.SLATE_BLACK;
// 		ctx.lineWidth = 25;
// 		ctx.beginPath();
// 		ctx.roundRect(x+5, y+5, w-10, h-10, 20);
// 		ctx.stroke();
		
// 		let txt = "";
// 		if (this.is_evil) {
// 			ctx.fillStyle = COLORS.DEMONIC_PURPLE;
// 			txt = "Vampire";
// 		}else {
// 			ctx.fillStyle = COLORS.GHOSTLY_BLUE;
// 			txt = "Adventurers";
// 		}
// 		ctx.textAlign = "center";
// 		ctx.font = (h*0.15)+"px Garamond";
// 		ctx.fillText(txt, x+(w/2), y+(h*0.4), w*0.85);
// 		ctx.save();
// 		ctx.translate(x+(w/2), y+(h*0.6));
// 		ctx.rotate(Math.PI);
// 		ctx.fillText(txt, 0, 0);
// 		ctx.restore();
// 	}
// };
// class Feature_Card {
// 	title;
// 	text;
//     is_evil;

// 	constructor(title, text, is_evil) {
// 		this.title = title;
// 		this.text = text;
// 		this.is_evil = is_evil;
// 	}
// 	get_name() {
// 		return this.title;
// 	}
// 	draw(x, y, w, h, orient) {
// 		ctx.strokeStyle = COLORS.SLATE_BLACK
// 		ctx.lineWidth = 15;
// 		ctx.beginPath();
// 		ctx.roundRect(Math.round(x+2), Math.round(y+2), Math.round(w-4), Math.round(h-4), 24);
// 		ctx.stroke();
		
// 		ctx.fillStyle = COLORS.SLATE_BLACK;
// 		ctx.textAlign = "center";
// 		ctx.font = (h*0.1)+"px Garamond";
// 		ctx.fillText(this.title, x+(w*0.5), y+(h*0.12), w*0.9);

// 		ctx.fillStyle = COLORS.SLATE_BLACK;
// 		ctx.textAlign = "center";
// 		ctx.font = (h*0.06)+"px Garamond";
// 		interpret_text(this.text, x+(w/2), y+(h*0.35), w, h);
        
// 		interpret_text("This feature card remains in this room. It cannot be destroyed.", x+(w*0.5), y+(h*0.78), w, h);

// 		ctx.fillStyle = COLORS.SLATE_BLACK;
// 		ctx.font = (h*0.06)+"px Garamond";
// 		ctx.textAlign = "center";
// 		ctx.fillText("Feature", x+(w*0.5), y+(h*0.95), w*0.9);
// 	}
// 	draw_back(x, y, w, h, orient) {
// 		ctx.strokeStyle = COLORS.SLATE_BLACK;
// 		ctx.lineWidth = 25;
// 		ctx.beginPath();
// 		ctx.roundRect(x+5, y+5, w-10, h-10, 20);
// 		ctx.stroke();
		
// 		let txt = "";
// 		if (this.is_evil) {
// 			ctx.fillStyle = COLORS.DEMONIC_PURPLE;
// 			txt = "Vampire";
// 		}else {
// 			ctx.fillStyle = COLORS.GHOSTLY_BLUE;
// 			txt = "Adventurers";
// 		}
// 		ctx.textAlign = "center";
// 		ctx.font = (h*0.15)+"px Garamond";
// 		ctx.fillText(txt, x+(w/2), y+(h*0.4), w*0.85);
// 		ctx.save();
// 		ctx.translate(x+(w/2), y+(h*0.6));
// 		ctx.rotate(Math.PI);
// 		ctx.fillText(txt, 0, 0);
// 		ctx.restore();
// 	}
// };
// class Totem_Card {
// 	title;
// 	text;
//     stats;
//     is_evil;

// 	constructor(title, text, stats, is_evil) {
// 		this.title = title;
// 		this.text = text;
//         this.stats = stats;
// 		this.is_evil = is_evil;
// 	}
// 	get_name() {
// 		return this.title;
// 	}
// 	draw(x, y, w, h, orient) {
// 		ctx.strokeStyle = COLORS.SLATE_BLACK
// 		ctx.lineWidth = 15;
// 		ctx.beginPath();
// 		ctx.roundRect(Math.round(x+2), Math.round(y+2), Math.round(w-4), Math.round(h-4), 24);
// 		ctx.stroke();
		
// 		ctx.fillStyle = COLORS.SLATE_BLACK;
// 		ctx.textAlign = "center";
// 		ctx.font = (h*0.1)+"px Garamond";
// 		ctx.fillText(this.title, x+(w*0.5), y+(h*0.12), w*0.9);

// 		ctx.fillStyle = COLORS.SLATE_BLACK;
// 		ctx.textAlign = "center";
// 		ctx.font = (h*0.06)+"px Garamond";
// 		interpret_text(this.text, x+(w/2), y+(h*0.35), w, h);
        
// 		ctx.font = (h*0.06)+"px Garamond";
// 		interpret_text("This totem card remains in this room until it is destroyed. "+this.stats, x+(w*0.5), y+(h*0.73), w, h);

// 		ctx.fillStyle = COLORS.SLATE_BLACK;
// 		ctx.font = (h*0.07)+"px Garamond";
// 		ctx.textAlign = "center";
// 		ctx.fillText("Totem", x+(w*0.5), y+(h*0.95), w*0.9);
// 	}
// 	draw_back(x, y, w, h, orient) {
// 		ctx.strokeStyle = COLORS.SLATE_BLACK;
// 		ctx.lineWidth = 25;
// 		ctx.beginPath();
// 		ctx.roundRect(x+5, y+5, w-10, h-10, 20);
// 		ctx.stroke();
		
// 		let txt = "";
// 		if (this.is_evil) {
// 			ctx.fillStyle = COLORS.DEMONIC_PURPLE;
// 			txt = "Vampire";
// 		}else {
// 			ctx.fillStyle = COLORS.GHOSTLY_BLUE;
// 			txt = "Adventurers";
// 		}
// 		ctx.textAlign = "center";
// 		ctx.font = (h*0.15)+"px Garamond";
// 		ctx.fillText(txt, x+(w/2), y+(h*0.4), w*0.85);
// 		ctx.save();
// 		ctx.translate(x+(w/2), y+(h*0.6));
// 		ctx.rotate(Math.PI);
// 		ctx.fillText(txt, 0, 0);
// 		ctx.restore();
// 	}
// };
// class Hero_Card {
// 	title;
// 	type;
// 	stats;
// 	special;

// 	constructor(title, type, stats, special) {
// 		this.title = title;
// 		this.type = type;
// 		this.stats = stats;
// 		this.special = special;
// 	}
// 	get_name() {
// 		return this.title;
// 	}
// 	draw(x, y, w, h, orient) {
// 		ctx.strokeStyle = COLORS.SLATE_BLACK
// 		ctx.lineWidth = 15;
// 		ctx.beginPath();
// 		ctx.roundRect(Math.round(x+2), Math.round(y+2), Math.round(w-4), Math.round(h-4), 24);
// 		ctx.stroke();
		
// 		ctx.fillStyle = COLORS.SLATE_BLACK;
// 		ctx.textAlign = "left";
// 		ctx.font = (h*0.1)+"px Garamond";
// 		ctx.fillText(this.title, x+(w*0.075), y+(h*0.12), w*0.85);

// 		ctx.font = (h*0.07)+"px Garamond";
// 		ctx.fillText(this.type, x+(w*0.12)+45, y+(h*0.20), w*0.85);
		
// 		ctx.strokeStyle = COLORS.SLATE_BLACK;
// 		ctx.lineWidth = 4;
//         ctx.strokeRect(Math.round(x+(w*0.14)), Math.round(y+(h*0.25)), w*0.18, w*0.15);
//         ctx.strokeRect(Math.round(x+(w*0.32)), Math.round(y+(h*0.25)), w*0.18, w*0.15);
//         ctx.strokeRect(Math.round(x+(w*0.50)), Math.round(y+(h*0.25)), w*0.18, w*0.15);
//         ctx.strokeRect(Math.round(x+(w*0.68)), Math.round(y+(h*0.25)), w*0.18, w*0.15);

// 		ctx.textAlign = "center";
// 		ctx.font = (h*0.07)+"px Garamond";
//         ctx.fillStyle = COLORS.BLOOD_RED;
// 		interpret_text(this.stats[0]+" {Health}", x+(w*0.235), y+(h*0.33), w, h);
//         ctx.fillStyle = COLORS.GHOSTLY_BLUE;
// 		interpret_text(this.stats[1]+" {Wisdom}", x+(w*0.415), y+(h*0.33), w, h);
//         ctx.fillStyle = COLORS.UNHOLY_ORANGE;
// 		interpret_text(this.stats[2]+" {Might}", x+(w*0.595), y+(h*0.33), w, h);
//         ctx.fillStyle = COLORS.DEMONIC_PURPLE;
// 		interpret_text(this.stats[3]+" {Power}", x+(w*0.775), y+(h*0.33), w, h);

// 		ctx.fillStyle = COLORS.SLATE_BLACK;
// 		ctx.textAlign = "center";

// 		ctx.font = (h*0.07)+"px Garamond";
// 		interpret_text(this.special, x+(w/2), y+(h*0.55), w, h);
// 	}
// 	draw_back(x, y, w, h, orient) {
// 		ctx.strokeStyle = COLORS.SLATE_BLACK;
// 		ctx.lineWidth = 25;
// 		ctx.beginPath();
// 		ctx.roundRect(x+5, y+5, w-10, h-10, 20);
// 		ctx.stroke();
		
// 		ctx.fillStyle = COLORS.UNHOLY_ORANGE;
// 		ctx.textAlign = "center";
// 		ctx.font = (h*0.15)+"px Garamond";
// 		ctx.fillText("Hero Cards", x+(w/2), y+(h*0.4), w*0.85);
// 		ctx.save();
// 		ctx.translate(x+(w/2), y+(h*0.6));
// 		ctx.rotate(Math.PI);
// 		ctx.fillText("Hero Cards", 0, 0);
// 		ctx.restore();
// 	}
// };
class Room_Card {
	title;
	special;
	image;

	constructor(title, special, image) {
		this.title = title;
		this.special = special;
		this.image = image;
	}
	get_name() {
		return this.title;
	}
	draw(x, y, w, h, orient) {
		ctx.strokeStyle = COLORS.SLATE_BLACK
		ctx.lineWidth = 15;
		ctx.beginPath();
		ctx.roundRect(Math.round(x+2), Math.round(y+2), Math.round(w-4), Math.round(h-4), 24);
		ctx.stroke();

		// ctx.drawImage(this.image, x, y);
		
		ctx.fillStyle = COLORS.SLATE_BLACK;
		ctx.textAlign = "left";
		ctx.font = (h*0.07)+"px Garamond";
		ctx.fillText(this.title, x+(w*0.05), y+(h*0.10), w*0.85);
		ctx.fillStyle = COLORS.SLATE_BLACK;

		ctx.textAlign = "right";
		ctx.font = (h*0.05)+"px Garamond";
		interpret_text_right_aligned(this.special, x+(w*0.96), y+(h*0.96), w, h);
	}
	draw_back(x, y, w, h, orient) {
		
	}
};

let buttons = [];

let cards_per_page = 10;

let card_deck = [];
// Player Deck - Vampire
function generate_player_deck_vampire_base_deck() {
	// card_deck = [];
	
    card_deck.push(new Standard_Card("Ancient Guardians", "Animate the nearest {Armour} Armour. It gains +2 to its next attack per Hero in {Aura} Aura.", "Event", "Base", true));
    card_deck.push(new Standard_Card("Banshee's Cry", "Suffer a {Power} Power 6 attack. +2 per {Bones} Bones and {Souls} Souls. Add either a {Bones} Bones or a {Souls} Souls if the Hero suffers damage.", "Event", "Base", true));
    card_deck.push(new Standard_Card("Backstab", "Suffer a {Might} Might 7 attack. +2 per {Armour} Armour and {Ruins} Ruins. May add -2 to add a {Ruins} Ruins. {Ruins} Ruins provide no protection.", "Event", "Base", true));
    card_deck.push(new Standard_Card("Swarming Vermin", "All Heroes suffer a {Might} Might 5 attack. +1 per Hero in a room with {Sewers} Sewers. Ruins {Ruins} provide no protection.", "Event", "Base", true));
    card_deck.push(new Standard_Card("Beckoning Spirits", "Move the Hero to an adjacent room. If either room has Souls, replace the event with an Evil Monster event.", "Instant", "Base", true));
    card_deck.push(new Standard_Card("Crippling Miasma", "Hero must make a check against either Wounded or Terrified, Vampire's choice. If {Sewers} Sewers, make both checks. If {Aura} Aura, -1 to all checks made.", "Instant", "Base", true));
    card_deck.push(new Standard_Card("Coward's Ring", "-1 {Might} Might. +2 vs attacks. Every time this Hero enters an unexplored room or a room with {Sewers} Sewers, it must make a 6+ check to avoid 1 {Damage} Damage", "Item", "Base", true));
    card_deck.push(new Standard_Card("Prowling Spirits", "In these two rooms, Heroes add -1 to all checks against Wounded and Terrified. This feature counts as a permanent {Souls} Souls token.", "Feature", "Base", true));
    card_deck.push(new Monster_Card("Bloodsucker", [5, 7, 2, 3], "+1 to attacks per 2 {Damage} Damage on the target, rounded up. +1 vs attacks in {Ruins} Ruins.", "Monster", "Base", true));
    card_deck.push(new Monster_Card("Bloodhound", [7, 5, 3, 2], "When a Hero takes damage, gain +2 {Might} Might and +1 {Power} Power until next attack. Buff does not stack. Drop a {Bones} Bones on death.", "Monster", "Base", true));
    card_deck.push(new Standard_Card("Claws in the Dark", "Suffer a {Power} Power 7 attack. If {Sewers} Sewers, repeat on nearest Hero. For each attack, +1 per {Bones} Bones.", "Event", "Base", true));
    card_deck.push(new Standard_Card("Call to Arms", "In all rooms with Heroes, if {Armour} Armour, animate {Armour} Armour. If {Aura} Aura, may apply the event to the nearest animated {Armour} Armour instead.", "Instant", "Base", true));

	cards_per_page = 16;
};
function generate_player_deck_vampire_ravenous_beasts_deck() {
	// card_deck = [];
	
    card_deck.push(new Standard_Card("Frenzied Assault", "In a room with a Hero and {Sewers} Sewers, spawn a {Ratman} Ratman. All monsters move to the nearest Hero and perform an attack.", "Event", "Ravenous Beasts", true));
    card_deck.push(new Standard_Card("Rise of the Ratmen", "If {Sewers} Sewers, spawn a {Ratman} Ratman. If {Bones} Bones, spawn a {Ratman} Ratman. If no {Bones} Bones, add a {Bones} Bones.", "Event", "Ravenous Beasts", true));
    card_deck.push(new Standard_Card("Tooth and Claw", "All Heroes in {Bones} Bones or {Sewers} Sewers suffer a Might 5 attack. Each attack, +2 if {Bones} Bones. Each Hero, if {Sewers} Sewers, suffer a Might 4 attack.", "Event", "Ravenous Beasts", true));
    card_deck.push(new Standard_Card("Bloodthirsty Hunters", "Suffer a {Might} Might 8 attack. May remove a {Bones} Bones to add +4. May remove a {Bones} Bones to suffer a {Might} Might 7 attack.", "Event", "Ravenous Beasts", true));
    card_deck.push(new Standard_Card("Silent Hunters", "Replace the event with an Evil Monster event. If {Sewers} Sewers, the Monster gains +1 on its next attack. If {Unlit} Unlit, the Monster immediately surprise attacks.", "Instant", "Ravenous Beasts", true));
    card_deck.push(new Standard_Card("Dark Madness", "If {Sewers} Sewers, the Hero uses the {Sewers} Sewers with the Vampire controlling the action, resolving that event first. If the Hero has at least 2 {Damage} Damage, add a {Bones} Bones.", "Instant", "Ravenous Beasts", true));
    card_deck.push(new Standard_Card("Helm of the Rat King", "+1 {Might} Might per {Bones} Bones. Hero must move towards and attack nearest monster if within 2 rooms. On even {Damage} Damage, drop a {Bones} Bones. On death, spawn a {Ratman} Ratman.", "Item", "Ravenous Beasts", true));
    card_deck.push(new Standard_Card("Bloodstained Walls", "In these two rooms, add +1 per {Bones} Bones to all Monster attacks. This feature counts as a permanent {Bones} Bones token.", "Feature", "Ravenous Beasts", true));
    card_deck.push(new Monster_Card("Werewolf", [6, 5, 3, 3], "+1 {Might} Might per {Damage} Damage taken. +1 vs attacks per {Bones} Bones. On death, drop a {Bones} Bones.", "Monster", "Ravenous Beasts", true));
    card_deck.push(new Monster_Card("Swamp Dweller", [5, 7, 4, 2], "Heroes in the same room add -1 to all checks against Wounded. If {Sewers} Sewers, may move to any {Sewers} Sewers and perform a surprise attack.", "Monster", "Ravenous Beasts", true));
    card_deck.push(new Monster_Card("Direwolf", [6, 6, 3, 3], "Whenever a room is explored, move to it and perform a surprise attack. On death, drop a {Bones} Bones", "Monster", "Ravenous Beasts", true));
    card_deck.push(new Standard_Card("From the Shadows", "This Hero and another Hero within 3 rooms each suffer a {Might} Might 7 attack. In each room, add a {Bones} Bones if {Sewers} Sewers or if the Hero takes {Damage} Damage", "Event", "Ravenous Beasts", true));

	cards_per_page = 16;
};
function generate_player_deck_vampire_crumbling_fortress_deck() {
	// card_deck = [];
	
    card_deck.push(new Standard_Card("Rust-Cacked Arms", "Animate {Armour} Armour. If {Ruins} Ruins, remove a {Ruins} Ruins to add an {Armour} Armour and animate {Armour} Armour. If there was no {Ruins} Ruins, add a {Ruins}", "Event", "Crumbling Fortress", true));
    card_deck.push(new Standard_Card("Guardian's Call", "Suffer a {Might} Might 8 attack. Nearest animated {Armour} Armour gains +2 on its next attack and heals 1 {Damage} Damage per {Ruins} Ruins in this room.", "Event", "Crumbling Fortress", true));
    card_deck.push(new Standard_Card("Falling Bricks", "Suffer a {Power} Power 8 attack. If {Armour} Armour, add a {Ruins} Ruins. +2 per {Ruins} Ruins.", "Event", "Crumbling Fortress", true));
    card_deck.push(new Standard_Card("Archaic Battlecry", "Animate nearest {Armour} Armour. All {Armour} Armour gains +1 on its next attack and heals 1 {Damage} Damage.", "Event", "Crumbling Fortress", true));
    card_deck.push(new Standard_Card("Chandelier Crashes", "Add a {Ruins} Ruins. For the rest of the turn, treat the room as {Unlit} Unlit and ignore room text. Redraw the event.", "Instant", "Crumbling Fortress", true));
    card_deck.push(new Standard_Card("Crumbling Floorboards", "Choose one: add a {Ruins} Ruins or replace the event with an Evil event. If {Ruins} Ruins, perform both.", "Instant", "Crumbling Fortress", true));
    card_deck.push(new Standard_Card("Cursed Breastplate", "+2 on checks to survive. +2 vs attacks from {Armour} Armour. 6+ check each turn to avoid being controlled by the Vampire. On death, spawn animated {Armour} Armour.", "Item", "Crumbling Fortress", true));
    card_deck.push(new Standard_Card("Grotesque Gargoyles", "In these two rooms, {Ruins} Ruins provide no protection. Monsters may use {Ruins} Ruins in these rooms like {Sewers} Sewers. This feature counts as a permanent {Ruins} Ruins token.", "Feature", "Crumbling Fortress", true));
    card_deck.push(new Monster_Card("Ancient Warrior", [7, 5, 4, 3], "Once per turn, when a {Bones} Bones or {Souls} Souls would be dropped in this room, drop a {Ruins} Ruins instead.", "Monster", "Crumbling Fortress", true));
    card_deck.push(new Monster_Card("Spectral Knight", [5, 5, 2, 3], "+1 {Power} Power per {Ruins} Ruins. +1 vs attacks per {Ruins} Ruins. +1 to attacks by {Armour} Armour within 3 rooms. On death, add a {Ruins} Ruins.", "Monster", "Crumbling Fortress", true));
    card_deck.push(new Standard_Card("Call the Defenders", "Animate {Armour} Armour. It gains +1 to its next attack per {Ruins} Ruins. It immediately surprise attacks.", "Instant", "Crumbling Fortress", true));
    card_deck.push(new Standard_Card("Forbidden Sanctuary", "In these two rooms, whenever a Hero enters, animate {Armour} Armour. When played, add an {Armour} Armour to either room.", "Feature", "Crumbling Fortress", true));

	cards_per_page = 16;
};
function generate_player_deck_vampire_creeping_nightmare_deck() {
	// card_deck = [];
	
    card_deck.push(new Standard_Card("Stroke of Midnight", "All Heroes in {Souls} Souls suffer a {Power} Power 6 attack. All Heroes in {Aura} Aura suffer a {Power} Power 6 attack.", "Event", "Creeping Nightmare", true));
    card_deck.push(new Standard_Card("Vengeful Spirits", "Suffer a {Power} Power 7 attack per {Souls} Souls. If {Aura} Aura, +1 to each attack. If the Hero suffers {Damage} Damage, may force them to take one step towards the Entrance Hall.", "Event", "Creeping Nightmare", true));
    card_deck.push(new Standard_Card("Banshee's Cry", "This Hero and the Hero with the most {Damage} Damage suffer a {Power} Power 6 attack. In each room, add a {Souls} Souls if the Hero suffers {Damage} Damage.", "Event", "Creeping Nightmare", true));
    card_deck.push(new Standard_Card("Spreading Panic", "This Hero and the nearest other Hero suffer a {Power} Power 6 attack. If {Aura} Aura in either room, also attack next nearest Hero. In each room, +1 per {Souls} Souls.", "Event", "Creeping Nightmare", true));
    card_deck.push(new Standard_Card("Menagerie of Doom", "For the rest of the turn, treat this room as having one additional token of all features. Replace the event with and Evil event.", "Instant", "Creeping Nightmare", true));
    card_deck.push(new Standard_Card("Bloodcurdling Scream", "Move the Hero up to 2 rooms towards the Entrance Hall. If {Aura} Aura originally, add a {Souls} Souls to the new room.", "Instant", "Creeping Nightmare", true));
    card_deck.push(new Standard_Card("Haunted Lantern", "+2 vs Monster attacks. Event attacks always deal grevious {Damage} Damage. Once per turn, redraw a Good event triggered by this Hero. On death, drop a {Souls} Souls.", "Item", "Creeping Nightmare", true));
    card_deck.push(new Standard_Card("Malevolent Haunts", "In these two rooms, +1 to attacks from Evil events and Evil events may treat the room as containing an additional token of any feature.", "Feature", "Creeping Nightmare", true));
    card_deck.push(new Monster_Card("Harbinger", [7, 5, 3, 4], "Instead of attacking, it may cause an Evil event. +1 to event attacks within two rooms. On death, add a {Souls} Souls.", "Monster", "Creeping Nightmare", true));
    card_deck.push(new Monster_Card("Spectre", [5, 7, 3, 4], "Counts as a {Souls} Souls token and an {Aura} Aura token for the purpose of Evil events. On death, add a {Souls} Souls.", "Monster", "Creeping Nightmare", true));
    card_deck.push(new Standard_Card("Terror in the Dark", "Suffer a {Power} Power 8 attack. +1 per {Souls} Souls. If {Aura} Aura, may force the Hero to walk one room towards the Entrance Hall.", "Event", "Creeping Nightmare", true));
    card_deck.push(new Standard_Card("Living Nightmare", "If {Souls} Souls, suffer 2 {Damage} Damage. Add 2 {Souls} Souls. May move any number of {Souls} Souls to adjacent rooms.", "Event", "Creeping Nightmare", true));

	cards_per_page = 16;
};

// function generate_monster_deck() {
// 	// card_deck = [];
	
// 	// Monsters (Rev 1)
// 	// card_deck.push(new Monster_Card("Skeleton", "Unholy", [2, 3, 4, 2], "Revives when room becomes {Unlit} Unlit", "{Unlit} Unlit, {Health} Health damage"));
// 	// card_deck.push(new Monster_Card("Imp", "Demon", [3, 2, 2, 4], "Revives when room becomes {Unlit} Unlit", "{Unlit} Unlit, {Wisdom} Will damage"));
// 	card_deck.push(new Monster_Card("Zombie", "Unholy", [5, 5, 3, 2], "+1 {Power} Fear whenever it damages an enemy", "Unexplored, else {Unlit} Unlit"));
// 	card_deck.push(new Monster_Card("Werewolf", "Unholy", [5, 5, 2, 3], "+1 {Might} Might whenever it damages an enemy", "Unexplored, else {Unlit} Unlit"));
// 	card_deck.push(new Monster_Card("Shadowbeast", "Demon", [4, 6, 2, 3], "Makes one adjacent unoccupied room {Unlit} Unlit per turn, +1 {Power} Fear when adjacent to an unexplored room", "Unexplored, else {Unlit} Unlit"));
// 	card_deck.push(new Monster_Card("Ghost Knight", "Spirit", [6, 4, 3, 2], "+1 {Might} Might in room with {Armour} Armour, May suffer 2 {Damage} Damage to animate {Armour} Armour in room", "{Unlit} Unlit, {Armour} Armour"));
// 	card_deck.push(new Monster_Card("Specter", "Spirit", [5, 6, 3, 3], "Remove 2 {Souls} Souls to summon, +1 {Might} Might and +1 {Power} Fear when in a room with {Souls} Souls", "2 {Souls} Souls"));
// 	card_deck.push(new Monster_Card("Revenant", "Unholy", [6, 5, 3, 3], "Remove 2 {Bones} Bones to summon, +1 {Might} Might and +1 {Power} Fear when in a room with {Bones} Bones", "2 {Bones} Bones"));
// 	card_deck.push(new Monster_Card("Bloodhound", "Unholy", [7, 5, 2, 1], "Gains +1 {Might} Might and +1 {Power} Fear whenever damaged", "{Unlit} Unlit, {Bones} Bones"));
// 	card_deck.push(new Monster_Card("Forgotten", "Spirit", [5, 7, 1, 2], "Gains +1 {Might} Might and +1 {Power} Fear whenever damaged", "{Unlit} Unlit, {Souls} Souls"));
// 	card_deck.push(new Monster_Card("Poltergeist", "Spirit", [5, 5, 2, 3], "Attacks all heroes in this room", "{Unlit} Unlit, {Wisdom} Will damage"));
// 	card_deck.push(new Monster_Card("Firebeast", "Demon", [5, 5, 3, 2], "Attacks all heroes in this room", "{Unlit} Unlit, {Health} Health damage"));
// 	card_deck.push(new Monster_Card("Windbeast", "Demon", [5, 5, 3, 3], "Shoves target one room whenever it damages an enemy", "Unexplored, else {Unlit} Unlit"));
// 	// card_deck.push(new Monster_Card("Lurker", "Demon", [5, 5, 3, 3], "Attracts adjacent enemies whenever it damages an enemy", "Unexplored, else {Unlit} Unlit"));
// 	card_deck.push(new Monster_Card("Bloodthurster", "Demon", [4, 6, 4, 2], "Summoned on death, immediately attack all Heroes in room", "On Death"));
// 	card_deck.push(new Monster_Card("Nightmare", "Spirit", [6, 4, 2, 4], "Summoned on terrify, immediately attack all Heroes in room", "On Terrify"));
// 	// card_deck.push(new Monster_Card("Siren", "Spirit", [4, 6, 3, 2], "Adjacent Heroes must enter room, attacks Heroes on entry", "(Leaving) {Souls} Souls"));
// 	// card_deck.push(new Monster_Card("Horror", "Unholy", [6, 4, 2, 3], "Heroes flee the room if able, attacks heroes on exit", "(Leaving) {Bones} Bones"));
	
// 	// Monsters (Rev 2)
// 	card_deck.push(new Monster_Card("Bone Shooter", "Unholy", [4, 6, 4, 2], "May attack a Hero in an adjacent room", "{Unlit} Unlit"));
// 	card_deck.push(new Monster_Card("Flamebreath", "Demon", [6, 4, 2, 4], "May attack a Hero in an adjacent room", "{Unlit} Unlit"));
// 	card_deck.push(new Monster_Card("Phantom", "Spirit", [5, 4, 2, 1], "Gains +1 {Power} Fear and +1 {Wisdom} Will whever a room is explored, +1 when defending in a room with multiple Heroes", "Unexplored, else {Unlit} Unlit"));
// 	card_deck.push(new Monster_Card("Horror", "Spirit", [4, 5, 1, 2], "Gains +1 {Might} Might and +1 {Health} Health whenever a room is explored, +1 when defending in a room with multiple Heroes", "Unexplored, else {Unlit} Unlit"));
// 	card_deck.push(new Monster_Card("Bloodsucker", "Unholy", [5, 5, 3, 2], "Gains +1 {Health} Health or +1 {Wisdom} Will whenever it deals {Damage} Damage, +1 when attacking in a room with multiple Heroes", "{Unlit} Unlit, {Bones} Bones"));
// 	card_deck.push(new Monster_Card("Shade", "Spirit", [4, 4, 2, 3], "Gains +1 {Health} Health or +1 {Wisdom} Will whenever it deals {Damage} Damage, +1 when attacking in a room with a single Hero", "{Unlit} Unlit, {Souls} Souls"));
// 	card_deck.push(new Monster_Card("Doppelganger", "Demon", ["-", "-", "-", "-"], "Gains the stats of the Hero who triggered the event, may absorb animated {Armour} Armour for +1 to all stats", "{Unlit} Unlit"));
// 	card_deck.push(new Monster_Card("Ghoul", "Unholy", [6, 4, 3, 2], "Drops a {Bones} Bones whenever it deals 2 or more {Damage} Damage, when it kills a Hero, and when it dies", "Unexplored, else {Unlit} Unlit"));
// 	card_deck.push(new Monster_Card("Soul Eater", "Spirit", [4, 6, 2, 3], "Drops a {Souls} Souls whenever it deals 2 or more {Damage} Damage, when it kills a Hero, and when it dies", "Unexplored, else {Unlit} Unlit"));
// 	card_deck.push(new Monster_Card("Bat Swarm", "Unholy", [4, 6, 2, 2], "Acts twice per turn", "{Unlit} Unlit, {Health} Health damage"));
// 	card_deck.push(new Monster_Card("Imp Horde", "Demon", [6, 4, 2, 2], "Acts twice per turn", "{Unlit} Unlit, {Wisdom} Will damage"));
// 	card_deck.push(new Monster_Card("Lurker", "Demon", [4, 6, 3, 2], "May move to any {Unlit} Unlit room when it moves, attacks when it moves or a Hero enters the room", "{Unlit} Unlit, {Health} Health damage"));
// 	card_deck.push(new Monster_Card("Haunted", "Spirit", [6, 4, 2, 3], "May move to any {Unlit} Unlit room when it moves, attacks when it moves or a Hero enters the room", "{Unlit} Unlit, {Wisdom} Will damage"));
// 	card_deck.push(new Monster_Card("Devourer", "Demon", [7, 5, 4, 3], "Remove 1 {Bones} Bones and 1 {Souls} Souls to summon. Once per turn when it deals {Damage} Damage, it may attack again", "1 {Bones} Bones, 1 {Souls} Souls"));
// 	card_deck.push(new Monster_Card("Abomination", "Unholy", [5, 7, 3, 4], "Remove 1 {Bones} Bones and 1 {Souls} Souls to summon. Once per turn when it deals {Damage} Damage, it may attack again", "1 {Bones} Bones, 1 {Souls} Souls"));
// 	card_deck.push(new Monster_Card("Inferno", "Demon", [5, 5, 4, 4], "Suffer 1 {Damage} Damage whenever you attack", "{Unlit} Unlit"));
// 	card_deck.push(new Monster_Card("Plaguebearer", "Unholy", [5, 5, 3, 3], "Destroy an item card the target has whenever you deal {Damage} Damage", "{Unlit} Unlit"));
	
// 	// Rev 2.5
// 	card_deck.push(new Monster_Card("Ancient Zyme", "Unholy", [6, 6, 2, 2], "May deal 1 {Health} Health damage to all Heroes in the room instead of attacking, moves with Heroes", "{Unlit} Unlit, full {Health} Health"));
// 	card_deck.push(new Monster_Card("Silent Watcher", "Spirit", [6, 6, 2, 2], "May deal 1 {Wisdom} Will damage to all Heroes in the room instead of attacking, moves with Heroes", "{Unlit} Unlit, full {Wisdom} Will"));
// 	card_deck.push(new Monster_Card("Harbinger", "Demon", [4, 4, 3, 2], "Cannot be attacked by a Hero without an item", "{Unlit} Unlit"));
// 	card_deck.push(new Monster_Card("Ancinet Lich", "Unholy", [4, 4, 2, 3], "Cannot be attacked by a Hero without an item", "{Unlit} Unlit"));
// 	card_deck.push(new Monster_Card("Nightgaunt", "Spirit", [6, 4, 3, 2], "Makes one adjacent unoccupied room {Unlit} Unlit per turn, +1 {Might} Might when adjacent to an unexplored room", "Unexplored, else {Unlit} Unlit"));
// 	card_deck.push(new Monster_Card("Fell Rider", "Demon", [4, 6, 2, 3], "+1 {Power} Fear in room with {Armour} Armour, May suffer 2 {Damage} Damage to animate {Armour} Armour in room", "{Unlit} Unlit, {Armour} Armour"));
	
// 	card_deck.push(new Monster_Card("Armour", "Armour", [3, 3, 3, 3], "Becomes {Armour} Armour token on death", "N/A"));
// 	card_deck.push(new Monster_Card("Armour", "Armour", [3, 3, 3, 3], "Becomes {Armour} Armour token on death", "N/A"));
// 	card_deck.push(new Monster_Card("Armour", "Armour", [3, 3, 3, 3], "Becomes {Armour} Armour token on death", "N/A"));
// 	card_deck.push(new Monster_Card("Armour", "Armour", [3, 3, 3, 3], "Becomes {Armour} Armour token on death", "N/A"));
	
// 	card_deck.push(new Monster_Card_Special("Vampire", [8, 6, 6, 3], "Attacks all 4 on spawn. Flees when it takes {Damage} Damage. May become Bat when fleeing, retaining damage. Three possible locations. Attacks all 2 when found."));
// 	card_deck.push(new Monster_Card_Special("Vampire Bat", [6, 8, 3, 6], "Attacks all 4 on spawn. Flees when it takes {Damage} Damage. May become Vampire when fleeing, retaining damage. Three possible locations. Attacks all 2 when found."));
    
// 	cards_per_page = 16;
// };
// function generate_event_evil_deck() {
// 	// card_deck = [];
	
// 	card_deck.push(new Event_Card("Clattering Weapons", "Suffer a {Might} Might 4 attack. If damaged, animate {Armour} Armour in this room.", true));
// 	card_deck.push(new Event_Card("Gaping Wounds", "Suffer a {Might} Might 4 attack. Add {Bones} Bones to this room.", true));
// 	card_deck.push(new Event_Card("Bite", "Suffer a {Might} Might 5 attack. If damaged, lose an item.", true));
// 	card_deck.push(new Event_Card("Collapsing Roof", "All heroes within 2 rooms suffer a {Might} Might 3 attack.", true));
// 	card_deck.push(new Event_Card("Swarming Spiders", "Suffer a {Might} Might 4 attack. +1 {Might} Might if this room was unexplored.", true));
// 	card_deck.push(new Event_Card("Corpse", "Remove 1 {Bones} Bones to suffer a {Might} Might 6 attack.", true));
// 	card_deck.push(new Event_Card("Rattling Armour", "Suffer a {Power} Fear 4 attack. If damaged, animate {Armour} Armour in this room.", true));
// 	card_deck.push(new Event_Card("Scream", "Suffer a {Power} Fear 4 attack. Add {Souls} Souls to this room.", true));
// 	card_deck.push(new Event_Card("Footsteps", "Suffer a {Power} Fear 5 attack. If damaged, lose an item.", true));
// 	card_deck.push(new Event_Card("Lightning", "All heroes within 2 rooms suffer a {Power} Fear 3 attack.", true));
// 	card_deck.push(new Event_Card("Moving Pictures", "Suffer a {Power} Fear 4 attack. +1 {Power} Fear if this room was unexplored.", true));
// 	card_deck.push(new Event_Card("Ghostly Visions", "Remove 1 {Souls} Souls to suffer a {Power} Fear 6 attack.", true));
// 	card_deck.push(new Event_Card("Pitfall", "Suffer 2 {Damage} Damage.", true));
// 	card_deck.push(new Event_Card("Grasping Hands", "Suffer 1 {Damage} Damage. Lose an item.", true));
// 	card_deck.push(new Event_Card("Unseen Horror", "Roll a check of 3+ or lose all {Wisdom} Will.", true));
// 	card_deck.push(new Event_Card("Grim Reaper", "Roll a check of 3+ or lose all {Health} Health.", true));
// 	card_deck.push(new Event_Card("Creaking Floorboards", "All monsters may move 1 room closer to this room.", true));
// 	card_deck.push(new Event_Card("Shattered Vase", "Any monster may move to this room and immediately perform a {Might} Might 3 attack.", true));
// 	card_deck.push(new Event_Card("Tumbled Shelves", "Any monster may move to this room and immediately perform a {Power} Fear 3 attack.", true));
// 	card_deck.push(new Event_Card("Living Shadows", "All Heroes in this room flee 1 room in any direction of your choice.", true));
// 	card_deck.push(new Event_Card("Magic Mirror", "Place Hero in an explored room of your choice.", true));
// 	card_deck.push(new Event_Card("Shadowy Gloom", "All Heroes in this room are convinced this room is a dead end.", true));
// 	card_deck.push(new Event_Card("A Knock on the Door", "All Heroes on the board flee 1 room toward the entrance.", true));
// 	card_deck.push(new Event_Card("Locks Click", "Heroes cannot enter or leave this room for 2 turns.", true));
// 	card_deck.push(new Event_Card("Candles Extinguished", "All rooms adjacent to {Unlit} Unlit rooms become {Unlit} Unlit. All Heroes adjacent to an unexplored room suffer a {Might} Might 2 attack.", true));
// 	card_deck.push(new Event_Card("Ghostly Voices", "Animate {Armour} Armour in this room. It gains +1 {Power} Fear and +1 {Wisdom} Will.", true));
// 	card_deck.push(new Event_Card("Stench of Death", "Animate {Armour} Armour in this room. It gains +1 {Might} Might and +1 {Health} Health.", true));
// 	card_deck.push(new Event_Card("Cursed Sigil", "Animate {Armour} Armour in this room. It gains +3 on its next attack.", true));

// 	card_deck.push(new Event_Card("Clouds of Dust", "Nearest monster performs a {Power} Fear 4 attack against all in its room.", true));
// 	card_deck.push(new Event_Card("Bloody Footsteps", "Nearest monster performs a {Might} Might 6 attack.", true));
// 	card_deck.push(new Event_Card("Grinning Imps", "Nearest monster gains +4 on its next attack.", true));

// 	card_deck.push(new Event_Card("Angered Guardian", "Animate {Armour} Armour in this room. It immediately performs a {Might} Might 3 attack.", true));
// 	card_deck.push(new Event_Card("Awakened Protector", "Animate {Armour} Armour in this room. It immediately performs a {Power} Fear 3 attack.", true));
// 	card_deck.push(new Event_Card("Disturbed Santuary", "Animate nearest {Armour} Armour. It gains +1 {Health} Health and +1 {Wisdom} Will.", true));
// 	card_deck.push(new Event_Card("Marching Footsteps", "Animate {Armour} Armour of choice.", true));
// 	card_deck.push(new Event_Card("Bugle Call", "Nearest animated {Armour} Armour gains +3 {Health} Health and +3 {Wisdom} Will.", true));
// 	card_deck.push(new Event_Card("Echoing Battle Cry", "All animated {Armour} Armour in the house attack a Hero.", true));
// 	card_deck.push(new Event_Card("Ghostly Screams", "All {Spirit} Spirits in the house attack a Hero.", true));
// 	card_deck.push(new Event_Card("Beastly Snarls", "All {Unholy} Unholy in the house attack a Hero.", true));
// 	card_deck.push(new Event_Card("Inhuman Roar", "All {Demon} Demons in the house attack a Hero.", true));
	
// 	// Rev 2 (duplications)
// 	card_deck.push(new Event_Card("Gaping Wounds", "Suffer a {Might} Might 4 attack. Add {Bones} Bones to this room.", true));
// 	card_deck.push(new Event_Card("Scream", "Suffer a {Power} Fear 4 attack. Add {Souls} Souls to this room.", true));
// 	card_deck.push(new Event_Card("Shattered Vase", "Any monster may move to this room and immediately perform a {Might} Might 3 attack.", true));
// 	card_deck.push(new Event_Card("Tumbled Shelves", "Any monster may move to this room and immediately perform a {Power} Fear 3 attack.", true));
// 	card_deck.push(new Event_Card("Darkness Envelops", "All rooms adjacent to {Unlit} Unlit rooms become {Unlit} Unlit. All Heroes adjacent to an unexplored room suffer a {Power} Fear 2 attack.", true));
// 	card_deck.push(new Event_Card("A Tap on the Shoulder", "Suffer a {Power} Fear 6 attack", true));
// 	card_deck.push(new Event_Card("Looming Shadow", "Suffer a {Might} Might 6 attack", true));
// 	card_deck.push(new Event_Card("A Tap on the Shoulder", "Suffer a {Power} Fear 6 attack", true));
// 	card_deck.push(new Event_Card("Looming Shadow", "Suffer a {Might} Might 6 attack", true));
	
// 	// Rev 2 (added)
// 	card_deck.push(new Event_Card("Noises in the Dark", "All Heroes in this room attack other Heroes.", true));
// 	card_deck.push(new Event_Card("Mind Control", "This Hero is controlled by the Vampire player for thee rounds.", true));
// 	card_deck.push(new Event_Card("Noxious Fumes", "This Hero attacks itself.", true));
// 	card_deck.push(new Event_Card("Rat Infestation", "All Heroes in this room and all adjacent suffer a {Might} Might 4 attack. -2 {Might} Might in {Lit} Lit rooms.", true));
// 	card_deck.push(new Event_Card("Spirits Arise", "All Heroes in this room and all adjacent suffer a {Power} Fear 4 attack. -2 {Power} Fear in {Lit} Lit rooms.", true));
// 	card_deck.push(new Event_Card("Panicked Stampede", "All Heroes in this room and all adjacent suffer a {Might} Might 2X attack, where X is the number of Heroes in this room and all adjacent.", true));
// 	card_deck.push(new Event_Card("Spreading Panic", "All Heroes in this room and all adjacent suffer a {Power} Fear 2X attack, where X is the number of Heroes in this room and all adjacent.", true));
// 	card_deck.push(new Event_Card("Spirits of the Dead", "All Heroes in the house suffer a {Might} Might 2 attack.", true));
// 	card_deck.push(new Event_Card("Groans from the Walls", "All Heroes in the house suffer a {Power} Fear 2 attack.", true));
// 	card_deck.push(new Event_Card("Corrosion", "All Heroes in this room lose an item the next time they take {Damage} Damage.", true));
// 	card_deck.push(new Event_Card("Twisted Metal", "Suffer a {Might} Might 4 attack. Lose an item.", true));
// 	card_deck.push(new Event_Card("Possession", "Suffer a {Power} Fear 4 attack. Lose an item.", true));
    
// 	cards_per_page = 16;
// };
// function generate_item_feature_totem_evil_deck() {
// 	// card_deck = [];
	
// 	card_deck.push(new Item_Card("Ancient Breastplate", "Hero is immune to {Health} Health damage. Hero has -2 {Wisdom} Will.", ". It cannot be dropped or traded.", true));
// 	card_deck.push(new Item_Card("Coward's Ring", "Hero gains +2 {Health} Health and +1 {Wisdom} Will. Hero never attacks.", ". It cannot be dropped or traded.", true));
// 	card_deck.push(new Item_Card("Berserker's Blade", "Hero gains +3 {Might} Might. Hero always attacks if able. Hero suffers {Damage} Damage equal to that it deals to enemies.", ". It cannot be dropped or traded.", true));
// 	card_deck.push(new Item_Card("Sword of Boasting", "Hero gains +1 {Might} Might and +1 {Power} Blast. Hero suffers 2 {Damage} Damage extra whenever it is damaged.", ". It cannot be dropped or traded.", true));
// 	card_deck.push(new Item_Card("Tome of Caution", "Hero cannot explore new rooms. Hero suffers 2 {Damage} Damage whenever a monster enters their room.", ". It cannot be dropped or traded.", true));
// 	card_deck.push(new Item_Card("Ancient Helm", "Hero is immune to {Wisdom} Will damage. Hero becomes animated {Armour} Armour on Death.", ". It cannot be dropped or traded.", true));
// 	card_deck.push(new Item_Card("Orb of Power", "Hero gains +3 {Power} Blast. Hero always attacks if able. Whenever they kill an enemy, they also kill the nearest Hero.", ". It cannot be dropped or traded.", true));
// 	card_deck.push(new Item_Card("Cursed Chalice", "Hero gains +2 {Health} Health, +2 {Wisdom} Will, +1 {Might} Might, and +1 {Power} Blast. This Hero dies when it takes {Damage} Damage.", ". It cannot be dropped or traded.", true));
// 	card_deck.push(new Item_Card("Demon Sword", "Hero is controlled by the Vampire player. Cannot be played on a Champion or Knight.", ". It cannot be dropped or traded.", true));
// 	card_deck.push(new Item_Card("Vandal's Mace", "Hero always attacks, When this Hero attacks, it suffers 1 {Damage} Damage and destroys an item (other than this one) held by itself or a Hero in the room.", ". It cannot be dropped or traded.", true));
    
// 	card_deck.push(new Feature_Card("Haunted Shelves", "+2 {Power} Fear to monster attacks in this room, +1 {Power} Fear to monster attacks in adjacent rooms.", true));
// 	card_deck.push(new Feature_Card("Bloodied Walls", "+2 {Might} Might to monster attacks in this room, +1 {Might} Might to monster attacks in adjacent rooms.", true));
// 	card_deck.push(new Feature_Card("Ancient Armoury", "Animated {Armour} Armour cannot be damaged in this room.", true));
// 	card_deck.push(new Feature_Card("Howling Banshee", "Heroes must roll a check of 3+ to enter this room, else lose their move.", true));
// 	card_deck.push(new Feature_Card("Crumbling Architecture", "Heroes must roll a check of 3+ when entering, else suffer 2 {Damage} Damage.", true));
// 	card_deck.push(new Feature_Card("Impenetrable Mist", "This room is always {Unlit} Unlit and counts as unexplored. Heroes consider it a dead end as long as another path exists.", true));
// 	card_deck.push(new Feature_Card("Sickening Miasma", "Heroes in this room and adjacent rooms take 1 {Damage} Damage every round.", true));
// 	card_deck.push(new Feature_Card("Pit of Souls", "This room always counts as having 2 {Bones} Bones and 2 {Souls} Souls.", true));
// 	card_deck.push(new Feature_Card("Prowling Spirits", "Heroes in this room and one adjacent room must roll a check of 2+ each turn, else be controlled by the Vampire player for 1 turn.", true));
// 	card_deck.push(new Feature_Card("Accursed Symbols", "Adventurer items have no effect in this room and in one adjacent room.", true));
    
// 	card_deck.push(new Totem_Card("Cursed Statue", "All monsters in the house gain +1 {Health} Health and +1 {Wisdom} Will.", "It has 4 {Health} Health and infinite {Wisdom} Will.", true));
// 	card_deck.push(new Totem_Card("Horn of Command", "Every other turn, animate nearest {Armour} Armour.", "It has 4 {Health} Health and infinite {Wisdom} Will.", true));
// 	card_deck.push(new Totem_Card("Mocking Skull", "All monsters deal +1 {Damage} Damage whenever they damage a Hero.", "It has 4 {Health} Health and infinite {Wisdom} Will.", true));
// 	card_deck.push(new Totem_Card("Torturer's Tools", "Every turn, 1 {Bones} Bones or 1 {Souls} Souls may be sacrificed to perform a {Might} Might 4 or {Power} Fear 4 attack, respectively, in that room.", "It has 4 {Health} Health and infinite {Wisdom} Will.", true));
// 	card_deck.push(new Totem_Card("Crystal Orb", "Every other turn, the Vampire player may choose 1 Hero to control as if it were a monster.", "It has 4 {Health} Health and infinite {Wisdom} Will.", true));
    
// 	cards_per_page = 16;
// };
// function generate_event_good_deck() {
// 	// card_deck = [];
	
// 	card_deck.push(new Event_Card("Bandages", "Regain either 2 {Health} Health or 2 {Wisdom} Will (cannot exceed starting value).", false));
// 	card_deck.push(new Event_Card("Brief Rest", "Roll a check of 2+ to regain either 3 {Health} Health or 3 {Wisdom} Will (cannot exceed starting value).", false));
// 	card_deck.push(new Event_Card("Pot Lid", "Gain +2 against the next attack.", false));
// 	card_deck.push(new Event_Card("Rations", "All Heroes in the room regain either 1 {Health} Health or 1 {Wisdom} Will (cannot exceed starting value).", false));
// 	card_deck.push(new Event_Card("Burst of Song", "Regain either 2 {Health} Health or 2 {Wisdom} Will (cannot exceed starting value).", false));
// 	card_deck.push(new Event_Card("Short Respite", "Roll a check of 2+ to regain either 3 {Health} Health or 3 {Wisdom} Will (cannot exceed starting value).", false));
// 	card_deck.push(new Event_Card("Lantern", "Gain +2 against the next attack.", false));
// 	card_deck.push(new Event_Card("Narrow Escape", "Counter an Evil event which has just been played.", false));
// 	card_deck.push(new Event_Card("Narrow Escape", "Counter an Evil event which has just been played.", false));
// 	card_deck.push(new Event_Card("Narrow Escape", "Counter an Evil event which has just been played.", false));
// 	card_deck.push(new Event_Card("Extinguish Torches", "Apply an Evil event which has just been played to the nearest monster instead.", false));
// 	card_deck.push(new Event_Card("Extinguish Torches", "Apply an Evil event which has just been played to the nearest monster instead.", false));
// 	card_deck.push(new Event_Card("Extinguish Torches", "Apply an Evil event which has just been played to the nearest monster instead.", false));
// 	card_deck.push(new Event_Card("Appeased Spirits", "Remove all {Souls} Souls from this room.", false));
// 	card_deck.push(new Event_Card("Bury the Dead", "Remove all {Bones} Bones from this room.", false));
// 	card_deck.push(new Event_Card("Purging by Fire", "Remove an Evil Feature in this room.", false));
// 	card_deck.push(new Event_Card("Good Omen", "This Hero is immune to the next Evil event which would affect it.", false));
// 	card_deck.push(new Event_Card("Rust of Ages", "Remove all unanimated {Armour} Armour from this room.", false));
// 	card_deck.push(new Event_Card("Silent Halls", "No monsters may be summoned for two turns.", false));
// 	card_deck.push(new Event_Card("Boisterous Reveling", "Nearest monster must flee two rooms away.", false));
// 	card_deck.push(new Event_Card("Show of Bravado", "All monsters within two rooms must flee one room away.", false));
// 	card_deck.push(new Event_Card("Makeshift Barricade", "Monsters may not enter this room for two turns.", false));
// 	card_deck.push(new Event_Card("Ray of Sunrise", "All rooms adjacent to {Lit} Lit rooms become {Lit} Lit. All monsters in {Lit} rooms suffer a {Might} Might 2 attack.", false));
// 	card_deck.push(new Event_Card("Curtains Flutter", "All rooms adjacent to {Lit} Lit rooms become {Lit} Lit. All monsters in {Lit} rooms suffer a {Power} Blast 2 attack.", false));
// 	card_deck.push(new Event_Card("Blazing Torches", "All rooms adjacent to Heroes become {Lit} Lit. Reveal all unexplored rooms adjacent to Heroes.", false));
// 	card_deck.push(new Event_Card("Call to Arms", "All Heroes in the house may perform an attack immediately.", false));
// 	card_deck.push(new Event_Card("Sneak Attack", "The nearest monster suffers a {Might} Might 4 attack.", false));
// 	card_deck.push(new Event_Card("Torchlight", "The nearest monster suffers a {Power} Blast 4 attack.", false));
// 	card_deck.push(new Event_Card("Succumb to Rust", "Destroy nearest animated {Armour} Armour.", false));
// 	card_deck.push(new Event_Card("Disarm Foe", "A monster within one room gains -2 on all attacks for 2 turns.", false));
// 	card_deck.push(new Event_Card("Dancing Lights", "A monster within one room is stunned and cannot act for 1 turn.", false));
// 	card_deck.push(new Event_Card("Dusty Blade", "Gain +3 on your next attack.", false));
// 	card_deck.push(new Event_Card("Aged Arms", "All Heroes in this room gain +2 on their next attack.", false));
// 	card_deck.push(new Event_Card("Premonition", "All Heroes in this room may move to an adjacent explored room.", false));
// 	card_deck.push(new Event_Card("Strategic Withdrawal", "Heroes in this room may move 2 rooms toward the entrance.", false));
// 	card_deck.push(new Event_Card("Peaceful Rooms", "Heroes in this room may explore another room this turn.", false));
// 	card_deck.push(new Event_Card("Secret Passage", "Place this Hero in an explored room of choice.", false));
	
// 	// Rev 2 (duplications mainly)
// 	card_deck.push(new Event_Card("Desperate Charge", "This Hero moves to an adjacent room. Kill this Hero and one monster in that room.", false));
// 	card_deck.push(new Event_Card("Desperate Charge", "This Hero moves to an adjacent room. Kill this Hero and one monster in that room.", false));
// 	card_deck.push(new Event_Card("Bandages", "Regain either 2 {Health} Health or 2 {Wisdom} Will (cannot exceed starting value).", false));
// 	card_deck.push(new Event_Card("Appeased Spirits", "Remove all {Souls} Souls from this room.", false));
// 	card_deck.push(new Event_Card("Bury the Dead", "Remove all {Bones} Bones from this room.", false));
// 	card_deck.push(new Event_Card("Show of Bravado", "All monsters within two rooms must flee one room away.", false));
// 	card_deck.push(new Event_Card("Call to Arms", "All Heroes in the house may perform an attack immediately.", false));
// 	card_deck.push(new Event_Card("Sneak Attack", "The nearest monster suffers a {Might} Might 4 attack.", false));
// 	card_deck.push(new Event_Card("Torchlight", "The nearest monster suffers a {Power} Blast 4 attack.", false));
// 	card_deck.push(new Event_Card("Disarm Foe", "A monster within one room gains -2 on all attacks for 2 turns.", false));
// 	card_deck.push(new Event_Card("Artifact Recovered", "All monsters suffer a {Might} Might 2 attack.", false));
// 	card_deck.push(new Event_Card("Friendly Spirits", "All monsters suffer a {Power} Blast 2 attack.", false));
// 	card_deck.push(new Event_Card("Aged Arms", "All Heroes in this room gain +2 on their next attack.", false));
// 	card_deck.push(new Event_Card("Peaceful Rooms", "Heroes in this room may explore another room this turn.", false));
// 	card_deck.push(new Event_Card("Secret Passage", "Place this Hero in an explored room of choice.", false));
    
// 	cards_per_page = 16;
// };
// function generate_item_good_deck() {
// 	// card_deck = [];
	
// 	card_deck.push(new Item_Card("Breastplate", "Gain +1 against attacks while you have this item.", " unless dropped or traded.", false));
// 	card_deck.push(new Item_Card("Ring Mail", "Gain +1 {Health} Health while you have this item.", " unless dropped or traded.", false));
// 	card_deck.push(new Item_Card("Healing Herbs", "Regain 2 {Health} Health immediately the first time you hit 0 {Health} Health, then discard this item.", " unless dropped or traded.", false));
// 	card_deck.push(new Item_Card("Smelling Salts", "Regain 2 {Wisdom} Will immediately the first time you hit 0 {Wisdom} Will, then discard this item.", " unless dropped or traded.", false));
// 	card_deck.push(new Item_Card("Amulet", "Gain +1 against attacks while you have this item.", " unless dropped or traded.", false));
// 	card_deck.push(new Item_Card("Lucky Charm", "Gain +1 {Wisdom} Will while you have this item.", " unless dropped or traded.", false));
// 	card_deck.push(new Item_Card("Plate Armour", "Take 1 less {Damage} Damage from all sources, to a minimum of 1.", " unless dropped or traded.", false));
// 	card_deck.push(new Item_Card("Helmet", "Attacks against you triggered by events gain a -2 penalty.", " unless dropped or traded.", false));
// 	card_deck.push(new Item_Card("Cloak of Stealth", "Whenever affected by an event, roll a check of 3+ to ignore the event.", " unless dropped or traded.", false));
// 	card_deck.push(new Item_Card("Grapple", "You may ignore the effects of rooms.", " unless dropped or traded.", false));
// 	card_deck.push(new Item_Card("Ring of Tranquility", "You may ignore the effects of Evil features.", " unless dropped or traded.", false));
// 	card_deck.push(new Item_Card("Knight's Shield", "You are immune to all attacks from animated {Armour} Armour.", " unless dropped or traded.", false));
// 	card_deck.push(new Item_Card("Iron Boots", "You are immune to all forced movement.", " unless dropped or traded.", false));
// 	card_deck.push(new Item_Card("Ring of Warding", "Monsters may never be summoned in this room.", " unless dropped or traded.", false));
// 	// card_deck.push(new Item_Card("Amulet of Protection", "All attacks made by {Spirit} Spirits in this room gain a -2 penalty.", " unless dropped or traded.", false));
// 	// card_deck.push(new Item_Card("Enchanted Blade", "Gain +2 on all attacks against {Spirit} Spirits.", " unless dropped or traded.", false));
// 	// card_deck.push(new Item_Card("Symbol of Power", "{Spirit} Spirits cannot enter this room.", " unless dropped or traded.", false));
// 	// card_deck.push(new Item_Card("Amulet of Protection", "All attacks made by {Unholy} Unholy in this room gain a -2 penalty.", " unless dropped or traded.", false));
// 	// card_deck.push(new Item_Card("Enchanted Blade", "Gain +2 on all attacks against {Unholy} Unholy.", " unless dropped or traded.", false));
// 	// card_deck.push(new Item_Card("Symbol of Power", "{Unholy} Unholy cannot enter this room.", " unless dropped or traded.", false));
// 	// card_deck.push(new Item_Card("Amulet of Protection", "All attacks made by {Demon} Demons in this room gain a -2 penalty.", " unless dropped or traded.", false));
// 	// card_deck.push(new Item_Card("Enchanted Blade", "Gain +2 on all attacks against {Demon} Demons.", " unless dropped or traded.", false));
// 	// card_deck.push(new Item_Card("Symbol of Power", "{Demon} Demons cannot enter this room.", " unless dropped or traded.", false));
// 	card_deck.push(new Item_Card("Valiant Sword", "You may retaliate whenever you or another Hero in this room takes {Damage} Damage.", " unless dropped or traded.", false));
// 	card_deck.push(new Item_Card("Battleaxe", "Gain either +1 {Might} Might or +1 {Power} Blast whenever you deal {Damage} Damage to a monster.", " unless dropped or traded.", false));
// 	card_deck.push(new Item_Card("Hunter's Bow", "You may attack monsters in adjacent rooms.", " unless dropped or traded.", false));
// 	card_deck.push(new Item_Card("Orb of Power", "You may force a monster to leave the room instead of attacking.", " unless dropped or traded.", false));
// 	card_deck.push(new Item_Card("Hunter's Net", "You may cause a monster to have a -2 penalty on all attacks for 2 turns instead of attacking.", " unless dropped or traded.", false));
// 	card_deck.push(new Item_Card("Sword of Courage", "Gain either +1 {Health} Health or +1 {Wisdom} Will whenever you deal {Damage} Damage to a monster.", " unless dropped or traded.", false));
// 	card_deck.push(new Item_Card("Boots of Haste", "You may move twice per turn, but you may only explore one room per turn.", " unless dropped or traded.", false));
// 	card_deck.push(new Item_Card("Boots of Dashing", "You may move through 3 {Lit} Lit rooms as one move.", " unless dropped or traded.", false));
// 	card_deck.push(new Item_Card("Cloak of Power", "Gain +1 {Might} Might and +1 {Power} Blast while you are damaged.", " unless dropped or traded.", false));
// 	card_deck.push(new Item_Card("Gauntlets of Force", "Gain +1 {Might} Might whenever you take {Damage} Damage.", " unless dropped or traded.", false));
// 	card_deck.push(new Item_Card("Book of Knowledge", "Gain +1 {Power} Blast whenever you take {Damage} Damage.", " unless dropped or traded.", false));
// 	card_deck.push(new Item_Card("Halberd", "You may attack whenever you move or a monster enters this room.", " unless dropped or traded.", false));
// 	card_deck.push(new Item_Card("Ring of Poise", "Gain +2 to the total of all checks.", " unless dropped or traded.", false));
// 	card_deck.push(new Item_Card("Mace of Might", "Gain +2 {Might} Might and +1 {Power} Blast while you have this item.", " unless dropped or traded.", false));
// 	card_deck.push(new Item_Card("Ancient Tome", "Gain +2 {Power} Blast and +1 {Might} Might while you have this item.", " unless dropped or traded.", false));
	
// 	card_deck.push(new Special_Item_Card("The Charm", "The Vampire may only ever deal 1 {Damage} Damage to you at once.", " unless dropped or traded.", false));
// 	card_deck.push(new Special_Item_Card("The Sword", "Whenever you attack the Vampire, consider your {Might} Might to be equal to the Vampire's {Health} Health and your {Power} Blast to be equal to the Vampire's {Wisdom} Will.", " unless dropped or traded.", false));
    
// 	cards_per_page = 16;
// };
// function generate_hero_deck() {
// 	// card_deck = [];
	
// 	card_deck.push(new Hero_Card("Ranger", "Novice", [3, 3, 2, 3], "May perform a {Might} Might 2 or {Power} Blast 2 attack when you move or a monster enters the room."));
// 	card_deck.push(new Hero_Card("Ranger", "Novice", [3, 3, 2, 3], "May perform a {Might} Might 2 or {Power} Blast 2 attack when you move or a monster enters the room."));
// 	card_deck.push(new Hero_Card("Guard", "Novice", [3, 3, 3, 2], "May retaliate whenever you take 2 {Damage} Damage or more."));
// 	card_deck.push(new Hero_Card("Guard", "Novice", [3, 3, 3, 2], "May retaliate whenever you take 2 {Damage} Damage or more."));
// 	card_deck.push(new Hero_Card("Rogue", "Novice", [3, 3, 3, 3], "May carry 2 additional items."));
// 	card_deck.push(new Hero_Card("Rogue", "Novice", [3, 3, 3, 3], "May carry 2 additional items."));
// 	card_deck.push(new Hero_Card("Rogue", "Novice", [3, 3, 3, 3], "May carry 2 additional items."));
// 	card_deck.push(new Hero_Card("Warrior", "Novice", [4, 3, 2, 2], "Ignores critical hits (rolls of 0 when defending)."));
// 	card_deck.push(new Hero_Card("Warrior", "Novice", [4, 3, 2, 2], "Ignores critical hits (rolls of 0 when defending)."));
// 	card_deck.push(new Hero_Card("Mage", "Novice", [3, 4, 1, 3], "When affected by an event, roll 1d6. On 6+ you may ignore the event."));
// 	card_deck.push(new Hero_Card("Mage", "Novice", [3, 4, 1, 3], "When affected by an event, roll 1d6. On 6+ you may ignore the event."));
// 	card_deck.push(new Hero_Card("Berserker", "Novice", [2, 3, 4, 2], "Gain +1 on your next attack whenever you take {Damage} Damage."));
// 	card_deck.push(new Hero_Card("Berserker", "Novice", [2, 3, 4, 2], "Gain +1 on your next attack whenever you take {Damage} Damage."));
// 	card_deck.push(new Hero_Card("Monk", "Novice", [3, 2, 2, 4], "Add +1 to the total for all checks."));
// 	card_deck.push(new Hero_Card("Monk", "Novice", [3, 2, 2, 4], "Add +1 to the total for all checks."));
	
// 	card_deck.push(new Hero_Card("Ranger", "Squire", [4, 4, 2, 4], "May perform a {Might} Might 2 or {Power} Blast 2 attack when you move or a monster enters the room."));
// 	card_deck.push(new Hero_Card("Guard", "Squire", [4, 4, 4, 2], "May retaliate whenever you take 2 {Damage} Damage or more."));
// 	card_deck.push(new Hero_Card("Rogue", "Squire", [4, 4, 3, 3], "May carry 2 additional items."));
// 	card_deck.push(new Hero_Card("Rogue", "Squire", [4, 4, 3, 3], "May carry 2 additional items."));
// 	card_deck.push(new Hero_Card("Warrior", "Squire", [5, 4, 3, 2], "Ignores critical hits (rolls of 0 when defending)."));
// 	card_deck.push(new Hero_Card("Warrior", "Squire", [5, 4, 3, 2], "Ignores critical hits (rolls of 0 when defending)."));
// 	card_deck.push(new Hero_Card("Mage", "Squire", [4, 5, 2, 3], "When affected by an event, roll 1d6. On 6+ you may ignore the event."));
// 	card_deck.push(new Hero_Card("Mage", "Squire", [4, 5, 2, 3], "When affected by an event, roll 1d6. On 6+ you may ignore the event."));
// 	card_deck.push(new Hero_Card("Berserker", "Squire", [3, 4, 4, 3], "Gain +1 on your next attack whenever you take {Damage} Damage."));
// 	card_deck.push(new Hero_Card("Berserker", "Squire", [3, 4, 4, 3], "Gain +1 on your next attack whenever you take {Damage} Damage."));
// 	card_deck.push(new Hero_Card("Monk", "Squire", [4, 3, 3, 4], "Add +1 to the total for all checks."));
// 	card_deck.push(new Hero_Card("Monk", "Squire", [4, 3, 3, 4], "Add +1 to the total for all checks."));

// 	card_deck.push(new Hero_Card("Guard", "Knight", [5, 5, 4, 3], "May retaliate whenever you take 2 {Damage} Damage or more."));
// 	card_deck.push(new Hero_Card("Rogue", "Knight", [5, 5, 3, 4], "May carry 2 additional items."));
// 	card_deck.push(new Hero_Card("Warrior", "Knight", [7, 4, 4, 2], "Ignores critical hits (rolls of 0 when defending)."));
// 	card_deck.push(new Hero_Card("Mage", "Knight", [4, 7, 2, 4], "When affected by an event, roll 1d6. On 6+ you may ignore the event."));
// 	card_deck.push(new Hero_Card("Berserker", "Knight", [4, 5, 5, 3], "Gain +1 on your next attack whenever you take {Damage} Damage."));
// 	card_deck.push(new Hero_Card("Monk", "Knight", [5, 4, 3, 5], "Add +1 to the total for all checks."));
// 	card_deck.push(new Hero_Card("Hero", "Knight", [5, 5, 4, 4], "Not very bright."));
// 	card_deck.push(new Hero_Card("Hero", "Knight", [5, 5, 4, 4], "Not very bright."));
// 	card_deck.push(new Hero_Card("Hero", "Knight", [5, 5, 4, 4], "Not very bright."));

// 	card_deck.push(new Hero_Card("Hero", "Champion", [7, 5, 5, 3], "Not very bright."));
// 	card_deck.push(new Hero_Card("Hero", "Champion", [7, 5, 5, 3], "Not very bright."));
// 	card_deck.push(new Hero_Card("Hero", "Champion", [7, 5, 5, 3], "Not very bright."));
// 	card_deck.push(new Hero_Card("Hero", "Champion", [5, 7, 3, 5], "Not very bright."));
// 	card_deck.push(new Hero_Card("Hero", "Champion", [5, 7, 3, 5], "Not very bright."));
// 	card_deck.push(new Hero_Card("Hero", "Champion", [5, 7, 3, 5], "Not very bright."));
    
// 	cards_per_page = 16;
// };
// function generate_room_deck() {
// 	// card_deck = [];
	
// 	card_deck.push(new Room_Card("Crypt", "Vampire Spawns", Basic_Room));
// 	card_deck.push(new Room_Card("Chapel", "Always {Lit} Lit, No Evil, Charm and Sword", Basic_Room));
// 	card_deck.push(new Room_Card("Bedroom", "Vampire: No Ambush, less Flee", Basic_Room));
// 	card_deck.push(new Room_Card("Study", "Vampire: Capped at 4", Basic_Room));
// 	card_deck.push(new Room_Card("Entrance Hall", "Always {Lit} Lit, {Armour} Armour", Basic_Room));
// 	card_deck.push(new Room_Card("Kitchen", "Check of 2+, regain 1 {Health} Health, only one success per Hero", Basic_Room));
// 	card_deck.push(new Room_Card("Dungeon", "{Unlit} Unlit on leave, {Bones} Bones, {Armour} Armour", Basic_Room));
// 	card_deck.push(new Room_Card("Cellar", "{Unlit} Unlit on leave, +1 to numerical effects of Events", Basic_Room));
// 	card_deck.push(new Room_Card("Courtyard", "{Armour} Armour, +1 to {Power} Fear attacks", Basic_Room));
// 	card_deck.push(new Room_Card("Lounge", "+1 {Wisdom} Will when defending", Basic_Room));
// 	card_deck.push(new Room_Card("Garden", "Always {Lit} Lit", Basic_Room));
// 	card_deck.push(new Room_Card("Hallway", "", Basic_Room));
// 	card_deck.push(new Room_Card("Corridor", "{Armour} Armour", Basic_Room));
// 	card_deck.push(new Room_Card("Library", "Check of 2+, regain 1 {Wisdom} Will, only one success per Hero", Basic_Room));
// 	card_deck.push(new Room_Card("Grand Hall", "Always {Lit} Lit, {Armour} Armour, +1 to Hero attacks", Basic_Room));
// 	card_deck.push(new Room_Card("Pantry", "+1 {Health} Health when defending"));
// 	card_deck.push(new Room_Card("Armoury", "{Armour} Armour, +1 to {Might} Might attacks", Basic_Room));
// 	card_deck.push(new Room_Card("Guardroom", "{Armour} Armour", Basic_Room));
// 	card_deck.push(new Room_Card("Balcony", "{Souls} Souls, Check of 2+ on enter/leave, else 1 {Damage} Damage", Basic_Room));
// 	card_deck.push(new Room_Card("Storeroom", "Check of 2+ to enter/leave", Basic_Room));
// 	card_deck.push(new Room_Card("Workshop", "{Armour} Armour", Basic_Room));
// 	card_deck.push(new Room_Card("Vault", "Contains 2 items", Basic_Room));
// 	card_deck.push(new Room_Card("Haunted Gallery", "Always {Unlit} Unlit, Leave: {Might} Might or {Power} Fear 2. Damaged: stay", Basic_Room));
// 	card_deck.push(new Room_Card("Dark Rift", "Always {Unlit} Unlit, Summon waived, attack immediately", Basic_Room));
// 	card_deck.push(new Room_Card("Summoning Circle", "On enter, any monster may move here", Basic_Room));
    
// 	cards_per_page = 9;
// };

// function generate_new_evil_cards() {

// 	// Monsters (Rev 2)
// 	card_deck.push(new Monster_Card("Bone Shooter", "Unholy", [4, 6, 4, 2], "May attack a Hero in an adjacent room", "{Unlit} Unlit"));
// 	card_deck.push(new Monster_Card("Flamebreath", "Demon", [6, 4, 2, 4], "May attack a Hero in an adjacent room", "{Unlit} Unlit"));
// 	card_deck.push(new Monster_Card("Phantom", "Spirit", [5, 4, 2, 1], "Gains +1 {Power} Fear and +1 {Wisdom} Will whever a room is explored, +1 when defending in a room with multiple Heroes", "Unexplored, else {Unlit} Unlit"));
// 	card_deck.push(new Monster_Card("Horror", "Spirit", [4, 5, 1, 2], "Gains +1 {Might} Might and +1 {Health} Health whenever a room is explored, +1 when defending in a room with multiple Heroes", "Unexplored, else {Unlit} Unlit"));
// 	card_deck.push(new Monster_Card("Bloodsucker", "Unholy", [5, 5, 3, 2], "Gains +1 {Health} Health or +1 {Wisdom} Will whenever it deals {Damage} Damage, +1 when attacking in a room with multiple Heroes", "{Unlit} Unlit, {Bones} Bones"));
// 	card_deck.push(new Monster_Card("Shade", "Spirit", [4, 4, 2, 3], "Gains +1 {Health} Health or +1 {Wisdom} Will whenever it deals {Damage} Damage, +1 when attacking in a room with a single Hero", "{Unlit} Unlit, {Souls} Souls"));
// 	card_deck.push(new Monster_Card("Doppelganger", "Demon", ["-", "-", "-", "-"], "Gains the stats of the Hero who triggered the event, may absorb animated {Armour} Armour for +1 to all stats", "{Unlit} Unlit"));
// 	card_deck.push(new Monster_Card("Ghoul", "Unholy", [6, 4, 3, 2], "Drops a {Bones} Bones whenever it deals 2 or more {Damage} Damage, when it kills a Hero, and when it dies", "Unexplored, else {Unlit} Unlit"));
// 	card_deck.push(new Monster_Card("Soul Eater", "Spirit", [4, 6, 2, 3], "Drops a {Souls} Souls whenever it deals 2 or more {Damage} Damage, when it kills a Hero, and when it dies", "Unexplored, else {Unlit} Unlit"));
// 	card_deck.push(new Monster_Card("Bat Swarm", "Unholy", [4, 6, 2, 2], "Acts twice per turn", "{Unlit} Unlit, {Health} Health damage"));
// 	card_deck.push(new Monster_Card("Imp Horde", "Demon", [6, 4, 2, 2], "Acts twice per turn", "{Unlit} Unlit, {Wisdom} Will damage"));
// 	card_deck.push(new Monster_Card("Lurker", "Demon", [4, 6, 3, 2], "May move to any {Unlit} Unlit room when it moves, attacks when it moves or a Hero enters the room", "{Unlit} Unlit, {Health} Health damage"));
// 	card_deck.push(new Monster_Card("Haunted", "Spirit", [6, 4, 2, 3], "May move to any {Unlit} Unlit room when it moves, attacks when it moves or a Hero enters the room", "{Unlit} Unlit, {Wisdom} Will damage"));
// 	card_deck.push(new Monster_Card("Devourer", "Demon", [7, 5, 4, 3], "Remove 1 {Bones} Bones and 1 {Souls} Souls to summon. Once per turn when it deals {Damage} Damage, it may attack again", "1 {Bones} Bones, 1 {Souls} Souls"));
// 	card_deck.push(new Monster_Card("Abomination", "Unholy", [5, 7, 3, 4], "Remove 1 {Bones} Bones and 1 {Souls} Souls to summon. Once per turn when it deals {Damage} Damage, it may attack again", "1 {Bones} Bones, 1 {Souls} Souls"));
// 	card_deck.push(new Monster_Card("Inferno", "Demon", [5, 5, 4, 4], "Suffer 1 {Damage} Damage whenever you attack", "{Unlit} Unlit"));
// 	card_deck.push(new Monster_Card("Plaguebearer", "Unholy", [5, 5, 3, 3], "Destroy an item card the target has whenever you deal {Damage} Damage", "{Unlit} Unlit"));
// 	// Monsters (Rev 2.5)
// 	card_deck.push(new Monster_Card("Ancient Zyme", "Unholy", [6, 6, 2, 2], "May deal 1 {Health} Health damage to all Heroes in the room instead of attacking, moves with Heroes", "{Unlit} Unlit, full {Health} Health"));
// 	card_deck.push(new Monster_Card("Silent Watcher", "Spirit", [6, 6, 2, 2], "May deal 1 {Wisdom} Will damage to all Heroes in the room instead of attacking, moves with Heroes", "{Unlit} Unlit, full {Wisdom} Will"));
// 	card_deck.push(new Monster_Card("Harbinger", "Demon", [4, 4, 3, 2], "Cannot be attacked by a Hero without an item", "{Unlit} Unlit"));
// 	card_deck.push(new Monster_Card("Ancinet Lich", "Unholy", [4, 4, 2, 3], "Cannot be attacked by a Hero without an item", "{Unlit} Unlit"));
// 	card_deck.push(new Monster_Card("Nightgaunt", "Spirit", [6, 4, 3, 2], "Makes one adjacent unoccupied room {Unlit} Unlit per turn, +1 {Might} Might when adjacent to an unexplored room", "Unexplored, else {Unlit} Unlit"));
// 	card_deck.push(new Monster_Card("Fell Rider", "Demon", [4, 6, 2, 3], "+1 {Power} Fear in room with {Armour} Armour, May suffer 2 {Damage} Damage to animate {Armour} Armour in room", "{Unlit} Unlit, {Armour} Armour"));

// 	// Events (Rev 2)
// 	card_deck.push(new Event_Card("Gaping Wounds", "Suffer a {Might} Might 4 attack. Add {Bones} Bones to this room.", true));
// 	card_deck.push(new Event_Card("Scream", "Suffer a {Power} Fear 4 attack. Add {Souls} Souls to this room.", true));
// 	card_deck.push(new Event_Card("Shattered Vase", "Any monster may move to this room and immediately perform a {Might} Might 3 attack.", true));
// 	card_deck.push(new Event_Card("Tumbled Shelves", "Any monster may move to this room and immediately perform a {Power} Fear 3 attack.", true));
// 	card_deck.push(new Event_Card("Darkness Envelops", "All rooms adjacent to {Unlit} Unlit rooms become {Unlit} Unlit. All Heroes adjacent to an unexplored room suffer a {Power} Fear 2 attack.", true));
// 	card_deck.push(new Event_Card("A Tap on the Shoulder", "Suffer a {Power} Fear 6 attack", true));
// 	card_deck.push(new Event_Card("Looming Shadow", "Suffer a {Might} Might 6 attack", true));
// 	card_deck.push(new Event_Card("A Tap on the Shoulder", "Suffer a {Power} Fear 6 attack", true));
// 	card_deck.push(new Event_Card("Looming Shadow", "Suffer a {Might} Might 6 attack", true));
// 	card_deck.push(new Event_Card("Noises in the Dark", "All Heroes in this room attack other Heroes.", true));
// 	card_deck.push(new Event_Card("Mind Control", "This Hero is controlled by the Vampire player for thee rounds.", true));
// 	card_deck.push(new Event_Card("Noxious Fumes", "This Hero attacks itself.", true));
// 	card_deck.push(new Event_Card("Rat Infestation", "All Heroes in this room and all adjacent suffer a {Might} Might 4 attack. -2 {Might} Might in {Lit} Lit rooms.", true));
// 	card_deck.push(new Event_Card("Spirits Arise", "All Heroes in this room and all adjacent suffer a {Power} Fear 4 attack. -2 {Power} Fear in {Lit} Lit rooms.", true));
// 	card_deck.push(new Event_Card("Panicked Stampede", "All Heroes in this room and all adjacent suffer a {Might} Might 2X attack, where X is the number of Heroes in this room and all adjacent.", true));
// 	card_deck.push(new Event_Card("Spreading Panic", "All Heroes in this room and all adjacent suffer a {Power} Fear 2X attack, where X is the number of Heroes in this room and all adjacent.", true));
// 	card_deck.push(new Event_Card("Spirits of the Dead", "All Heroes in the house suffer a {Might} Might 2 attack.", true));
// 	card_deck.push(new Event_Card("Groans from the Walls", "All Heroes in the house suffer a {Power} Fear 2 attack.", true));
// 	card_deck.push(new Event_Card("Corrosion", "All Heroes in this room lose an item the next time they take {Damage} Damage.", true));
// 	card_deck.push(new Event_Card("Twisted Metal", "Suffer a {Might} Might 4 attack. Lose an item.", true));
// 	card_deck.push(new Event_Card("Possession", "Suffer a {Power} Fear 4 attack. Lose an item.", true));

// 	// Item/Feature/Totem (Rev 2)
// 	card_deck.push(new Item_Card("Demon Sword", "Hero is controlled by the Vampire player. Cannot be played on a Champion or Knight.", ". It cannot be dropped or traded.", true));
// 	card_deck.push(new Item_Card("Vandal's Mace", "Hero always attacks, When this Hero attacks, it suffers 1 {Damage} Damage and destroys an item (other than this one) held by itself or a Hero in the room.", ". It cannot be dropped or traded.", true));
// 	card_deck.push(new Feature_Card("Prowling Spirits", "Heroes in this room and one adjacent room must roll a check of 2+ each turn, else be controlled by the Vampire player for 1 turn.", true));
// 	card_deck.push(new Feature_Card("Accursed Symbols", "Adventurer items have no effect in this room and in one adjacent room.", true));
// 	card_deck.push(new Totem_Card("Crystal Orb", "Every other turn, the Vampire player may choose 1 Hero to control as if it were a monster.", "It has 4 {Health} Health and infinite {Wisdom} Will.", true));

// 	cards_per_page = 16;
// };
// function generate_new_good_cards() {

// 	// Events (Rev 2)
// 	card_deck.push(new Event_Card("Desperate Charge", "This Hero moves to an adjacent room. Kill this Hero and one monster in that room.", false));
// 	card_deck.push(new Event_Card("Desperate Charge", "This Hero moves to an adjacent room. Kill this Hero and one monster in that room.", false));
// 	card_deck.push(new Event_Card("Bandages", "Regain either 2 {Health} Health or 2 {Wisdom} Will (cannot exceed starting value).", false));
// 	card_deck.push(new Event_Card("Appeased Spirits", "Remove all {Souls} Souls from this room.", false));
// 	card_deck.push(new Event_Card("Bury the Dead", "Remove all {Bones} Bones from this room.", false));
// 	card_deck.push(new Event_Card("Show of Bravado", "All monsters within two rooms must flee one room away.", false));
// 	card_deck.push(new Event_Card("Call to Arms", "All Heroes in the house may perform an attack immediately.", false));
// 	card_deck.push(new Event_Card("Sneak Attack", "The nearest monster suffers a {Might} Might 4 attack.", false));
// 	card_deck.push(new Event_Card("Torchlight", "The nearest monster suffers a {Power} Blast 4 attack.", false));
// 	card_deck.push(new Event_Card("Disarm Foe", "A monster within one room gains -2 on all attacks for 2 turns.", false));
// 	card_deck.push(new Event_Card("Artifact Recovered", "All monsters suffer a {Might} Might 2 attack.", false));
// 	card_deck.push(new Event_Card("Friendly Spirits", "All monsters suffer a {Power} Blast 2 attack.", false));
// 	card_deck.push(new Event_Card("Aged Arms", "All Heroes in this room gain +2 on their next attack.", false));
// 	card_deck.push(new Event_Card("Peaceful Rooms", "Heroes in this room may explore another room this turn.", false));
// 	card_deck.push(new Event_Card("Secret Passage", "Place this Hero in an explored room of choice.", false));

// 	cards_per_page = 16;
// };

function draw_size_pick() {
    ctx.fillStyle = "rgb(200, 200, 200)";
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = "rgb(50, 50, 50)";
	ctx.font = "40px Garamond"
    ctx.fillText("Haunted House", width*0.5, 50);
	ctx.font = "20px Garamond"
    ctx.fillText("Card Generator", width*0.5, 80);
    ctx.fillText("Pick a paper size.", width*0.5, 150);
    
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].draw();
    }
};

function draw_type_pick() {
    ctx.fillStyle = "rgb(200, 200, 200)";
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = "rgb(50, 50, 50)";
	ctx.font = "40px Garamond"
    ctx.fillText("Haunted House", width*0.5, 50);
	ctx.font = "20px Garamond"
    ctx.fillText("Card Generator", width*0.5, 80);
    ctx.fillText("Pick a type of cards.", width*0.5, 150);
    
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].draw();
    }
};

function draw_set_pick() {
    ctx.fillStyle = "rgb(200, 200, 200)";
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = "rgb(50, 50, 50)";
	ctx.font = "40px Garamond"
    ctx.fillText("Haunted House", width*0.5, 50);
	ctx.font = "20px Garamond"
    ctx.fillText("Card Generator", width*0.5, 80);
    ctx.fillText("Pick a set of cards.", width*0.5, 150);
    
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].draw();
    }
};

function draw_card_disp(set, side = fronts) {
    ctx.fillStyle = COLORS.GHOST_WHITE;
    ctx.fillRect(0, 0, width, height);
    
	per_row = 1;
	per_col = 1;
	orient = up_down;
	switch(cards_per_page) {
		case 4:
			per_row = 2;
			per_col = 2;
			break;
		case 8:
			per_row = 2;
			per_col = 4;
			break;
		case 9:
			per_row = 3;
			per_col = 3;
			orient = up_down;
			break;
		case 10:
			per_row = 2;
			per_col = 5;
			orient = left_right;
			break;
		case 12:
			per_row = 3;
			per_col = 4;
			orient = up_down;
			break;
		case 16:
			per_row = 4;
			per_col = 4;
			orient = up_down;
			break;
	}
	ctx.lineWidth = 1;
	

    for (let i = set*cards_per_page; i < (set+1)*cards_per_page && i < card_deck.length; i++) {
        let modi = i % cards_per_page;
        let x = Math.floor(modi/per_col);
        let y = (modi % per_col);
		let w = (width/per_row);
		let h = (height/per_col);
		if (side === backs) {
			card_deck[i].draw_back(x*w+1, y*h+1, w-2, h-2, orient, y+1);
		}else if (side === fronts) {
			card_deck[i].draw(x*w+1, y*h+1, w-2, h-2, orient, y+1);
		}
    }

	ctx.lineWidth = 2;
	ctx.strokeStyle = COLORS.GHOST_WHITE;
	ctx.beginPath();
	for (let i = 0; i <= per_row; i++) {
		ctx.moveTo(Math.round(i*width/per_row-1), 0);
		ctx.lineTo(Math.round(i*width/per_row-1), height);
		ctx.moveTo(Math.round(i*width/per_row+1), 0);
		ctx.lineTo(Math.round(i*width/per_row+1), height);
	}
	for (let i = 0; i <= per_col; i++) {
		ctx.moveTo(0, Math.round(i*height/per_col-1));
		ctx.lineTo(width, Math.round(i*height/per_col-1));
		ctx.moveTo(0, Math.round(i*height/per_col+1));
		ctx.lineTo(width, Math.round(i*height/per_col+1));
	}
	ctx.stroke();

	ctx.strokeStyle = COLORS.SLATE_BLACK;
	ctx.beginPath();
	for (let i = 0; i <= per_row; i++) {
		ctx.moveTo(Math.round(i*width/per_row), 0);
		ctx.lineTo(Math.round(i*width/per_row), height);
	}
	for (let i = 0; i <= per_col; i++) {
		ctx.moveTo(0, Math.round(i*height/per_col));
		ctx.lineTo(width, Math.round(i*height/per_col));
	}
	ctx.stroke();
};

function click(mx, my) {
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].click(mx, my);
    }
};

function generate_button(button_title, iterations, mody) {
	let funct = function() {};
	switch (iterations) {
		case 0:
			funct = function() {setup_card_disp(0, fronts);};
			break;
		case 1:
			funct = function() {setup_card_disp(1, fronts);};
			break;
		case 2:
			funct = function() {setup_card_disp(2, fronts);};
			break;
		case 3:
			funct = function() {setup_card_disp(3, fronts);};
			break;
		case 4:
			funct = function() {setup_card_disp(4, fronts);};
			break;
		case 5:
			funct = function() {setup_card_disp(5, fronts);};
			break;
		case 6:
			funct = function() {setup_card_disp(6, fronts);};
			break;
		case 7:
			funct = function() {setup_card_disp(7, fronts);};
			break;
		case 8:
			funct = function() {setup_card_disp(8, fronts);};
			break;
		case 9:
			funct = function() {setup_card_disp(9, fronts);};
			break;
		case 10:
			funct = function() {setup_card_disp(10, fronts);};
			break;
	}
	buttons.push(new Cust_Button((width*0.5)-200, 275+(75*iterations)+mody, 400, 50, button_title, funct));
};

m_canv.addEventListener("click", function(event) {
    click(event.clientX-m_canv.getBoundingClientRect().left, event.clientY-m_canv.getBoundingClientRect().top);
});

function setup_size_pick() {
    buttons.push(new Cust_Button(150, 175, 100, 50, "8 1/2 by 11", function() {
        setup_type_pick(2550, 3300);
    }));
    buttons.push(new Cust_Button(150, 250, 100, 50, "9 by 12", function() {
        setup_type_pick(2700, 3600);
    }));
    buttons.push(new Cust_Button(150, 325, 100, 50, "A4", function() {
        setup_type_pick(2480, 3508);
    }));
    draw_size_pick();
};
function setup_type_pick(sizex, sizey) {
    width = (m_canv.width = sizex);
    height = (m_canv.height = sizey);
    ctx.textAlign = "center";
    ctx.font = "20px Garamond";
    buttons = [];
    buttons.push(new Cust_Button((width*0.5)-200, 200+(75*0), 400, 50, "Full Evil Deck", function() {
        setup_set_pick(CARDS.EVIL_FULL);
    }));
    buttons.push(new Cust_Button((width*0.5)-200, 200+(75*1), 400, 50, "Full Good Deck", function() {
        setup_set_pick(CARDS.GOOD_FULL);
    }));
    buttons.push(new Cust_Button((width*0.5)-200, 200+(75*2), 400, 50, "Hero Cards", function() {
        setup_set_pick(CARDS.HERO);
    }));
    buttons.push(new Cust_Button((width*0.5)-200, 200+(75*3), 400, 50, "Room Cards", function() {
        setup_set_pick(CARDS.ROOM);
    }));
    buttons.push(new Cust_Button((width*0.5)-200, 200+(75*5), 400, 50, "Monster Cards - Evil", function() {
        setup_set_pick(CARDS.MONSTER_EVIL);
    }));
    buttons.push(new Cust_Button((width*0.5)-200, 200+(75*6), 400, 50, "Event Cards - Evil", function() {
        setup_set_pick(CARDS.EVENT_EVIL);
    }));
    buttons.push(new Cust_Button((width*0.5)-200, 200+(75*7), 400, 50, "Item/Feature/Totem Cards - Evil", function() {
        setup_set_pick(CARDS.ITEM_FEATURE_TOTEM_EVIL);
    }));
    buttons.push(new Cust_Button((width*0.5)-200, 200+(75*8), 400, 50, "Event Cards - Good", function() {
        setup_set_pick(CARDS.EVENT_GOOD);
    }));
    buttons.push(new Cust_Button((width*0.5)-200, 200+(75*9), 400, 50, "Item Cards - Good", function() {
        setup_set_pick(CARDS.ITEM_GOOD);
    }));
    // buttons.push(new Cust_Button((width*0.5)-200, 200+(75*10), 400, 50, "Bonus Hero Cards - Good", function() {
    //     setup_set_pick(CARDS.BONUS_HERO_GOOD);
    // }));
    buttons.push(new Cust_Button((width*0.5)-200, 200+(75*11), 400, 50, "New Cards - Evil", function() {
        setup_set_pick(CARDS.NEW_EVIL);
    }));
    buttons.push(new Cust_Button((width*0.5)-200, 200+(75*12), 400, 50, "New Cards - Good", function() {
        setup_set_pick(CARDS.NEW_GOOD);
    }));
    draw_type_pick();
};
function setup_set_pick(type) {
    ctx.textAlign = "center";
    ctx.font = "20px Garamond";
	
	switch (type) {
		case CARDS.EVIL_FULL:
			generate_player_deck_vampire_base_deck();
			generate_player_deck_vampire_ravenous_beasts_deck();
            generate_player_deck_vampire_crumbling_fortress_deck();
            generate_player_deck_vampire_creeping_nightmare_deck();
			break;
		case CARDS.GOOD_FULL:
			// generate_event_good_deck();
			// generate_item_good_deck();
			break;
		case CARDS.HERO:
			// generate_hero_deck();
			break;
		case CARDS.ROOM:
			// generate_room_deck();
			break;
		case CARDS.MONSTER_EVIL:
			// generate_monster_deck();
			break;
		case CARDS.EVENT_EVIL:
			// generate_event_evil_deck();
			break;
		case CARDS.ITEM_FEATURE_TOTEM_EVIL:
            // generate_item_feature_totem_evil_deck();
			break;
		case CARDS.EVENT_GOOD:
			// generate_event_good_deck();
			break;
		case CARDS.ITEM_GOOD:
			// generate_item_good_deck();
			break;
		case CARDS.NEW_EVIL:
			// generate_new_evil_cards();
			break;
		case CARDS.NEW_GOOD:
			// generate_new_good_cards();
			break;
	}
	
    buttons = [];
	
	buttons.push(new Cust_Button((width*0.5)-100, 200, 200, 50, "Card Backs", function() {
		setup_card_disp(0, backs);
	}));
	let mody = 0;
	
	let index = 0;
	let iterations = 0;
	while (index < card_deck.length) {
		button_title = "Set "+(iterations+1)+": "+card_deck[index].get_name();
		index += cards_per_page-1;
		if (index >= card_deck.length) {
			index = card_deck.length-1;
		}
		button_title += " - "+card_deck[index].get_name();
		generate_button(button_title, iterations, mody);
		index += 1;
 		iterations += 1;
	}
    draw_set_pick();
};
function setup_card_disp(set, backs = false) {
    buttons = [];
    draw_card_disp(set, backs);
};


setup_size_pick();