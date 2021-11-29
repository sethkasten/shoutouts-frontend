import ShoutOut from "../models/ShoutOut";
import ShoutOutItem from "./ShoutOutItem";
import "./ShoutOutsList.css";

interface Props {
  shoutOuts: ShoutOut[];
  deleteShoutOutHandler: (id: string) => void;
}

const ShoutOutsList = ({ shoutOuts, deleteShoutOutHandler }: Props) => {
  return (
    <ul className="ShoutOutsList">
      {shoutOuts.map((item) => (
        <ShoutOutItem
          item={item}
          key={item?._id}
          deleteShoutOutHandler={deleteShoutOutHandler}
        />
      ))}
    </ul>
  );
};

export default ShoutOutsList;
