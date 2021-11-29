import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import ShoutOut from "../models/ShoutOut";
import {
  addShoutOut,
  deleteShoutOut,
  getShoutOutsByName,
} from "../services/ShoutOutService";
import AddShoutOutForm from "./AddShoutOutForm";
import ShoutOutsList from "./ShoutOutsList";
import "./UserShoutOuts.css";

interface RouteParams {
  name: string;
}

const UserShoutOuts = () => {
  const [shoutOuts, setShoutOuts] = useState<ShoutOut[]>([]);
  const { name } = useParams<RouteParams>();

  useEffect(() => {
    getShoutOutsByNameHandler(name);
  }, [name]);

  const getShoutOutsByNameHandler = (name: string) => {
    getShoutOutsByName(name).then((response) => setShoutOuts(response));
  };

  const addShoutOutHandler = (shoutOut: ShoutOut): void => {
    addShoutOut(shoutOut).then(() => getShoutOutsByNameHandler(name));
  };

  const deleteShoutOutHandler = (id: string): void => {
    deleteShoutOut(id).then(() => {
      getShoutOutsByNameHandler(name);
    });
  };

  return (
    <div className="UserShoutOuts">
      <h1>Shout outs for {}</h1>
      <Link to="/">Back to All Shoutouts</Link>
      <ShoutOutsList
        shoutOuts={shoutOuts}
        deleteShoutOutHandler={deleteShoutOutHandler}
      />
      <AddShoutOutForm
        addShoutOutHandler={addShoutOutHandler}
        recipient={name}
      />
    </div>
  );
};

export default UserShoutOuts;
