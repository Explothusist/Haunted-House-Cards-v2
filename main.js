const m_canv = document.querySelector(".m_canv");
let width = (m_canv.width = 400);
let height = (m_canv.height = 400);

const ctx = m_canv.getContext("2d");
ctx.textAlign = "center";
ctx.font = "20px Garamond";

const kCards = {
    PlayerDeck_Vampire: 0, // Proof of Concept
    PlayerDeck_Adventurers: 1, // Proof of Concept
    TimeDeck: 2, // Complete
    EventDeck: 3,
    HeroDeck: 4,
    HeroDeck_TurnCards: 5,
    DisasterBoonDeck: 6,
    // BoonDeck: 7,
    SmallItemsDeck: 8,
    SetRandomization_Vampire: 9,
    SetRandomization_Adventurers: 10,
    MiscSpecial: 10 // Like Sword, Charm, Vampire, Armour, Ratman
};

const kColors = {
    Blood_Red: "rgb(205, 14, 14)",
    Unholy_Orange: "rgb(177, 82, 53)",
    Demonic_Purple: "rgb(184, 38, 177)",
    Ghostly_Blue: "rgb(41, 89, 166)",
    Ominous_Yellow: "rgb(173, 173, 23)",
    Dingy_Gray: "rgb(66, 66, 66)",
    Slate_Black: "rgb(0, 0, 0)",
    Ghost_White: "rgb(255, 255, 255)"
};

const fronts = 0;
const backs = 1;

const up_down = 0;
const left_right = 1;

function embed_image(identifier, x, y, w, h) {
	let img = Alert_Icon;
	switch (identifier) {
		// case "{Spirit}":
		// 	img = Spirit_Icon;
        //     // ctx.fillStyle = kColors.Ghostly_Blue;
		// 	break;
		// case "{Unholy}":
		// 	img = Unholy_Icon;
        //     // ctx.fillStyle = kColors.Unholy_Orange;
		// 	break;
		// case "{Demon}":
		// 	img = Demon_Icon;
        //     // ctx.fillStyle = kColors.Demonic_Purple;
		// 	break;
		case "{Health}":
			img = Health_Icon;
            // ctx.fillStyle = kColors.Blood_Red;
			break;
		case "{Wisdom}":
			img = Wisdom_Icon;
            // ctx.fillStyle = kColors.Ghostly_Blue;
			break;
		case "{Might}":
			img = Might_Icon;
            // ctx.fillStyle = kColors.Unholy_Orange;
			break;
		case "{Power}":
			img = Power_Icon;
            // ctx.fillStyle = kColors.Demonic_Purple;
			break;
		// case "{Power}":
		// 	img = Blast_Icon;
        //     // ctx.fillStyle = kColors.Demonic_Purple;
		// 	break;
		case "{Lit}":
			img = Lit_Icon;
            // ctx.fillStyle = kColors.Ominous_Yellow;
			break;
		case "{Unlit}":
			img = Unlit_Icon;
            // ctx.fillStyle = kColors.Dingy_Gray;
			break;
		case "{Armour}":
			img = Armour_Icon;
            // ctx.fillStyle = kColors.Unholy_Orange;
			break;
		case "{Souls}":
			img = Souls_Icon;
            // ctx.fillStyle = kColors.Ghostly_Blue;
			break;
		case "{Bones}":
			img = Bones_Icon;
            // ctx.fillStyle = kColors.Blood_Red;
			break;
		case "{Damage}":
			img = Damage_Icon;
            // ctx.fillStyle = kColors.Blood_Red;
			break;
	}
	ctx.drawImage(img, Math.round(x), Math.round(y), Math.round(w), Math.round(h));
};

function get_style_after_image(identifier) {
	let color = kColors.Slate_Black;
    let weight = "bold";
	switch (identifier) {
		// case "{Spirit}":
        //     color = kColors.Ghostly_Blue;
		// 	break;
		// case "{Unholy}":
        //     color = kColors.Unholy_Orange;
		// 	break;
		// case "{Demon}":
        //     color = kColors.Demonic_Purple;
		// 	break;
		case "{Health}":
            color = kColors.Blood_Red;
			break;
		case "{Wisdom}":
            color = kColors.Ghostly_Blue;
			break;
		case "{Might}":
            color = kColors.Unholy_Orange;
			break;
		case "{Power}":
            color = kColors.Demonic_Purple;
			break;
		// case "{Power}":
        //     color = kColors.Demonic_Purple;
		// 	break;
		case "{Lit}":
            color = kColors.Ominous_Yellow;
			break;
		case "{Unlit}":
            color = kColors.Ominous_Yellow;
			break;
		case "{Armour}":
            color = kColors.Unholy_Orange;
			break;
		case "{Souls}":
            color = kColors.Ghostly_Blue;
			break;
		case "{Bones}":
            color = kColors.Unholy_Orange;
			break;
		case "{Damage}":
            color = kColors.Blood_Red;
			break;
	}
	return [color, weight];
};

