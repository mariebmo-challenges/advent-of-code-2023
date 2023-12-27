

export function A(input: string): number {
    let lines = input.split("\n");
    let hands : Hand[] = [];

    lines.forEach(line => {
        hands.push(getHand(line));
    });

    hands.sort(sortHands);

    var rank = 1;
    hands.forEach(hand => {hand.rank = rank; rank++;});

    let total = 0;
    hands.forEach(hand => {
        total += hand.bid * hand.rank;
    });
    
    return total;
}

export function B(input: string): number {
    let lines = input.split("\n");
    let hands : Hand[] = [];

    lines.forEach(line => {
        hands.push(getHandWithWildcard(line));
    });

    hands.sort(sortHands);

    var rank = 1;
    hands.forEach(hand => {hand.rank = rank; rank++;});

    let total = 0;
    hands.forEach(hand => {
        total += hand.bid * hand.rank;
    });
    
    return total;
}

function sortHands(a : Hand, b: Hand): number {
        // Sort by combination, if combination is the same, sort by highest card. If highest card is the same, sort by second highest card, etc.
        if (a.combination !== b.combination) {
            return a.combination - b.combination;
        } else {
            for (let i = 0; i < a.cards.length; i++) {
                if (a.cards[i] !== b.cards[i]) {
                    return a.cards[i] - b.cards[i];
                }
            }
        }
        return 0;
}

function getHand(hand: string): Hand {
    let handSplit = hand.split(" ");
    let cards = handSplit[0].split("");
    let bid = parseInt(handSplit[1]);
    let cardObjects : Card[] = [];

    cards.forEach(card =>{
        switch(card) {
            case "2":
                cardObjects.push(Card.Two);
                break;
            case "3":
                cardObjects.push(Card.Three);
                break;
            case "4":
                cardObjects.push(Card.Four);
                break;
            case "5":
                cardObjects.push(Card.Five);
                break;
            case "6":
                cardObjects.push(Card.Six);
                break;
            case "7":
                cardObjects.push(Card.Seven);
                break;
            case "8":
                cardObjects.push(Card.Eight);
                break;
            case "9":
                cardObjects.push(Card.Nine);
                break;
            case "T":
                cardObjects.push(Card.Ten);
                break;
            case "J":
                cardObjects.push(Card.Jack);
                break;
            case "Q":
                cardObjects.push(Card.Queen);
                break;
            case "K":
                cardObjects.push(Card.King);
                break;
            case "A":
                cardObjects.push(Card.Ace);
                break;
        }
    });

    let handObject: Hand = {input: handSplit[0], cards: [], cardAmount: [], combination: Combination.HighCard, bid: bid, rank: -1 };

    cardObjects.forEach(card => {
        handObject.cards.push(card);

        const foundCard = handObject.cardAmount.find(c => c.card === card);
        if (foundCard !== undefined) {
            foundCard.amount++;
        } else {
            handObject.cardAmount.push({card: card, amount: 1});
        }
    });

    handObject.combination = getCombination(handObject);

    return handObject;
}

function getHandWithWildcard(hand: string): Hand {
    let handSplit = hand.split(" ");
    let cards = handSplit[0].split("");
    let bid = parseInt(handSplit[1]);
    let cardObjects : Card[] = [];

    cards.forEach(card =>{
        switch(card) {
            case "2":
                cardObjects.push(Card.Two);
                break;
            case "3":
                cardObjects.push(Card.Three);
                break;
            case "4":
                cardObjects.push(Card.Four);
                break;
            case "5":
                cardObjects.push(Card.Five);
                break;
            case "6":
                cardObjects.push(Card.Six);
                break;
            case "7":
                cardObjects.push(Card.Seven);
                break;
            case "8":
                cardObjects.push(Card.Eight);
                break;
            case "9":
                cardObjects.push(Card.Nine);
                break;
            case "T":
                cardObjects.push(Card.Ten);
                break;
            case "J":
                cardObjects.push(Card.Joker);
                break;
            case "Q":
                cardObjects.push(Card.Queen);
                break;
            case "K":
                cardObjects.push(Card.King);
                break;
            case "A":
                cardObjects.push(Card.Ace);
                break;
        }
    });

    let handObject: Hand = {input: handSplit[0], cards: [], cardAmount: [], combination: Combination.HighCard, bid: bid, rank: -1 };

    cardObjects.forEach(card => {
        handObject.cards.push(card);

        const foundCard = handObject.cardAmount.find(c => c.card === card);
        if (foundCard !== undefined) {
            foundCard.amount++;
        } else {
            handObject.cardAmount.push({card: card, amount: 1});
        }
    });

    handObject.combination = getCombination(handObject);

    return handObject;
}

