const DropDown = ( props ) => {
    if(props.type == 'user_type'){
        return (
            <select className="select-input" onChange={(e) => {props.onChange('type', e.target.value)}}>
            {Object.keys(props).map((value) => {
                if(value != 'onChange' || value != 'type'){
                    return (
                        <option key={value}>{props[value]}</option>
                        );
                    }
                })}
            </select>
        );
    }

    if(props.type == 'available_course_code'){
        <select className="select-input" onChange={(e) => {props.onChange('course_code', e.target.value)}}>
        {Object.keys(props).map((element) => {
            if(element != 'onChange' && element != 'type'){
                return (
                    <option key={element}>{props[element].code}</option>
                    );
                }
            })} 
        </select>
    }

    return (
        <select className="select-input" onChange={(e) => {props.onChange(props.type, e.target.value)}}>
        {Object.keys(props).map((value) => {
            if(value != 'onChange' && value != 'type'){
                return (
                    <option key={value}>{props.type == 'instructor_email' ? props[value].email : props[value].code}</option>
                    );
                }
            })} 
        </select>
    )
}

export default DropDown;