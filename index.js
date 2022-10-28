const fs = require('fs');
const { transactions } = require('./input');

// run the run() function in the terminal by writing 'node index.js', it will read from the file input.js and givr you results.
// I couldn't get it to write into a txt file yet since the writeFile function only takes in a string or buffer and I had an object.
// for now it can only write into a terminal/console

const cashRegister = (till, transaction) => {

  //till start
  let tillStart = 0;
  for (const amount in till) {
    tillStart = tillStart + till[amount] * amount.slice(1);
  }

  // transaction total
  let transactionTotal = 0;
  for (const item in transaction) {
    if (item !== "paid") {
      transactionTotal += parseInt(transaction[item].slice(1));
    }
  }

  //paid
  const cashPaid = transaction.paid.split("-");

  //add to till
  for (let cash of cashPaid) {
    if (cash.trim("-") in till) {
      till[cash.trim()] = till[cash.trim()] + 1;
    } else {
      till[cash.trim()] = 1;
    }
  }

  const paid = cashPaid.reduce((totalCash, cash) => {
    return totalCash + parseInt(cash.trim().slice(1));
  }, 0);

  //total change
  const totalChange = paid - transactionTotal;

  //change breakdown
  let change = totalChange;
  const changeBreakdown = [];

  for (const cash in till) {
    if (change == 0) break;

    while (cash.slice(1) <= change && till[cash] > 0) {
      till[cash] = till[cash] - 1;
      change = change - cash.slice(1);
      changeBreakdown.push(cash);
      if (change == 0) break;
    }
  }

  console.log(
    tillStart,
    transactionTotal,
    paid,
    totalChange,
    changeBreakdown.join("-")
  );
  return;
};

//Run
const run = () => {
  //Data
  const till = {
    R50: 5,
    R20: 5,
    R10: 6,
    R5: 12,
    R2: 10,
    R1: 10,
  };

  for (let transaction of transactions) {
    cashRegister(till, transaction);
  }
};

run();