function interpret_text(text, x, y, w, h, line_height) {
	// ctx.fillStyle = kColors.Slate_Black;
	// ctx.textAlign = "center";
	// ctx.font = (h*0.08)+"px Garamond";
	let images = [];
    let words = [];
	let chunks = text.split(" ");
	let lines = [""];
    let curr_color = kColors.Slate_Black;
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
            curr_color = kColors.Slate_Black;
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
        ctx.fillText(words[i].word, x+mod_x, y+((words[i].line-mod_height)*line_height));
        // ctx.font = base_font;
    }

	for (let i = 0; i < images.length; i++) {
		let mod_x = -(ctx.measureText(lines[images[i].line]).width/2)+ctx.measureText(lines[images[i].line].slice(0, images[i].pos)).width;
		embed_image(images[i].img, x+mod_x+2, y+((images[i].line-mod_height)*line_height)-42, line_height*0.9, line_height*0.9);
	}
};
function interpret_text_right_aligned(text, x, y, w, h, line_height) {
	// ctx.fillStyle = kColors.Slate_Black;
	// ctx.textAlign = "center";
	// ctx.font = (h*0.08)+"px Garamond";
	let images = [];
    let words = [];
	let chunks = text.split(" ");
	let lines = [""];
    let curr_color = kColors.Slate_Black;
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
            curr_color = kColors.Slate_Black;
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
        ctx.fillText(words[i].word, x+mod_x, y+((words[i].line-mod_height)*line_height));
        // ctx.font = base_font;
    }

	for (let i = 0; i < images.length; i++) {
		let mod_x = -(ctx.measureText(lines[images[i].line]).width)+ctx.measureText(lines[images[i].line].slice(0, images[i].pos)).width;
		embed_image(images[i].img, x+mod_x+2, y+((images[i].line-mod_height)*line_height)-42, line_height, line_height);
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

function draw_card_back(back_type, x, y, w, h, orient) {
    let text = "";
    switch (back_type) {
        case kCards.PlayerDeck_Vampire:
            text = "Vampire";
            ctx.fillStyle = kColors.Demonic_Purple;
            break;
        case kCards.PlayerDeck_Adventurers:
            text = "Adventurers";
            ctx.fillStyle = kColors.Ghostly_Blue;
            break;
        case kCards.TimeDeck:
            text = "Time";
            ctx.fillStyle = kColors.Ominous_Yellow;
            break;
    }
    ctx.strokeStyle = kColors.Slate_Black;
    ctx.lineWidth = 25;
    ctx.beginPath();
    ctx.roundRect(x+5, y+5, w-10, h-10, 20);
    ctx.stroke();
    
    ctx.textAlign = "center";
    ctx.font = (h*0.15)+"px Garamond";
    ctx.fillText(text, x+(w/2), y+(h*0.4), w*0.85);
    ctx.save();
    ctx.translate(x+(w/2), y+(h*0.6));
    ctx.rotate(Math.PI);
    ctx.fillText(text, 0, 0);
    ctx.restore();
            
};

class Monster_Card {
	title;
	stats;
	special;
    type;
    set;
    back_type;

	constructor(title, stats, special, type, set, back_type) {
		this.title = title;
		this.stats = stats;
		this.special = special;
        this.type = type;
		this.set = set;
        this.back_type = back_type;
	}
	get_name() {
		return this.title;
	}
	draw(x, y, w, h, orient) {
		ctx.strokeStyle = kColors.Slate_Black
		ctx.lineWidth = 15;
		ctx.beginPath();
		ctx.roundRect(Math.round(x+2), Math.round(y+2), Math.round(w-4), Math.round(h-4), 24);
		ctx.stroke();
		
		ctx.fillStyle = kColors.Slate_Black;
		ctx.textAlign = "center";
		ctx.font = (h*0.1)+"px Garamond";
		ctx.fillText(this.title, x+(w*0.5), y+(h*0.12), w*0.9);
		
		ctx.strokeStyle = kColors.Slate_Black;
		ctx.lineWidth = 4;
        ctx.strokeRect(Math.round(x+(w*0.14)), Math.round(y+(h*0.23)), w*0.18, w*0.15);
        ctx.strokeRect(Math.round(x+(w*0.32)), Math.round(y+(h*0.23)), w*0.18, w*0.15);
        ctx.strokeRect(Math.round(x+(w*0.50)), Math.round(y+(h*0.23)), w*0.18, w*0.15);
        ctx.strokeRect(Math.round(x+(w*0.68)), Math.round(y+(h*0.23)), w*0.18, w*0.15);

		ctx.textAlign = "center";
		ctx.font = (h*0.07)+"px Garamond";
        ctx.fillStyle = kColors.Blood_Red;
		interpret_text(this.stats[0]+" {Health}", x+(w*0.235), y+(h*0.31), w, h, h*0.07);
        ctx.fillStyle = kColors.Ghostly_Blue;
		interpret_text(this.stats[1]+" {Wisdom}", x+(w*0.415), y+(h*0.31), w, h, h*0.07);
        ctx.fillStyle = kColors.Unholy_Orange;
		interpret_text(this.stats[2]+" {Might}", x+(w*0.595), y+(h*0.31), w, h, h*0.07);
        ctx.fillStyle = kColors.Demonic_Purple;
		interpret_text(this.stats[3]+" {Power}", x+(w*0.775), y+(h*0.31), w, h, h*0.07);

		ctx.fillStyle = kColors.Slate_Black;
		ctx.textAlign = "center";

		// ctx.font = (h*0.07)+"px Garamond";
		ctx.font = (h*0.06)+"px Garamond";
		interpret_text(this.special, x+(w/2), y+(h*0.55), w, h, h*0.06);

		ctx.fillStyle = kColors.Slate_Black;
		ctx.textAlign = "center";
		ctx.font = (h*0.07)+"px Garamond";
		interpret_text(this.type, x+(w*0.5), y+(h*0.95), w*0.9, h, h*0.07);

		ctx.fillStyle = kColors.Slate_Black;
		ctx.font = (h*0.07)+"px Garamond";
		interpret_text(this.set, x+(w*0.92), y+(h*0.95), w, h, h*0.07);
	}
	draw_back(x, y, w, h, orient) {
		draw_card_back(this.back_type, x, y, w, h, orient);
	}
};
class Standard_Card {
	title;
	text;
    type;
    set;
    back_type;

	constructor(title, text, type, set, back_type) {
		this.title = title;
		this.text = text;
        this.type = type;
        this.set = set;
		this.back_type = back_type;
	}
	get_name() {
		return this.title;
	}
	draw(x, y, w, h, orient) {
		ctx.strokeStyle = kColors.Slate_Black
		ctx.lineWidth = 15;
		ctx.beginPath();
		ctx.roundRect(Math.round(x+2), Math.round(y+2), Math.round(w-4), Math.round(h-4), 24);
		ctx.stroke();
		
		ctx.fillStyle = kColors.Slate_Black;
		ctx.textAlign = "center";
		ctx.font = (h*0.1)+"px Garamond";
		ctx.fillText(this.title, x+(w*0.5), y+(h*0.12), w*0.9);

		ctx.fillStyle = kColors.Slate_Black;
		ctx.textAlign = "center";
		// ctx.font = (h*0.08)+"px Garamond";
		ctx.font = (h*0.06)+"px Garamond";
		interpret_text(this.text, x+(w/2), y+(h*0.44), w, h, h*0.06);

		ctx.fillStyle = kColors.Slate_Black;
		ctx.textAlign = "center";
		ctx.font = (h*0.07)+"px Garamond";
		interpret_text(this.type, x+(w*0.5), y+(h*0.95), w*0.9, h, h*0.07);

		ctx.fillStyle = kColors.Slate_Black;
		ctx.font = (h*0.07)+"px Garamond";
		interpret_text(this.set, x+(w*0.92), y+(h*0.95), w, h, h*0.07);
	}
	draw_back(x, y, w, h, orient) {
		draw_card_back(this.back_type, x, y, w, h, orient);
	}
};
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
		ctx.strokeStyle = kColors.Slate_Black
		ctx.lineWidth = 15;
		ctx.beginPath();
		ctx.roundRect(Math.round(x+2), Math.round(y+2), Math.round(w-4), Math.round(h-4), 24);
		ctx.stroke();

		// ctx.drawImage(this.image, x, y);
		
		ctx.fillStyle = kColors.Slate_Black;
		ctx.textAlign = "left";
		ctx.font = (h*0.07)+"px Garamond";
		ctx.fillText(this.title, x+(w*0.05), y+(h*0.10), w*0.85);
		ctx.fillStyle = kColors.Slate_Black;

		ctx.textAlign = "right";
		ctx.font = (h*0.05)+"px Garamond";
		interpret_text_right_aligned(this.special, x+(w*0.96), y+(h*0.96), w, h, h*0.05);
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
	
    card_deck.push(new Standard_Card("Ancient Guardians", "Animate the nearest {Armour} Armour. It gains +2 to its next attack per Hero in {Aura} Aura.", "{Event} Event", "{Base}", kCards.PlayerDeck_Vampire));
    card_deck.push(new Standard_Card("Banshee's Cry", "Suffer a {Power} Power 6 attack. +2 per {Bones} Bones and {Souls} Souls. Add either a {Bones} Bones or a {Souls} Souls if the Hero suffers damage.", "{Event} Event", "{Base}", kCards.PlayerDeck_Vampire));
    card_deck.push(new Standard_Card("Backstab", "Suffer a {Might} Might 7 attack. +2 per {Armour} Armour and {Ruins} Ruins. May add -2 to add a {Ruins} Ruins. {Ruins} Ruins provide no protection.", "{Event} Event", "{Base}", kCards.PlayerDeck_Vampire));
    card_deck.push(new Standard_Card("Swarming Vermin", "All Heroes suffer a {Might} Might 5 attack. +1 per Hero in a room with {Sewers} Sewers. Ruins {Ruins} provide no protection.", "{Event} Event", "{Base}", kCards.PlayerDeck_Vampire));
    card_deck.push(new Standard_Card("Beckoning Spirits", "Play after a draw from the Event deck. \n \n Move the Hero to an adjacent room. If either room has Souls, replace event draw with an Evil {Monster} Monster event.", "{Instant} Instant", "{Base}", kCards.PlayerDeck_Vampire));
    card_deck.push(new Standard_Card("Crippling Miasma", "Play after a draw from the Event deck. \n \n Hero must make a check against either Wounded or Terrified, Vampire's choice. If {Sewers} Sewers, make both checks. If {Aura} Aura, -1 to all checks made. If the Hero did not survive, do not resolve the event draw.", "{Instant} Instant", "{Base}", kCards.PlayerDeck_Vampire));
    card_deck.push(new Standard_Card("Coward's Ring", "-1 {Might} Might. +2 vs attacks. Every time this Hero enters an unexplored room or a room with {Sewers} Sewers, it must make a 6+ check to avoid 1 {Damage} Damage. \n \n This {Item} Item stays with the Hero.", "{Item} Item", "{Base}", kCards.PlayerDeck_Vampire));
    card_deck.push(new Standard_Card("Prowling Spirits", "Play when a room is explored. \n \n In these two rooms, Heroes add -1 to all checks against Wounded and Terrified. This {Feature} Feature counts as a permanent {Souls} Souls token. \n \n This {Feature} Feature remains on the board.", "{Feature} Feature", "{Base}", kCards.PlayerDeck_Vampire));
    card_deck.push(new Monster_Card("Bloodsucker", [5, 7, 2, 3], "+1 to attacks per 2 {Damage} Damage on the target, rounded up. +1 vs attacks in {Ruins} Ruins.", "{Monster} Monster", "{Base}", kCards.PlayerDeck_Vampire));
    card_deck.push(new Monster_Card("Bloodhound", [7, 5, 3, 2], "When a Hero takes damage, gain +2 {Might} Might and +1 {Power} Power until next attack. Buff does not stack. Drop a {Bones} Bones on death.", "{Monster} Monster", "{Base}", kCards.PlayerDeck_Vampire));
    card_deck.push(new Standard_Card("Claws in the Dark", "Suffer a {Power} Power 7 attack. If {Sewers} Sewers, repeat on nearest Hero. For each attack, +1 per {Bones} Bones.", "{Event} Event", "{Base}", kCards.PlayerDeck_Vampire));
    card_deck.push(new Standard_Card("Call to Arms", "Play after a draw from the Event deck. \n \n In all rooms with Heroes, if {Armour} Armour, animate {Armour} Armour. If {Aura} Aura, may apply the event draw to the nearest animated {Armour} Armour instead.", "{Instant} Instant", "{Base}", kCards.PlayerDeck_Vampire));

	cards_per_page = 16;
};
function generate_player_deck_vampire_ravenous_beasts_deck() {
	// card_deck = [];
	
    card_deck.push(new Standard_Card("Frenzied Assault", "In a room with a Hero and {Sewers} Sewers, spawn a {Ratman} Ratman. All monsters move to the nearest Hero and perform an attack.", "{Event} Event", "{Ravenous_Beasts}", kCards.PlayerDeck_Vampire));
    card_deck.push(new Standard_Card("Rise of the Ratmen", "If {Sewers} Sewers, spawn a {Ratman} Ratman. If {Bones} Bones, spawn a {Ratman} Ratman. If no {Bones} Bones, add a {Bones} Bones.", "{Event} Event", "{Ravenous_Beasts}", kCards.PlayerDeck_Vampire));
    card_deck.push(new Standard_Card("Tooth and Claw", "All Heroes in {Bones} Bones or {Sewers} Sewers suffer a Might 5 attack. Each attack, +2 if {Bones} Bones. Each Hero, if {Sewers} Sewers, suffer a Might 4 attack.", "{Event} Event", "{Ravenous_Beasts}", kCards.PlayerDeck_Vampire));
    card_deck.push(new Standard_Card("Bloodthirsty Hunters", "Suffer a {Might} Might 8 attack. May remove a {Bones} Bones to add +4. May remove a {Bones} Bones to suffer a {Might} Might 7 attack.", "{Event} Event", "{Ravenous_Beasts}", kCards.PlayerDeck_Vampire));
    card_deck.push(new Standard_Card("Silent Hunters", "Play after a draw from the Event deck. \n \n Replace the event draw with an Evil {Monster} Monster event. If {Sewers} Sewers, the Monster gains +1 on its next attack. If {Unlit} Unlit, the Monster immediately surprise attacks.", "{Instant} Instant", "{Ravenous_Beasts}", kCards.PlayerDeck_Vampire));
    card_deck.push(new Standard_Card("Dark Madness", "Play after a draw from the Event deck. \n \n If {Sewers} Sewers, the Hero uses the {Sewers} Sewers with the Vampire controlling the action, resolving that event draw first. If the Hero has at least 2 {Damage} Damage, add a {Bones} Bones.", "{Instant} Instant", "{Ravenous_Beasts}", kCards.PlayerDeck_Vampire));
    card_deck.push(new Standard_Card("Helm of the Rat King", "+1 {Might} Might per {Bones} Bones. During {Night} Night, Hero must move towards and attack nearest monster. On even {Damage} Damage, drop a {Bones} Bones. On death, spawn a {Ratman} Ratman. \n \n This {Item} Item stays with the Hero.", "{Item} Item", "{Ravenous_Beasts}", kCards.PlayerDeck_Vampire));
    card_deck.push(new Standard_Card("Bloodstained Walls", "Play when a room is explored. \n \n In these two rooms, add +1 per {Bones} Bones to all Monster attacks. This feature counts as a permanent {Bones} Bones token. \n \n This {Feature} Feature remains on the board.", "{Feature} Feature", "{Ravenous_Beasts}", kCards.PlayerDeck_Vampire));
    card_deck.push(new Monster_Card("Werewolf", [6, 5, 3, 3], "+1 {Might} Might per {Damage} Damage taken. +1 vs attacks per {Bones} Bones. On death, drop a {Bones} Bones.", "{Monster} Monster", "{Ravenous_Beasts}", kCards.PlayerDeck_Vampire));
    card_deck.push(new Monster_Card("Swamp Dweller", [5, 7, 4, 2], "Heroes in the same room add -1 to all checks against Wounded. If {Sewers} Sewers, may move to any {Sewers} Sewers and perform a surprise attack.", "{Monster} Monster", "{Ravenous_Beasts}", kCards.PlayerDeck_Vampire));
    card_deck.push(new Monster_Card("Direwolf", [6, 6, 3, 3], "Whenever a room is explored, move to it and perform a surprise attack. On death, drop a {Bones} Bones", "{Monster} Monster", "{Ravenous_Beasts}", kCards.PlayerDeck_Vampire));
    card_deck.push(new Standard_Card("From the Shadows", "This Hero and another Hero within 3 rooms each suffer a {Might} Might 7 attack. In each room, add a {Bones} Bones if {Sewers} Sewers or if the Hero takes {Damage} Damage", "{Event} Event", "{Ravenous_Beasts}", kCards.PlayerDeck_Vampire));

	cards_per_page = 16;
};
function generate_player_deck_vampire_crumbling_fortress_deck() {
	// card_deck = [];
	
    card_deck.push(new Standard_Card("Rust-Cacked Arms", "Animate {Armour} Armour. If {Ruins} Ruins, remove a {Ruins} Ruins to add an {Armour} Armour and animate {Armour} Armour. If there was no {Ruins} Ruins, add a {Ruins}", "{Event} Event", "{Crumbling_Fortress}", kCards.PlayerDeck_Vampire));
    card_deck.push(new Standard_Card("Guardian's Call", "Suffer a {Might} Might 8 attack. Nearest animated {Armour} Armour gains +2 on its next attack and heals 1 {Damage} Damage per {Ruins} Ruins in this room.", "{Event} Event", "{Crumbling_Fortress}", kCards.PlayerDeck_Vampire));
    card_deck.push(new Standard_Card("Falling Bricks", "Suffer a {Power} Power 8 attack. If {Armour} Armour, add a {Ruins} Ruins. +2 per {Ruins} Ruins.", "{Event} Event", "{Crumbling_Fortress}", kCards.PlayerDeck_Vampire));
    card_deck.push(new Standard_Card("Archaic Battlecry", "Animate nearest {Armour} Armour. All {Armour} Armour gains +1 on its next attack and heals 1 {Damage} Damage.", "{Event} Event", "{Crumbling_Fortress}", kCards.PlayerDeck_Vampire));
    card_deck.push(new Standard_Card("Chandelier Crashes", "Play after a draw from the Event deck. \n \n Add a {Ruins} Ruins. For the rest of the turn, treat the room as {Unlit} Unlit and ignore room text. Redraw the event draw.", "{Instant} Instant", "{Crumbling_Fortress}", kCards.PlayerDeck_Vampire));
    card_deck.push(new Standard_Card("Crumbling Floorboards", "Play after a draw from the Event deck. \n \n Choose one: add a {Ruins} Ruins or replace the event draw with an Evil {Event} Event. If {Ruins} Ruins, perform both.", "{Instant} Instant", "{Crumbling_Fortress}", kCards.PlayerDeck_Vampire));
    card_deck.push(new Standard_Card("Cursed Breastplate", "+2 on checks to survive. +2 vs attacks from {Armour} Armour. 6+ check each turn to avoid being controlled by the Vampire. On death, spawn animated {Armour} Armour. \n \n This {Item} Item stays with the Hero.", "{Item} Item", "{Crumbling_Fortress}", kCards.PlayerDeck_Vampire));
    card_deck.push(new Standard_Card("Grotesque Gargoyles", "Play when a room is explored. \n \n In these two rooms, {Ruins} Ruins provide no protection and Monsters may use {Ruins} Ruins like {Sewers} Sewers. This feature counts as a permanent {Ruins} Ruins token. \n \n This {Feature} Feature remains on the board.", "{Feature} Feature", "{Crumbling_Fortress}", kCards.PlayerDeck_Vampire));
    card_deck.push(new Monster_Card("Ancient Warrior", [7, 5, 4, 3], "Once per turn, when a {Bones} Bones or {Souls} Souls would be dropped in this room, drop a {Ruins} Ruins instead.", "{Monster} Monster", "{Crumbling_Fortress}", kCards.PlayerDeck_Vampire));
    card_deck.push(new Monster_Card("Spectral Knight", [5, 5, 2, 3], "+1 {Power} Power per {Ruins} Ruins. +1 vs attacks per {Ruins} Ruins. +1 to attacks by {Armour} Armour within 3 rooms. On death, add a {Ruins} Ruins.", "{Monster} Monster", "{Crumbling_Fortress}", kCards.PlayerDeck_Vampire));
    card_deck.push(new Standard_Card("Call the Defenders", "Play after a draw from the Event deck. \n \n Animate {Armour} Armour. It gains +1 to its next attack per {Ruins} Ruins. It immediately surprise attacks.", "{Instant} Instant", "{Crumbling_Fortress}", kCards.PlayerDeck_Vampire));
    card_deck.push(new Standard_Card("Forbidden Sanctuary", "Play when a room is explored. \n \n In these two rooms, during {Night} Night, whenever a Hero enters, animate {Armour} Armour. When played, add an {Armour} Armour to either room. \n \n This {Feature} Feature remains on the board.", "{Feature} Feature", "{Crumbling_Fortress}", kCards.PlayerDeck_Vampire));

	cards_per_page = 16;
};
function generate_player_deck_vampire_creeping_nightmare_deck() {
	// card_deck = [];
	
    card_deck.push(new Standard_Card("Stroke of Midnight", "All Heroes in {Souls} Souls suffer a {Power} Power 6 attack. All Heroes in {Aura} Aura suffer a {Power} Power 6 attack.", "{Event} Event", "{Creeping_Nightmare}", kCards.PlayerDeck_Vampire));
    card_deck.push(new Standard_Card("Vengeful Spirits", "Suffer a {Power} Power 7 attack per {Souls} Souls. If {Aura} Aura, +1 to each attack. If the Hero suffers {Damage} Damage, may force them to take one step towards the Entrance Hall.", "{Event} Event", "{Creeping_Nightmare}", kCards.PlayerDeck_Vampire));
    card_deck.push(new Standard_Card("Banshee's Cry", "This Hero and the Hero with the most {Damage} Damage suffer a {Power} Power 6 attack. In each room, add a {Souls} Souls if the Hero suffers {Damage} Damage.", "{Event} Event", "{Creeping_Nightmare}", kCards.PlayerDeck_Vampire));
    card_deck.push(new Standard_Card("Spreading Panic", "This Hero and the nearest other Hero suffer a {Power} Power 6 attack. If {Aura} Aura in either room, also attack next nearest Hero. In each room, +1 per {Souls} Souls.", "{Event} Event", "{Creeping_Nightmare}", kCards.PlayerDeck_Vampire));
    card_deck.push(new Standard_Card("Menagerie of Doom", "Play after a draw from the Event deck. \n \n For the rest of the turn, treat this room as having one additional token of all features. Replace the event draw with and Evil {Event} Event.", "{Instant} Instant", "{Creeping_Nightmare}", kCards.PlayerDeck_Vampire));
    card_deck.push(new Standard_Card("Bloodcurdling Scream", "Play after a draw from the Event deck. \n \n Move the Hero up to 2 rooms towards the Entrance Hall. If {Aura} Aura originally, add a {Souls} Souls to the new room.", "{Instant} Instant", "{Creeping_Nightmare}", kCards.PlayerDeck_Vampire));
    card_deck.push(new Standard_Card("Haunted Lantern", "+2 vs Monster attacks. {Event} Event attacks always deal grevious {Damage} Damage. Once per turn, redraw a Good {Event} Event triggered by this Hero. On death, drop a {Souls} Souls. \n \n This {Item} Item stays with the Hero.", "{Item} Item", "{Creeping_Nightmare}", kCards.PlayerDeck_Vampire));
    card_deck.push(new Standard_Card("Malevolent Haunts", "Play when a room is explored. \n \n In these two rooms, +1 to attacks from Evil {Event} Events and Evil {Event} Events may treat the room as containing an additional token of any feature. \n \n This {Feature} Feature remains on the board.", "{Feature} Feature", "{Creeping_Nightmare}", kCards.PlayerDeck_Vampire));
    card_deck.push(new Monster_Card("Harbinger", [7, 5, 3, 4], "Instead of attacking, it may cause an Evil event. +1 to Evil {Event} Event attacks within two rooms. On death, add a {Souls} Souls.", "{Monster} Monster", "{Creeping_Nightmare}", kCards.PlayerDeck_Vampire));
    card_deck.push(new Monster_Card("Spectre", [5, 7, 3, 4], "Counts as a {Souls} Souls token and an {Aura} Aura token for the purpose of Evil events. On death, add a {Souls} Souls.", "{Monster} Monster", "{Creeping_Nightmare}", kCards.PlayerDeck_Vampire));
    card_deck.push(new Standard_Card("Terror in the Dark", "Suffer a {Power} Power 8 attack. +1 per {Souls} Souls. If {Aura} Aura, may force the Hero to walk one room towards the Entrance Hall.", "{Event} Event", "{Creeping_Nightmare}", kCards.PlayerDeck_Vampire));
    card_deck.push(new Standard_Card("Living Nightmare", "If {Souls} Souls, suffer 2 {Damage} Damage. Add 2 {Souls} Souls. May move any number of {Souls} Souls to adjacent rooms.", "{Event} Event", "{Creeping_Nightmare}", kCards.PlayerDeck_Vampire));

	cards_per_page = 16;
};

