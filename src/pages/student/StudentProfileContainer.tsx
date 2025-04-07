import React, { useState, useEffect } from 'react';
import { getStudent, updateStudent } from '../../api/api';
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
        email: ''
    });

    useEffect(() => {
        const fetchStudentData = async () => {
            const response = await getStudent(userId);
            if (response.data) {
                const apiData = response.data;
                setStudentData(new Student(
                    apiData._id,
                    apiData.FirstName,
                    apiData.LastName,
                    apiData.School,
                    apiData.Grad_Semester,
                    apiData.Grad_Year,
                    apiData.Bio,
                    apiData.Email
                ));
            }
        };
        
        fetchStudentData();
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
        />
    );
};

export default StudentProfileContainer;