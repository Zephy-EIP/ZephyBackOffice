
export class SelectElement {
    title: string;
    value: string;
    key: string;

    /// By default, key takes the value of value
    constructor(title: string, value: string, key?: string) {
        this.title = title;
        this.value = value;
        this.key = key || value;
    }
}

interface Props {
    elements: SelectElement[],
    defaultValue?: string,
    defaultTitle?: string,
    onChange?: (value: string) => any,
}

export default function Select(props: Props) {
    return (
        <div>
            {
                props.elements.map(elem =>
                    <button
                        onClick={() => {
                            props.onChange?.call('', elem.value);
                        }}
                        key={elem.key} >
                        {elem.title}
                    </button>
                )
            }
        </div>
    )
}
