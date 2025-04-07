import React, { useState, useEffect } from 'react';
import { getStudent, updateStudent, getResume } from '../../api/api';
import StudentProfileView from './StudentProfileView';
import Student from '../../models/Student';
import User, { Role } from '../../models/User';

// interface StudentProfileContainerProps {
//     userId: string;
// }

const StudentProfileContainer = (props: any) => {
    const [isEditing, setIsEditing] = useState(false);
    const [studentData, setStudentData] = useState<Student>({
        uid: '',
        role: Role.STUDENT,
        firstName: '',
        lastName: '',
        school: '',
        gradSemester: '',
        gradYear: 0,
        bio: '',
        email: '',
        jobPerformance: [0, "No reviews yet"]
    });
    
    const [resumeUrl, setResumeUrl] = useState<string | null>(null);

    useEffect(() => {
        // check if user is not logged in
        if (props.loggedInUser === null) {
            console.log("NULL USER")
            return;
        }
        const user = (props.loggedInUser as Student);
        const response =  getStudent(user.uid);
        getStudent(user.uid).then((response) => {
            setStudentData(new Student(
                response['_id'],
                response['FirstName'],
                response['LastName'],
                response['School'],
                response['Grad_Semester'],
                response['Grad_Year'],
                response['Bio'],
                response['Email'],
                response['Job_Performance'] || [0, "No reviews yet"]
            ));
        });

        getResume(user.uid).then((res) => {
            console.log(res);
            if (res['fileName'] === null || res['fileName'] === '')
                return;

            const resumeUrl = res['downloadUrl'];
            const fileName = resumeUrl.includes('/') 
            ? resumeUrl.split('/').pop()
            : resumeUrl;

            console.log(resumeUrl);
            setResumeUrl(`/api/resumes/${fileName}`);
    
        });
        
    }, []);

    const handleSave = async () => {
        const updateData = {
            id: studentData.uid,
            School: studentData.school,
            Grad_Semester: studentData.gradSemester,
            Grad_Year: studentData.gradYear,
            Bio: studentData.bio,
            FirstName: studentData.firstName,
            LastName: studentData.lastName
        };

        const response = await updateStudent(updateData);
        if (response.data) {
            setIsEditing(false);
        }
    };

    return (
        <StudentProfileView
            isEditing={isEditing}
            studentData={studentData}
            onEditToggle={() => setIsEditing(!isEditing)}
            onSave={handleSave}
            onDataChange={setStudentData}
            resumeUrl={resumeUrl || undefined}
            setResumeUrl={setResumeUrl} 
        />
    );
};

export default StudentProfileContainer;