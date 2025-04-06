import React, { useState, useEffect } from 'react';
import { getStudent, updateStudent, getResume } from '../../api/api';
import StudentProfileView from './StudentProfileView';
import Student from '../../models/Student';
import { Role } from '../../models/User';

interface StudentProfileContainerProps {
    userId: string;
}

const StudentProfileContainer: React.FC<StudentProfileContainerProps> = ({ userId }) => {
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
        const fetchData = async () => {
            const studentResponse = await getStudent(userId);
            if (studentResponse.data) {
                const apiData = studentResponse.data;
                setStudentData(new Student(
                    apiData._id,
                    apiData.FirstName,
                    apiData.LastName,
                    apiData.School,
                    apiData.Grad_Semester,
                    apiData.Grad_Year,
                    apiData.Bio,
                    apiData.Email,
                    apiData.Job_Performance || [0, "No reviews yet"]
                ));
            }

            const resumeResponse = await getResume(userId);
            if (resumeResponse.data?.downloadUrl) {
                const fileName = resumeResponse.data.downloadUrl.includes('/') 
                    ? resumeResponse.data.downloadUrl.split('/').pop()
                    : resumeResponse.data.downloadUrl;
                
                setResumeUrl(`/api/resumes/${fileName}`);
            }
        };
        
        fetchData();
    }, [userId]);

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