// Player Deck - Adventurers
function generate_player_deck_adventurers_base_deck() {
	// card_deck = [];
	
    card_deck.push(new Standard_Card("Murky Passage", "If {Sewers} Sewers, move to any {Sewers} Sewers. If no {Sewers} Sewers, move to nearest {Sewers} Sewers.", "{Event} Event", "{Base}", kCards.PlayerDeck_Adventurers));
    card_deck.push(new Standard_Card("Fortuitous Discovery", "All Heroes in rooms with {Armour} Armour gain +1 to all stats until they take {Damage} Damage. Gain an item.", "{Event} Event", "{Base}", kCards.PlayerDeck_Adventurers));
    card_deck.push(new Standard_Card("Seek Refuge", "Play after a draw from the Event deck. \n \n Ignore the event draw. If {Ruins} Ruins, instead apply the event draw to the nearest Monster.", "{Instant} Instant", "{Base}", kCards.PlayerDeck_Adventurers));
    card_deck.push(new Standard_Card("Inner Resolve", "Play when a Hero would become Wounded or Terrified. \n \n Ignore the failed check and heal 1 {Damage} Damage to {Wisdom} Wisdom", "{Instant} Instant", "{Base}", kCards.PlayerDeck_Adventurers));
    card_deck.push(new Standard_Card("War Axe", "+2 to attacks if {Bones} Bones. When Monsters in the room take {Damage} Damage, if no {Bones} Bones, add a {Bones} Bones. \n \n This {Item} Item stays with the Hero.", "{Item} Item", "{Base}", kCards.PlayerDeck_Adventurers));
    card_deck.push(new Standard_Card("Staff of Power", "+1 to all stats per Hero in {Aura} Aura. \n \n This {Item} Item stays with the Hero.", "{Item} Item", "{Base}", kCards.PlayerDeck_Adventurers));
    card_deck.push(new Standard_Card("Blazing Torches", "Play when a room is explored. \n \n In these two rooms, Heroes may ignore one feature when resolving events. \n \n This {Feature} Feature remains on the board.", "{Feature} Feature", "{Base}", kCards.PlayerDeck_Adventurers));
    card_deck.push(new Standard_Card("Rituals of Cleansing", "Remove all {Souls} Souls in nearest {Souls} Souls. Heal 1 {Damage} Damage.", "{Event} Event", "{Base}", kCards.PlayerDeck_Adventurers));

	cards_per_page = 16;
};
function generate_player_deck_adventurers_thieves_guild_deck() {
	// card_deck = [];
	
    card_deck.push(new Standard_Card("Dodge the Sentries", "In either order: Move up to one room. Move nearest Monster up to two rooms.", "{Event} Event", "{Thieves_Guild}", kCards.PlayerDeck_Adventurers));
    card_deck.push(new Standard_Card("Lie in Wait", "Move to nearest Monster. If either room has {Sewers} Sewers, perform a surprise attack. If there are no Monsters on the board, move to any {Sewers} Sewers.", "{Event} Event", "{Thieves_Guild}", kCards.PlayerDeck_Adventurers));
    card_deck.push(new Standard_Card("Bid Farewell", "Play after a draw from the Event deck. \n \n Ignore the event draw. If {Sewers} Sewers, move up to three rooms. ", "{Instant} Instant", "{Thieves_Guild}", kCards.PlayerDeck_Adventurers));
    card_deck.push(new Standard_Card("Courageous Charge", "Play after a draw from the Event deck. \n \n If Monster, perform a surprise attack. In one stat, heal 1 {Damage} Damage per {Damage} Damage dealt. In the other stat, heal 1 {Damage} Damage.", "{Instant} Instant", "{Thieves_Guild}", kCards.PlayerDeck_Adventurers));
    card_deck.push(new Standard_Card("Skirmisher's Blade", "Ignore event draws from {Sewers} Sewers. When attacked, may avoid second round of combat by moving one room. \n \n This {Item} Item stays with the Hero.", "{Item} Item", "{Thieves_Guild}", kCards.PlayerDeck_Adventurers));
    card_deck.push(new Standard_Card("Assassin's Cloak", "When entering a room, gain +1 to all stats until taking {Damage} Damage. If {Sewers} Sewers, may turn regular attacks into surprise attacks while buffed. \n \n This {Item} Item stays with the Hero.", "{Item} Item", "{Thieves_Guild}", kCards.PlayerDeck_Adventurers));
    card_deck.push(new Standard_Card("Hidden Passages", "Play when a room is explored. \n \n In these two rooms, when not debuffed, instead of suffering {Damage} Damage, Heroes may move one room and gain -1 to all stats until taking {Damage} Damage. \n \n This {Feature} Feature remains on the board.", "{Feature} Feature", "{Thieves_Guild}", kCards.PlayerDeck_Adventurers));
    card_deck.push(new Standard_Card("Flee into Shadows", "Play after a draw from the Event deck. \n \n Reveal an unexplored room within 2 rooms. If either room has {Sewers} Sewers, move to the room, then resolve the event draw.", "{Instant} Instant", "{Thieves_Guild}", kCards.PlayerDeck_Adventurers));

	cards_per_page = 16;
};
function generate_player_deck_adventurers_treasure_hunters_deck() {
	// card_deck = [];
	
    card_deck.push(new Standard_Card("Loot and Plunder", "More to nearest {Armour} Armour. If the {Armour} Armour is animated, deanimate it. Gain an item.", "{Event} Event", "{Treasure_Hunters}", kCards.PlayerDeck_Adventurers));
    card_deck.push(new Standard_Card("Cleansing Flame", "Destroy an Evil item held by any Hero. Heal 1 {Damage} Damage from that Hero. Deal 1 {Damage} Damage to each Monster in that room.", "{Event} Event", "{Treasure_Hunters}", kCards.PlayerDeck_Adventurers));
    card_deck.push(new Standard_Card("Windfall", "Play after a draw from the Event deck. \n \n Ignore the event draw. If {Armour} Armour, replace the event draw with a Good {Item} Item event.", "{Instant} Instant", "{Treasure_Hunters}", kCards.PlayerDeck_Adventurers));
    card_deck.push(new Standard_Card("Salvage", "Play when an item would be lost. \n \n Equip the item to the nearest Hero. Equipped Hero gains +1 to all stats until taking {Damage} Damage.", "{Instant} Instant", "{Treasure_Hunters}", kCards.PlayerDeck_Adventurers));
    card_deck.push(new Standard_Card("Crippling Flail", "When your first swing in combat deals {Damage} Damage, make the combat a surprise attack. May discard this to immediately perform a surprise attack. \n \n This {Item} Item stays with the Hero.", "{Item} Item", "{Treasure_Hunters}", kCards.PlayerDeck_Adventurers));
    card_deck.push(new Standard_Card("Guard's Halberd", "When a Monster is summoned in or enters the room, +2 to next attack. When a Monster in the room is slain, +2 to next check to survive. May discard this to gain +4 to next attack. \n \n This {Item} Item stays with the Hero.", "{Item} Item", "{Treasure_Hunters}", kCards.PlayerDeck_Adventurers));
    card_deck.push(new Standard_Card("Plentiful Hoards", "Play when a room is explored. \n \n In these two rooms, replace all Good {Events} Events with Good {Item} Item events and when an {Item} Item is lost, return it to your hand. \n \n This {Feature} Feature remains on the board.", "{Item} Item", "{Treasure_Hunters}", kCards.PlayerDeck_Adventurers));
    card_deck.push(new Standard_Card("Ancient Longsword", "Every time an attack misses, +1 to attacks until next hit. If {Armour} Armour, +1 to checks against Wounded and Terrified. May discard this item to ignore a failed check against Wounded or Terrified. \n \n This {Item} Item stays with the Hero.", "{Item} Item", "{Treasure_Hunters}", kCards.PlayerDeck_Adventurers));

	cards_per_page = 16;
};

