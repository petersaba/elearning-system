import { Link } from "react-router-dom";

const Dashboard = ({ type, full_name }) => {
    if(type == 'admin'){
        return (
            <div className="dashboard">
                <h3>Admin full name</h3>
                <ul>
                    <li><Link to='/admin/add_user'>Add User</Link></li>
                    <li><Link to='/admin/add_course'>Add Course</Link></li>
                    <li><Link to='/admin/assign_instructor'>Assign Instructor</Link></li>
                </ul>
            </div>
        );
    }

    if(type == 'instructor'){
        return (
            <div className="dashboard">
                <h3>instructor full name</h3>
                <ul>
                    <li><Link to='/instructor/add_student'>Add Student</Link></li>
                    <li><Link to='/instructor/add_assignment'>Add Assignment</Link></li>
                    <li><Link to='/instructor/add_announcement'>Add Announcement</Link></li>
                </ul>
            </div>
        );
    }
}

export default Dashboard;