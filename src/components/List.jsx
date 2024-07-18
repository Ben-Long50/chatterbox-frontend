import Icon from '@mdi/react';
import { mdiChevronDown } from '@mdi/js';

const List = (props) => {
  return (
    <details className="group [&_summary::-webkit-details-marker]:hidden">
      <summary className="list-primary flex items-center justify-between">
        <span className="text-base font-medium"> {props.heading} </span>
        <span className="shrink-0 transition duration-300 group-open:-rotate-180">
          <Icon
            path={mdiChevronDown}
            size={1.1}
            className={`text-secondary`}
          ></Icon>
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
