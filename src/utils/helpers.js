// Generates random color

const generateRandomColor = () => {
  const existingBudgetLength = fetchData("budgets")?.length ?? 0;
  return `${existingBudgetLength * 34} 65% 50%`;
};

// LocalStorage

// fetches any data given a Key in our LocalStorage and return to us.
export const fetchData = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

// Delete item from LocalStorage, both user and items

export const deleteItem = ({ key, id }) => {
  const existingData = fetchData(key);
  if (id) {
    const newData = existingData.filter((item) => item.id !== id);
    return localStorage.setItem(key, JSON.stringify(newData));
  }
  return localStorage.removeItem(key);
};

// Get all items from LocalStorage
export const getAllMatchingItems = ({ category, key, value }) => {
  // fetch the data
  const data = fetchData(category) ?? [];
  return data.filter((item) => item[key] === value);
};

//Create Budget

export const createBudget = ({ name, amount }) => {
  const newItem = {
    id: crypto.randomUUID(),
    name: name,
    createdAt: Date.now(),
    amount: Number.parseInt(amount, 10),
    color: generateRandomColor(),
  };

  // Give me the Budget if exits or give an empty array []
  const existingBudget = fetchData("budgets") ?? [];

  return localStorage.setItem(
    "budgets",
    JSON.stringify([...existingBudget, newItem])
  );
};

//Create Expense

export const createExpense = ({ name, amount, budgetId }) => {
  const newItem = {
    id: crypto.randomUUID(),
    name: name,
    createdAt: Date.now(),
    amount: Number.parseInt(amount, 10),
    budgetId: budgetId,
  };

  // Give me the Expense if exits or give an empty array []
  const existingExpenses = fetchData("expenses") ?? [];

  return localStorage.setItem(
    "expenses",
    JSON.stringify([...existingExpenses, newItem])
  );
};

// Generte Delay to the Button when submitting for Budget
export const generateDelay = () =>
  new Promise((resolve) => setTimeout(resolve, Math.random() * 400));

// Sepending the Budget
//  1) Total spent By Budget - Pass the BudetID, and grab all the expense using FetchData and loop
// through the expense and get the total value
export const calculateBudgetSpent = (budgetId) => {
  const expense = fetchData("expenses") ?? [];
  // Loop through the Budget and add check the bugetID matches we adding
  const budgetSpend = expense.reduce((current, target) => {
    // Check if the target i.e expense.id === budgetId
    if (target.budgetId !== budgetId) {
      return current;
    }
    // Add the current Amount to Total;
    return (current = current + target.amount);
  }, 0);
  return budgetSpend;
};

// Formatting the Existing Budgets

// 1) Format currency
export const formatCurrency = (amount) => {
  return amount.toLocaleString(undefined, {
    style: "currency",
    currency: "CAD",
  });
};

//2. Formatting Percentages
export const formatPercentage = (amount) => {
  // undefined means it will use the user visting the site locale
  return amount.toLocaleString(undefined, {
    style: "percent",
    minimumFractionsDigits: 0,
  });
};

//3. Formatting to Epoch Number
export const formatDateToLocaleString = (epoch) =>
  new Date(epoch).toLocaleDateString();
