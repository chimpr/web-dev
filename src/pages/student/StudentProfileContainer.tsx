import React, { useState, useEffect } from 'react';
import { getStudent, updateStudent, getResume } from '../../api/api';
import StudentProfileView from './StudentProfileView';
import Student from '../../models/Student';
import User, { Role } from '../../models/User';

const StudentProfileContainer = (props: any) => {
    const [isEditing, setIsEditing] = useState(false);
    const recruiterViewID = props.recruiterViewID;
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
    
    const [resumeUrl, setResumeUrl] = useState<string>('');

    useEffect(() => {
        const fetchData = async () => {
            if (!props.loggedInUser && (recruiterViewID == null || recruiterViewID === '')) return;
            try {
                const studentResponse = await getStudent(recruiterViewID !== null && recruiterViewID !== '' ? recruiterViewID : props.loggedInUser.uid);
                if (studentResponse.Error) {
                    console.error('Student fetch error:', studentResponse.Error);
                    return;
                }
                if (!studentResponse._id) {
                    console.error('Invalid student data:', studentResponse);
                    return;
                }
                
                setStudentData(new Student(
                    studentResponse._id,
                    studentResponse.FirstName,
                    studentResponse.LastName,
                    studentResponse.School,
                    studentResponse.Grad_Semester,
                    studentResponse.Grad_Year,
                    studentResponse.Bio,
                    studentResponse.Email,
                    studentResponse.Job_Performance || [0, "No reviews yet"]
                ));

                const resumeResponse = await getResume(recruiterViewID !== null && recruiterViewID !== '' ? recruiterViewID : props.loggedInUser.uid);
                if (resumeResponse.Error) {
                    console.error('Resume fetch error:', resumeResponse.Error);
                    return;
                }
                if (resumeResponse.downloadUrl) {
                    const fileName = resumeResponse.downloadUrl.split('/').pop();
                    setResumeUrl(`/api/resumes/${fileName}?t=${Date.now()}`);
                }else {
                    setResumeUrl('');
                }
            } catch (error) {
                console.error('Data fetch failed:', error);
            }
        };
    
        fetchData();
    }, []);

    const handleSave = async () => {
        try {
            const updateData = {
                id: studentData.uid,
                School: studentData.school,
                Grad_Semester: studentData.gradSemester,
                Grad_Year: studentData.gradYear,
                Bio: studentData.bio,
                FirstName: studentData.firstName,
                LastName: studentData.lastName
            };
    
            console.log('Sending update:', updateData);
            
            const response = await updateStudent(updateData);
            console.log('Update response:', response);
            
            if (!response.Error) {
                const updatedStudent = await getStudent(studentData.uid);
                if (updatedStudent && !updatedStudent.Error) {
                    setStudentData(new Student(
                        updatedStudent._id,
                        updatedStudent.FirstName,
                        updatedStudent.LastName,
                        updatedStudent.School,
                        updatedStudent.Grad_Semester,
                        updatedStudent.Grad_Year,
                        updatedStudent.Bio,
                        updatedStudent.Email,
                        updatedStudent.Job_Performance
                    ));
                }
                setIsEditing(false);
            }
        } catch (error) {
            console.error('Save failed:', error);
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
            recruiterView={recruiterViewID !== null && recruiterViewID !== ''}
            userId={(recruiterViewID !== null && recruiterViewID !== '') ? recruiterViewID : props.loggedInUser?.uid}
        />
    );
};

export default StudentProfileContainer;