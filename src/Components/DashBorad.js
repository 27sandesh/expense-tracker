import React, { useContext, useRef, useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import DataContext from "./Store/data-context";

const DashBoard = () => {
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
      // Rest of the code...
    }
    const EnteredMoney = MoneyInputref.current.value;
    const EnteredDis = DisInputRef.current.value;
    const EnteredCategory = CategoryInputRef.current.value;
    console.log("money", EnteredMoney);
    console.log("dis", EnteredDis);
    console.log("price", EnteredCategory);

    fetch(
      "https://expense-tracker-13c13-default-rtdb.firebaseio.com/expense.json",
      {
        method: "POST",
        body: JSON.stringify({
          price: EnteredMoney,
          description: EnteredDis,
          category: EnteredCategory,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          console.log("res", res);
          res.json().then((data) => {
            console.log(data);
            const fetchedExpenses = {
              ...expenses,
              [data.name]: {
                price: EnteredMoney,
                description: EnteredDis,
                category: EnteredCategory,
              },
            };
            setExpenses(fetchedExpenses);
            setExpenseLoaded(true);
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
          console.log("expense deleted sucessfully");
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
  }

  useEffect(() => {
    console.log("Fetching expenses...");
    submitHandler(); // Fetch expenses when component mounts
  }, []);

  console.log("Expense loaded:", expenseLoaded);
  console.log("Expenses:", expenses);

  return (
    <div>
      <div className="card">
        <form onSubmit={submitHandler}>
          <div className="form-group">
            <label htmlFor="money" className="form-control">
              Money $:
            </label>
            <input type="number" className="col-sm-2" ref={MoneyInputref} />
          </div>
          <div className="form-group">
            <label htmlFor="description" className="form-control">
              Description:
            </label>
            <input type="text" className="col-sm-2" ref={DisInputRef} />
          </div>
          <div className="form-group">
            <label htmlFor="type" className="form-control">
              Category:
            </label>
            <select className="col-sm-2" ref={CategoryInputRef}>
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
