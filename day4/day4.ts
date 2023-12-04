export function A(input: string[]): number {
  let sum = 0;

  input.forEach((card) => {
    let winningNumbs = card
      .split(":")[1]
      .split("|")[0]
      .split(" ")
      .filter((x) => x != "");
    let ticketNumbers = card
      .split(":")[1]
      .split("|")[1]
      .split(" ")
      .filter((x) => x != "");

    let amountOfWinningNumbs = 0;

    winningNumbs.forEach((winningNumb) => {
      if (ticketNumbers.includes(winningNumb)) {
        amountOfWinningNumbs++;
      }
    });

    if (amountOfWinningNumbs > 0) {
      sum += Math.pow(2, amountOfWinningNumbs - 1);
    }
  });

  return sum;
}

export function B(input: string[]): number {
  let sum = 0;

  interface Card {
    cardNumber: number;
    amount: number;
    winningCount: number;
  }

  let bonusCards: Card[] = [];

  input.forEach((card, index) => {
    let cardNumber = index;
    let winningNumbs = card
      .split(":")[1]
      .split("|")[0]
      .split(" ")
      .filter((x) => x != "");
    let ticketNumbers = card
      .split(":")[1]
      .split("|")[1]
      .split(" ")
      .filter((x) => x != "");

    let amountOfWinningNumbs = 0;

    winningNumbs.forEach((winningNumb) => {
      if (ticketNumbers.includes(winningNumb)) {
        amountOfWinningNumbs++;
      }
    });

    bonusCards.push({
      cardNumber: cardNumber,
      amount: 1,
      winningCount: amountOfWinningNumbs,
    });
  });

  //loop through all cards
  bonusCards.forEach((bonusCard) => {
    for (let cards = 0; bonusCard.amount > cards; cards++) {
      for (let i = 1; bonusCard.winningCount >= i; i++) {
        bonusCards[bonusCard.cardNumber + i].amount += 1;
      }
    }
  });

  //count amount of cards in bonusCards;
  bonusCards.forEach((bonusCard) => {
    sum += bonusCard.amount;
  });

  return sum;
}
