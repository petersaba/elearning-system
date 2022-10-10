const Dashboard = ({ type, full_name }) => {
    if(type == 'admin'){
        return (
            <div className="dashboard">
                <h3>Admin full name</h3>
                <ul>
                    <li>Add User</li>
                    <li>Add Course</li>
                    <li>Assign Instructor</li>
                </ul>
            </div>
        );
    }
}

export default Dashboard;