// Time Deck
function generate_time_deck() {
	// card_deck = [];
	
    for (let i = 0; i < 5; i++) { // 5 (+2?)
        card_deck.push(new Standard_Card("A New Hero", "Adventurers choose one of the remaining Heroes. Place that Hero in the Entrance Hall.", "", "", kCards.TimeDeck));
    }
    for (let i = 0; i < 6; i++) { // 6 (+2?)
        card_deck.push(new Standard_Card("A Brief Respite", "Heal 1 {Damage} Damage from any Hero.", "", "", kCards.TimeDeck));
    }
    for (let i = 0; i < 10; i++) { // 10
        card_deck.push(new Standard_Card("Ill Omens", "Modify the Event Deck to increase the danger level.", "", "", kCards.TimeDeck));
    }
    for (let i = 0; i < 10; i++) { // 10
        card_deck.push(new Standard_Card("Night Falls", "Time of Day becomes Night. Vampire may draw to 10 cards in hand.", "", "", kCards.TimeDeck));
    }
    for (let i = 0; i < 10; i++) { // 10
        card_deck.push(new Standard_Card("Sunrise", "Time of Day becomes Day. Adventurers may draw to 10 cards in hand. Reset attempts on Features and Rooms.", "", "", kCards.TimeDeck));
    }
    card_deck.push(new Standard_Card("Overwhelming Darkness", "All Heroes flee the castle. The Vampire wins the game.", "", "", kCards.TimeDeck));

	cards_per_page = 16;
};

