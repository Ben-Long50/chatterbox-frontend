const InfoBox = (props) => {
  return (
    <div
      className={`${props.className} text-secondary flex flex-col items-center rounded-md border border-gray-700 px-5 pb-2 dark:border-gray-200`}
    >
      <h3 className="-translate-y-1/2 bg-white px-2 text-2xl dark:bg-gray-700">
        {props.heading}
      </h3>
      {props.children.map((child, index) => {
        return (
          <div
            key={index}
            className="my-1 flex w-full items-center gap-4 self-start text-lg"
          >
            {child}
          </div>
        );
      })}
    </div>
  );
};

export default InfoBox;
