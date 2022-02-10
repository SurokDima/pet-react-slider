import Tech from '../Tech/Tech';
import classes from './TechList.module.scss';

export default function TechList({ children }: ITechListProps) {
  return (
    <div className={classes.techList}>
      {children.map((tech, index) => {
        return (
          <div key={index} className={classes.tech}>
            <Tech>{tech}</Tech>
          </div>
        );
      })}
    </div>
  );
}

interface ITechListProps {
  children: readonly string[];
}
