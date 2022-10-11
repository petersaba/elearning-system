const DropDown = ( props ) => {
    return (
        <select className="select-input" onChange={(e) => {props.onChange('type', e.target.value)}}>
            {Object.keys(props).map((value) => {
                return (
                    <option value={props[value]}>{props[value]}</option>
                );
            })
            }
        </select>
    )
}

export default DropDown;