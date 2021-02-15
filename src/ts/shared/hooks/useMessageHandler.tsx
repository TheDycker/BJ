import * as React from "react";

const useMessageHandler = (initialState: string | null) => {
  const [message, setMessage] = React.useState(initialState);
  const showMessage = (newMessage: string | null) => {
    setMessage(newMessage);
    window.setTimeout(() => {
      setMessage(null);
    }, 2000);
  };
  return { message, showMessage };
};

export default useMessageHandler;
