const InfoBox = (props) => {
  return (
    <div
      className={`${props.className} text-secondary flex flex-col items-center rounded-md bg-gray-100 px-5 pb-2 dark:bg-gray-900`}
    >
      <h3 className="-translate-y-1/2 rounded-xl bg-white px-3 py-1 text-2xl dark:bg-gray-700">
        {props.heading}
      </h3>
      <div className="-mt-2 w-full pb-2">
        {props.children.map((child, index) => {
          return (
            <>
              <div
                key={index}
                className="my-1 flex w-full items-center gap-4 text-lg"
              >
                {child}
              </div>
              {index < props.children.length - 1 && (
                <hr className="my-4 w-full border-t border-gray-400 dark:border-gray-500" />
              )}
            </>
          );
        })}
      </div>
    </div>
  );
};

export default InfoBox;
