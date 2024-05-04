// Toggable.tsx
import { forwardRef, useImperativeHandle, useRef, useState } from "react";

type TogglableProps = {
  buttonLabel: string;
  children: React.ReactNode;
};

const Togglable = forwardRef<any, TogglableProps>(
  ({ buttonLabel, children }, ref) => {
    const [visible, setVisible] = useState(false);

    const hideWhenVisible = { display: visible ? "none" : "" };
    const showWhenVisible = { display: visible ? "" : "none" };

    const toggleVisibility = () => {
      setVisible(!visible);
    };

    useImperativeHandle(ref, () => ({
      toggleVisibility,
    }));

    return (
      <div>
        <div style={hideWhenVisible}>
          <button
            onClick={toggleVisibility}
            className="px-3 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 focus:bg-green-800"
          >
            {buttonLabel}
          </button>
        </div>
        <div style={showWhenVisible}>
          {children}
          <button
            className="mt-2 px-3 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 focus:bg-red-800"
            onClick={toggleVisibility}
          >
            cancel
          </button>
        </div>
      </div>
    );
  }
);

export default Togglable;