// Event Deck

// Hero Deck

// Hero Deck - Turn Cards

// Disaster Deck

// Boon Deck

// Small Items Deck

// Set Randomization - Vampire

// Set Randomization - Adventurers

// Misc Special - Sword, Charm, Vampire, Armour, Ratman


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
    ctx.fillStyle = kColors.Ghost_White;
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
	ctx.strokeStyle = kColors.Ghost_White;
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

	ctx.strokeStyle = kColors.Slate_Black;
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
    buttons.push(new Cust_Button((width*0.5)-200, 200+(75*0), 400, 50, "Player Deck - Vampire", function() {
        setup_set_pick(kCards.PlayerDeck_Vampire);
    }));
    buttons.push(new Cust_Button((width*0.5)-200, 200+(75*1), 400, 50, "Player Deck - Adventurers", function() {
        setup_set_pick(kCards.PlayerDeck_Adventurers);
    }));
    buttons.push(new Cust_Button((width*0.5)-200, 200+(75*2), 400, 50, "Time Deck", function() {
        setup_set_pick(kCards.TimeDeck);
    }));
    buttons.push(new Cust_Button((width*0.5)-200, 200+(75*3), 400, 50, "Event Deck", function() {
        setup_set_pick(kCards.EventDeck);
    }));
    buttons.push(new Cust_Button((width*0.5)-200, 200+(75*4), 400, 50, "Hero Deck", function() {
        setup_set_pick(kCards.HeroDeck);
    }));
    buttons.push(new Cust_Button((width*0.5)-200, 200+(75*5), 400, 50, "Hero Deck - Turn Cards", function() {
        setup_set_pick(kCards.HeroDeck_TurnCards);
    }));
    buttons.push(new Cust_Button((width*0.5)-200, 200+(75*6), 400, 50, "Disaster/Boon Decks", function() {
        setup_set_pick(kCards.DisasterBoonDeck);
    }));
    buttons.push(new Cust_Button((width*0.5)-200, 200+(75*7), 400, 50, "Small Items Deck", function() {
        setup_set_pick(kCards.SmallItemsDeck);
    }));
    buttons.push(new Cust_Button((width*0.5)-200, 200+(75*8), 400, 50, "Set Randomization - Vampire", function() {
        setup_set_pick(kCards.SetRandomization_Vampire);
    }));
    buttons.push(new Cust_Button((width*0.5)-200, 200+(75*9), 400, 50, "Set Randomization - Adventurers", function() {
        setup_set_pick(kCards.SetRandomization_Adventurers);
    }));
    // buttons.push(new Cust_Button((width*0.5)-200, 200+(75*11), 400, 50, "New Cards - Evil", function() {
    //     setup_set_pick(kCards.NEW_EVIL);
    // }));
    // buttons.push(new Cust_Button((width*0.5)-200, 200+(75*12), 400, 50, "New Cards - Good", function() {
    //     setup_set_pick(kCards.NEW_GOOD);
    // }));
    draw_type_pick();
};
function setup_set_pick(type) {
    ctx.textAlign = "center";
    ctx.font = "20px Garamond";
	
	switch (type) {
		case kCards.PlayerDeck_Vampire:
			generate_player_deck_vampire_base_deck();
			generate_player_deck_vampire_ravenous_beasts_deck();
            generate_player_deck_vampire_crumbling_fortress_deck();
            generate_player_deck_vampire_creeping_nightmare_deck();
			break;
		case kCards.PlayerDeck_Adventurers:
            generate_player_deck_adventurers_base_deck();
            generate_player_deck_adventurers_thieves_guild_deck();
            generate_player_deck_adventurers_treasure_hunters_deck();
			break;
		case kCards.TimeDeck:
            generate_time_deck();
			break;
		case kCards.EventDeck:
			break;
		case kCards.HeroDeck:
			break;
		case kCards.HeroDeck_TurnCards:
			break;
		case kCards.DisasterBoonDeck:
			break;
		case kCards.SmallItemsDeck:
			break;
		case kCards.SetRandomization_Vampire:
			break;
		case kCards.SetRandomization_Adventurers:
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