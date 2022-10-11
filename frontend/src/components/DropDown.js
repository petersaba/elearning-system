const DropDown = ( props ) => {
    return (
        <select className="select-input">
            {props.map((value) => {
                return (
                    <option value={value}>{value}</option>
                );
            })
            }
        </select>
    )
}

export default DropDown;