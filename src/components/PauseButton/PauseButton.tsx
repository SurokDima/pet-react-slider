import { relative } from 'path';
import classes from '../../styles/PauseButton.module.scss';

export default function PauseButton({ isPlay, setIsPlay }: IPauseButtonProps) {
  const pauseCls = ['fas fa-pause'];
  const playCls = ['fas fa-play'];
  const stubCls = ['fas fa-play', classes.stub];

  if (isPlay) playCls.push(classes.active);
  else pauseCls.push(classes.active);

  return (
    <div className={classes.pauseButton} onClick={() => setIsPlay(!isPlay)}>
      <i className={pauseCls.join(' ')} />
      <i className={playCls.join(' ')} />
      <i className={stubCls.join(' ')} />
    </div>
  );
}

interface IPauseButtonProps {
  isPlay: boolean;
  setIsPlay: (isPlay: boolean) => void;
}
