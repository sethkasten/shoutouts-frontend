import { Link } from "react-router-dom";
import ShoutOut from "../models/ShoutOut";
import "./ShoutOutItem.css";

interface Props {
  item: ShoutOut;
  deleteShoutOutHandler: (id: string) => void;
}

const ShoutOutItem = ({ item, deleteShoutOutHandler }: Props) => {
  return (
    <li className="ShoutOutItem">
      <h2>
        Shout out to{" "}
        <Link to={`/user/${encodeURIComponent(item.to)}`}>{item.to}</Link>
      </h2>
      <p>
        - from {item.photoURL && <img src={item.photoURL} alt={item.from} />}
        <Link to={`/user/${encodeURIComponent(item.from)}`}>{item.from}</Link>
      </p>
      <p>{item.message}</p>
      {item.image && <img src={item.image} alt="user upload" />}
      <button onClick={() => deleteShoutOutHandler(item._id!)}>x</button>
    </li>
  );
};

export default ShoutOutItem;
