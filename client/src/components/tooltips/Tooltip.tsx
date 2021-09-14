import styles from './Tooltip.module.scss';

export default function Tooltip(props: {
    position: 'left' | 'down' | 'right' | 'up',
    text: string,
    children: React.ReactNode,
    className?: string,
}) {
    let tooltip = '';
    let tooltipText = '';
    switch (props.position) {
        case 'left':
            tooltip = styles.tooltipLeft;
            tooltipText = styles.tooltipTextLeft;
            break;
        case 'down':
            tooltip = styles.tooltipDown;
            tooltipText = styles.tooltipTextDown;
            break;
        case 'right':
            tooltip = styles.tooltipRight;
            tooltipText = styles.tooltipTextRight;
            break;
        case 'up':
            tooltip = styles.tooltipUp;
            tooltipText = styles.tooltipTextUp;
            break;
    }

    if (props.className)
        tooltipText += ' ' + props.className;

    return (
        <div className={tooltip}>
            {props.children}
            <div className={tooltipText}>
                {props.text}
            </div>
        </div>
    )
}
