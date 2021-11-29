import { FormEvent, useContext, useRef, useState } from "react";
import AuthContext from "../context/AuthContext";
import ShoutOut from "../models/ShoutOut";
import "./AddShoutOutForm.css";
import { storage } from "../firebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

interface Props {
  addShoutOutHandler: (shoutOut: ShoutOut) => void;
  recipient?: string;
}

const AddShoutOutForm = ({ addShoutOutHandler, recipient }: Props) => {
  const { user } = useContext(AuthContext);
  const [to, setTo] = useState(recipient || "");
  const [from, setFrom] = useState(user?.displayName || "");
  const [message, setMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    let shoutOut: ShoutOut = {
      to,
      from,
      message,
      ...(user?.photoURL ? { photoURL: user.photoURL } : {}),
    };
    const files = fileInputRef.current?.files;
    if (files && files[0]) {
      const file = files[0]; // Here is the file we need
      const storageRef = ref(storage, file.name);
      uploadBytes(storageRef, file).then((snapshot) => {
        console.log(snapshot.ref.fullPath);
        getDownloadURL(snapshot.ref).then((response) => {
          console.log(response);
          shoutOut.image = response;
          addShoutOutHandler(shoutOut);
        });
      });
    } else {
      addShoutOutHandler(shoutOut);
    }
  };

  return (
    <form className="AddShoutOutForm" onSubmit={submitHandler}>
      <label htmlFor="to">To</label>
      <input
        type="text"
        name="to"
        id="to"
        value={to}
        onChange={(e) => {
          setTo(e.target.value);
        }}
      />
      <label htmlFor="from">From</label>
      <input
        type="text"
        name="from"
        id="from"
        value={from}
        disabled
        onChange={(e) => {
          setFrom(e.target.value);
        }}
      />
      <label htmlFor="message">Message</label>
      <textarea
        name="message"
        id="message"
        cols={30}
        rows={10}
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
        }}
      ></textarea>
      <input ref={fileInputRef} type="file" />
      <button>Add ShoutOut</button>
    </form>
  );
};

export default AddShoutOutForm;