function getCombination(hand: Hand): Combination {
    if (isFiveOfAKind(hand)) {
        return Combination.FiveOfAKind;
    } else if (isFourOfAKind(hand)) {
        return Combination.FourOfAKind;
    } else if (isFullHouse(hand)) {
        return Combination.FullHouse;
    } else if (isThreeOfAKind(hand)) {
        return Combination.ThreeOfAKind;
    } else if (isTwoPairs(hand)) {
        return Combination.TwoPairs;
    } else if (isOnePair(hand)) {
        return Combination.OnePair;
    } else if (isHighCard(hand)) {
        return Combination.HighCard;
    }

    return Combination.HighCard;
}

function isFiveOfAKind(hand: Hand): boolean {
    let jokerCount = hand.cardAmount.find(card => card.card === Card.Joker)?.amount ?? 0;

    return hand.cardAmount.some(card => card.amount === 5 - jokerCount) || hand.cardAmount.some(card => card.amount === 5);
}

function isFourOfAKind(hand: Hand): boolean {
    let jokerCount = hand.cardAmount.find(card => card.card === Card.Joker)?.amount ?? 0;

    return hand.cardAmount.some(card => card.card != Card.Joker && card.amount === 4 - jokerCount) || hand.cardAmount.some(card => card.amount === 4);
}

function isFullHouse(hand: Hand): boolean {
    let jokerCount = hand.cardAmount.find(card => card.card === Card.Joker)?.amount ?? 0;

    let handWithoutJoker = hand.cardAmount.filter(card => card.card != Card.Joker);

    if(jokerCount === 0) {
        return handWithoutJoker.some(card => card.amount === 3) && handWithoutJoker.some(card => card.amount === 2);
    } else if (jokerCount === 1) {
        return handWithoutJoker.filter(card => card.amount === 2).length === 2;
    } else if (jokerCount === 2) {
        return handWithoutJoker.some(card => card.amount === 3) || handWithoutJoker.some(card => card.amount === 2);
    }

    return false;
}

function isThreeOfAKind(hand: Hand): boolean {
    let jokerCount = hand.cardAmount.find(card => card.card === Card.Joker)?.amount ?? 0;
    return hand.cardAmount.some(card => card.card != Card.Joker && card.amount === 3 - jokerCount) || hand.cardAmount.some(card => card.amount === 3);
}

function isTwoPairs(hand: Hand): boolean {
    let jokerCount = hand.cardAmount.find(card => card.card === Card.Joker)?.amount ?? 0;
    // the joker(s) can be used as any card. 
    if(hand.cardAmount.filter(card => card.amount === 2).length === 2){
        return true;
    } else if (hand.cardAmount.filter(card => card.amount === 2).length === 1 && jokerCount > 0) {
        return true;
    } else {
        return false;
    }
}

function isOnePair(hand: Hand): boolean {
    let jokerCount = hand.cardAmount.find(card => card.card === Card.Joker)?.amount ?? 0;
    return hand.cardAmount.some(card => card.amount === 2 - jokerCount);
}

function isHighCard(hand: Hand): boolean {
    return hand.cardAmount.every(card => card.amount === 1);
}

enum Card {
    Joker = 0,
    Two = 2,
    Three = 3,
    Four = 4,
    Five = 5,
    Six = 6, 
    Seven = 7,
    Eight = 8,
    Nine = 9,
    Ten = 10,
    Jack = 11, 
    Queen = 12,
    King = 13,
    Ace = 14
}

enum Combination {
    HighCard = 1,
    OnePair = 2,
    TwoPairs = 3,
    ThreeOfAKind = 4,
    FullHouse = 5,
    FourOfAKind = 6,
    FiveOfAKind = 7
}

interface Hand {
    input: string;
    cards: Card[];
    cardAmount: {card: Card, amount: number}[];
    combination: Combination;
    bid: number;
    rank: number;
}