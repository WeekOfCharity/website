import classNames from 'classnames';
import './Shimmer.scss';

type ShimmerProps = {
  className?: string;
};

export const Shimmer = ({ className }: ShimmerProps) => {
  return <div className={classNames('woc-shimmer', className)}></div>;
};
