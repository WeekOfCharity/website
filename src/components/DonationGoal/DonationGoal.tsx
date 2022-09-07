import classNames from 'classnames';
import { Brush4 } from '../Brushes/Brush4';

export const DonationGoal = ({ achieved = false, amount, description, title }: { achieved?: boolean; amount: number; description: string; title: string }) => {
  return (
    <article className={classNames('flex items-center p-5', { 'bg-arctic-200': achieved, 'bg-neutral-100': !achieved })}>
      <div className="flex items-center justify-center mr-7 relative">
        <Brush4 className={classNames('h-24 -ml-1 -my-2 rotate-45 w-auto', { 'text-arctic-500': achieved, 'text-neutral-300': !achieved })} />
        <div className={classNames('absolute font-fat ml-2 text-5xl z-10', { 'text-arctic-900': achieved, 'text-neutral-500': !achieved })}>{amount}</div>
      </div>

      <div>
        <div className="font-semibold text-lg">{title || 'Dieses Spendenziel ist noch geheim'}</div>
        {description && <div>{description}</div>}
      </div>
    </article>
  );
};
