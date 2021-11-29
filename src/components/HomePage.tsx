import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import ShoutOut from "../models/ShoutOut";
import TopFiveItem from "../models/TopFiveItem";
import {
  addShoutOut,
  deleteShoutOut,
  getAllShoutOuts,
  getTopFive,
} from "../services/ShoutOutService";
import AddShoutOutForm from "./AddShoutOutForm";
import "./HomePage.css";
import ShoutOutsList from "./ShoutOutsList";

const HomePage = () => {
  const { user } = useContext(AuthContext);
  const [shoutOuts, setShoutOuts] = useState<ShoutOut[]>([]);
  const [topFive, setTopFive] = useState<TopFiveItem[]>([]);

  useEffect(() => {
    getAllShoutOutsHandler();
    getTopFive().then((response) => setTopFive(response));
  }, []);

  const getAllShoutOutsHandler = (): void => {
    getAllShoutOuts().then((response) => {
      setShoutOuts(response);
    });
  };

  const addShoutOutHandler = (shoutOut: ShoutOut): void => {
    addShoutOut(shoutOut).then(() => {
      getAllShoutOutsHandler();
    });
  };

  const deleteShoutOutHandler = (id: string): void => {
    deleteShoutOut(id).then(() => {
      getAllShoutOutsHandler();
    });
  };

  return (
    <div className="HomePage">
      <h1>All Shout Outs</h1>
      <p>TOP FIVE NAMES</p>
      <ul>
        {topFive.map((item) => (
          <li key={item._id}>
            <Link to={`/user/${encodeURIComponent(item.name)}`}>
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
      <ShoutOutsList
        shoutOuts={shoutOuts}
        deleteShoutOutHandler={deleteShoutOutHandler}
      />
      {user && <AddShoutOutForm addShoutOutHandler={addShoutOutHandler} />}
    </div>
  );
};

export default HomePage;
