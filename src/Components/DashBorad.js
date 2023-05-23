import React, { useContext, useRef, useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import DataContext from "./Store/data-context";
import { useSelector, useDispatch } from "react-redux";
import { ThemeActions } from "./Index/Index";

const DashBoard = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);

  const [expenses, setExpenses] = useState({});
  const [expenseLoaded, setExpenseLoaded] = useState(false);
  const Authctx = useContext(DataContext);
  const token = Authctx.token;
  const MoneyInputref = useRef();
  const DisInputRef = useRef();
  const CategoryInputRef = useRef();

  function submitHandler(event) {
    if (event) {
      event.preventDefault();
    }

    const EnteredMoney = MoneyInputref.current.value;
    const EnteredDis = DisInputRef.current.value;
    const EnteredCategory = CategoryInputRef.current.value;

    const expenseData = {
      price: EnteredMoney,
      description: EnteredDis,
      category: EnteredCategory,
    };

    fetch(
      "https://expense-tracker-13c13-default-rtdb.firebaseio.com/expense.json",
      {
        method: "POST",
        body: JSON.stringify(expenseData),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          res.json().then((data) => {
            const newExpense = {
              id: data.name,
              ...expenseData,
            };
            setExpenses((prevExpenses) => ({
              ...prevExpenses,
              [data.name]: newExpense,
            }));
            setExpenseLoaded(true);
            // downloadExpenses(newExpense); // Download the updated expenses
          });
        } else {
          throw new Error("Error adding expense.");
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  function deleteExpenseHnadler(id) {
    fetch(
      `https://expense-tracker-13c13-default-rtdb.firebaseio.com/expense/${id}.json`,
      {
        method: "DELETE",
      }
    )
      .then((res) => {
        if (res.ok) {
          setExpenses((prevExpenses) => {
            const updatedExpenses = { ...prevExpenses };
            delete updatedExpenses[id];
            return updatedExpenses;
          });
          console.log("expense deleted successfully");
        } else {
          throw new Error("error in deleting expense");
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  function EditExpenseHnadler(id, updatedExpenses) {
    fetch(
      `https://expense-tracker-13c13-default-rtdb.firebaseio.com/expense/${id}.json`,
      {
        method: "PUT",
        body: JSON.stringify(updatedExpenses),
        headers: {
          "content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          setExpenses((prevExpenses) => ({
            ...prevExpenses,
            [id]: updatedExpenses,
          }));
        } else {
          throw new Error("error updating expense");
        }
      })
      .catch((error) => {
        console.log(error.message);
      });

    // Trigger download
  }

  useEffect(() => {
    console.log("Fetching expenses...");
    function CSVmake() {
      if (expenses != null) {
        const csvcontent = Object.entries(expenses)
          .map(
            ([id, expense]) =>
              `${expense.price},${expense.description},${expense.category}`
          )
          .join("\n");
        return csvcontent;
      }
    }

    // const csvContent = CSVmake();
    const blob = new Blob([CSVmake()]);
    const url = URL.createObjectURL(blob);
    const a1 = document.getElementById("form-js");
    a1.href = url;
    // submitHandler(); // Fetch expenses when component mounts
  }, [expenses]);
  function toggleThemeHnalder() {
    dispatch(ThemeActions.toggleTheme());
  }

  console.log("Expense loaded:", expenseLoaded);
  console.log("Expenses:", expenses);

  const totalExpense = Object.values(expenses).reduce(
    (total, expense) => total + parseInt(expense.price),
    0
  );
  const premiumHandler = () => {};

  return (
    <div>
      {totalExpense > 10000 && (
        <div>
          <Button onClick={premiumHandler}>Active Premium</Button>
        </div>
      )}

      <div className={`container ${theme}`}>
        <a id="form-js" download="file.csv">
          Download
        </a>

        {totalExpense > 10000 && (
          <button
            onClick={toggleThemeHnalder}
            style={{
              position: "fixed",
              top: "10px",
              right: "10px",
            }}
          >
            Toggle Theme
          </button>
        )}

        <form onSubmit={submitHandler}>
          <div className="form-group">
            <label htmlFor="money" className="form-control">
              Money $:
            </label>
            <input
              type="number"
              className="col-sm-2"
              ref={MoneyInputref}
              id="money"
            />
          </div>
          <div className="form-group">
            <label htmlFor="description" className="form-control">
              Description:
            </label>
            <input
              type="text"
              className="col-sm-2"
              ref={DisInputRef}
              id="description"
            />
          </div>
          <div className="form-group">
            <label htmlFor="type" className="form-control">
              Category:
            </label>
            <select className="col-sm-2" ref={CategoryInputRef} id="catogory">
              <option>Food</option>
              <option>Movie</option>
              <option>Dinner</option>
            </select>
          </div>

          <div className="form-group">
            <Button type="submit">Add</Button>
          </div>
        </form>
        {expenseLoaded && (
          <div>
            <h2>Expenses</h2>
            {Object.entries(expenses).map(([id, expense]) => (
              <div key={id}>
                <p>price: {expense.price}</p>
                <p>description: {expense.description}</p>
                <p>Category: {expense.category}</p>
                <button
                  onClick={() => {
                    EditExpenseHnadler(id, expense);
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    deleteExpenseHnadler(id);
                  }}
                >
                  DELETE
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashBoard;
