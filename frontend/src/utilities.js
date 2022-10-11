import axios from "axios";
import Form from "./components/Form";

export const checkPattern = (value, pattern) => {
    return value.search(pattern);
}

export const checkValidEmail = (email) => {
    const pattern = /^.{3,}@[^\W_]{3,}\.[^\W_]{2,}$/;
    return checkPattern(email, pattern) == -1 ? false : true;
}

export const checkStrongPassword = (password) => {
    if(password.length < 12)
        return false;

    let pattern = / /;
    if(checkPattern(password, pattern) != -1)
        return false;

    pattern = /\d.*\d/;
    if(checkPattern(password, pattern) == -1) 
        return false;
    
    pattern = /[A-Z].*[A-Z]/;
    if(checkPattern(password, pattern) == -1)
        return false;

    pattern = /[a-z].*[a-z]/;
    if(checkPattern(password, pattern) == -1)
        return false;

    // checkign for 2 symbols
    pattern = /[\W_].*[\W_]/;
    if(checkPattern(password, pattern) == -1)
        return false;
    
    return true;
}

export const samePasswords = (password1, password2) => {
    if(password1 == password2)
        return true;
    return false;
}

const baseUrl = 'http://127.0.0.1:8000/api/';

export const axiosPost = async (api, data, token=null) => {
    try{
        return await axios.post(baseUrl + api, data,
                                {
                                    headers: {
                                        'Authorization': "Bearer" + token,
                                    }
                                });
    }catch(error){
        console.log('Error from API');
        console.log(error);
        
        if(error.response)
            return error.response.data;
    }
}

export const axiosGet = async (api, token=null) => {
    try{
        return await axios.get(baseUrl + api,
            {
                headers: {
                    'Authorization': "Bearer " + token,
                }
            });
    }catch(error){
        console.log('Error from Api');
        console.log(error);
        if(error.response)
            return error.response.data;
    }
}

export const login = async (e, email, password) => {
    e.preventDefault();
    if(email == '' || password == '')
        return 'Please fill all fields';
    if(!checkValidEmail(email))
        return 'Invalid email format';

    const data = new FormData();
    data.append('email', email);
    data.append('password', password);

    const response = await axiosPost('login', data);
    if(response.status == 'Error')
        return response.message;
    
    console.log(response.data.message);
    localStorage.setItem('current_user', JSON.stringify(response.data.message));
}

export const signUp = async (e, email, full_name, password, confirm_password, type) => {
    e.preventDefault();
    
    const message = validateSignUp(e, email, full_name, password, confirm_password, type);
    if(message){
        return message;
    }

    const data = new FormData();
    data.append('email', email);
    data.append('full_name', full_name);
    data.append('password', password);
    data.append('confirm_password', confirm_password);

    const response = await axiosPost(`register/${type}`, data);
    if(response.status == 'Error')
        return response.message;
    
}

export const validateSignUp = (e, email, full_name, password, confirm_password, type) => {

    if(!email || !password || !full_name || !confirm_password || !type)
        return 'Please fill all fields';
    if(!checkValidEmail(email))
        return 'Invalid email format';
    if(!checkStrongPassword(password))
        return 'password not strong enough';
    if(!samePasswords(password, confirm_password))
        return 'passwords do not match';
}

export const validateAddCourse = (e, course_code, course_name) => {
    if(!course_code || !course_name)
        return 'Please fill all fields';
}

export const addCourse = async (e, course_code, course_name) => {
    e.preventDefault();
    
    const message = validateAddCourse(e, course_code, course_name);
    if(message)
    return message;
    
    const token = JSON.parse(localStorage.getItem('current_user')).token.original.access_token;
    const data = new FormData();
    data.append('code', course_code);
    data.append('name', course_name)
    const response = await axiosPost('course', data, token);
    
    if(response.status == 'Error')
        return response.message;
}

export const getUnassignedCourses = async () => {
    const token = JSON.parse(localStorage.getItem('current_user')).token.original.access_token;

    const response = await axiosGet('unassigned_courses', token);

    return response.data.message;
}

export const getAllInstructors = async () => {
    const token = JSON.parse(localStorage.getItem('current_user')).token.original.access_token;

    const response = await axiosGet('type/instructor', token);

    return response.data.message;
}

export const assignInstructor = async (instructor_id, course_id) => {

    if(!instructor_id || !course_id)
        return 'Please fill all fields';

    const token = JSON.parse(localStorage.getItem('current_user')).token.original.access_token;

    const data = new FormData();
    data.append('instructor_email', instructor_id);
    data.append('course_code', course_id);
    const response = await axiosPost('assign_instructor', data, token);

    if(response.data.status == 'Success')
        return 'Instructor assigned successfully';
}

export const createAssignment = async (title, content) => {
    if(!title || !content)
        return 'Please fill all fields';

    const token = JSON.parse(localStorage.getItem('current_user')).token.original.access_token;

    const data = new FormData();
    data.append('title', title);
    data.append('content', content);
    await axiosPost('assignments', data, token);

    return 'Assignment created successfully';
}

export const createAnnouncement = async (title, content) => {
    if(!title || !content)
        return 'Please fill al fields';
    
    const token = JSON.parse(localStorage.getItem('current_user')).token.original.access_token;

    const data = new FormData();
    data.append('title', title);
    data.append('content', content);

    await axiosPost('announcements', data, token);

    return 'Announcement created successfully';
}