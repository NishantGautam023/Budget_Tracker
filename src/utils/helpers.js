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

// Delete user / Item
export const deleteItem = ({ key }) => {
  return localStorage.removeItem(key);
};

//Create Budget

export const createBudget = ({ name, amount }) => {
  const newItem = {
    id: crypto.randomUUID,
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
