import Description from '../Description/Description';
import TechList from '../TechList/TechList';
import Title from '../Title/Title';
import classes from './Header.module.scss';

export default function Header({title, description, stack}: IHeaderProps) {
  return (
    <div className={classes.Header}>
      <Title>{title}</Title>
      {stack && (
        <div className={classes.techList}>
          <TechList>{stack}</TechList>
        </div>
      )}
      {description && <Description>{description}</Description>}
    </div>
  );
}

interface IHeaderProps {
  title: string;
  description?: string;
  stack?: readonly string[];
}
