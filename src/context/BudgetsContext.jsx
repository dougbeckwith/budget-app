import React, {useContext} from 'react'
import {v4 as uuidv4} from 'uuid'
import useLocalStorage from '../hooks/useLocalStorage'

const BudgetsContext = React.createContext()
export function useBudgets() {
  return useContext(BudgetsContext)
}

// {
//     id:
//     name:
//     max
// }
// {
//     id:
//     budgetId:
//     amount:
//     descript:
// }

export const BudgetsProvider = ({children}) => {
  const [budgets, setBudgets] = useLocalStorage('budgets', [])
  const [expenses, setExpenses] = useLocalStorage('expenses', [])

  const getBudgetExpenses = (budgetId) => {
    return expenses.filter((expense) => {
      return expense.budgetId === budgetId
    })
  }
  const addExpense = ({description, amount, budgetId}) => {
    setExpenses((prevExpenses) => {
      return [...prevExpenses, {id: uuidv4(), description, amount, budgetId}]
    })
  }
  const addBudget = ({name, max}) => {
    setBudgets((prevBudgets) => {
      if (
        prevBudgets.find((budget) => {
          return budget.name === name
        })
      ) {
        return prevBudgets
      }
      return [...prevBudgets, {id: uuidv4(), name, max}]
    })
  }
  const deleteBudget = ({id}) => {
    //   TODO: Deal with expenses
    setBudgets((prevBudgets) => {
      return prevBudgets.filter((budget) => {
        return budget.id !== id
      })
    })
  }
  const deleteExpense = ({id}) => {
    setExpenses((prevExpenses) => {
      return prevExpenses.filter((budget) => {
        return budget.id !== id
      })
    })
  }

  return (
    <BudgetsContext.Provider
      value={{
        budgets,
        expenses,
        getBudgetExpenses,
        addExpense,
        addBudget,
        deleteBudget,
        deleteExpense,
      }}>
      {children}
    </BudgetsContext.Provider>
  )
}
