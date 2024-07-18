const List = (props) => {
  return (
    <details className="group [&_summary::-webkit-details-marker]:hidden">
      <summary className="list-primary flex items-center justify-between">
        <span className="text-base font-medium"> {props.heading} </span>
        <span className="shrink-0 transition duration-300 group-open:-rotate-180">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="text-secondary h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </summary>
      <ul className="mt-2 space-y-1 px-4">
        {props.children.map((child, index) => {
          return <li key={index}>{child}</li>;
        })}
      </ul>
    </details>
  );
};

export default List;
