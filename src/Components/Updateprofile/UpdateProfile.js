import { Button, Form } from "react-bootstrap";
import { useRef, useContext, useEffect } from "react";
import DataContext from "../Store/data-context";
const Update = () => {
  const Authctx = useContext(DataContext);
  const NameInputRef = useRef();
  const PhotoUrlRef = useRef();
  const token = Authctx.token;
  useEffect(() => {
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyB0dJAXTRrEtEpkORTaa2uVCWs1LHzJGgY",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: token,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("failed to fetch");
        }
      })
      .then((data) => {
        const user = data.users[0];
        NameInputRef.current.value = user.displayName;
        PhotoUrlRef.current.value = user.PhotoUrl;
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [token]);

  function submitHandler(e) {
    const Enterdname = NameInputRef.current.value;
    const EnterdUrl = PhotoUrlRef.current.value;
    e.preventDefault();
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyB0dJAXTRrEtEpkORTaa2uVCWs1LHzJGgY",
      {
        method: "POST",
        body: JSON.stringify({
          name: Enterdname,
          url: EnterdUrl,
          ReturnSecureToken: true,
          idToken: token,
          deleteAttribute: [],
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          //localStorage.setItem("login", JSON.stringify(data));
          //Authctx.Login(data.idToken);
          // console.log(data.idToken);
          // window.location.href = "/DashBoard";
          console.log(data);
        });
      } else {
        res.json().then((data) => {
          alert(data.error.message);
        });
      }
    });
  }
  return (
    <Form onSubmit={submitHandler}>
      <div>
        <label className="col-sm-2 col-form-label">Full Name</label>
        <input type="text" ref={NameInputRef}></input>
      </div>
      <div>
        <label className="col-sm-2 col-form-label">profile photo URL</label>
        <input type="text" ref={PhotoUrlRef}></input>
      </div>
      <Button type="submit" style={{ text: "center" }}>
        Update
      </Button>
    </Form>
  );
};
export default Update;
