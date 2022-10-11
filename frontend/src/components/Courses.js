import { useEffect, useState } from "react";
import { getCoursesEnrolledIn } from "../utilities";

const Courses = (props) => {

    const [courses, setCourses] = useState();

    useEffect(() => {
        getCoursesEnrolledIn().then((response) => setCourses(response));
    }, []);

    if(courses){
        return (
            <table className="courses-table fix-position">
            {courses.map((element) =>{
                return (
                    <tr>
                        <td>Course Code: {element.code}</td>
                        <td>Course Name: {element.name}</td>
                    </tr>
                );
            })}

            </table>
        );
    }
}

export default Courses;