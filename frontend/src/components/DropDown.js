const DropDown = ( props ) => {
    if(props.type == 'user_type'){
        return (
            <select className="select-input" onChange={(e) => {props.onChange('type', e.target.value)}}>
            {Object.keys(props).map((value) => {
                if(value != 'onChange' || value != 'type'){
                    return (
                        <option key={value} value={props[value]}>{props[value]}</option>
                        );
                    }
                })}
            </select>
        );
    }

    return (
        <select className="select-input" onChange={(e) => {props.onChange(props.type, e.target.value)}}>
        {Object.keys(props).map((value) => {
            if(value != 'onChange' && value != 'type'){
                return (
                    <option key={value}>{props.type == 'instructor_id' ? props[value].email : props[value].code}</option>
                    );
                }
            })} 
        </select>
    )
}

export default DropDown;