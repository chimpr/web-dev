import React, { useState, useEffect } from 'react';
import '../styles/student.css';
import StudentImage from '../images/Studentmonkey.png';
import Student from '../../models/Student';
import { Role } from '../../models/User';

const StudentProfile: React.FC = () => {
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
    const fetchData = async () => {
      const mockData = {
        uid: '67b7789dd888a28750c2a216', 
        FirstName: 'Alice',
        LastName: 'Smith',
        School: 'University of XYZ',
        Grad_Semester: 'Spring',
        Grad_Year: 2025,
        Bio: 'Interested in software development...',
        Email: 'example@gmail.com'
      };

      const student = new Student(
        mockData.uid,
        mockData.FirstName,
        mockData.LastName,
        mockData.School,
        mockData.Grad_Semester,
        mockData.Grad_Year,
        mockData.Bio,
        mockData.Email
      );
            setStudentData({ ...student });
          };
          
          fetchData();
        }, []);

        const handleSave = () => {
          setIsEditing(false);
          //Change later to send it to API
          const studentToSave = new Student(
            studentData.uid,
            studentData.firstName,
            studentData.lastName,
            studentData.school,
            studentData.gradSemester,
            studentData.gradYear,
            studentData.bio,
            studentData.email
          );
          console.log('Saving student:', studentToSave);
        };

        return (
          <div className="student-container">
            <div className="profile-card">
              <h1 className="student-title">Welcome to the student portal</h1>
              <img src={StudentImage} alt="Student Portal" className="student-image" />
        
              <div className="form-container">
                <div className="form-group">
                  <label>Name:</label>
                  {isEditing ? (
                    <div className="name-inputs">
                      <input
                        value={studentData.firstName}
                        onChange={(e) => setStudentData({...studentData, firstName: e.target.value})}
                        className="student-input"
                      />
                      <input
                        value={studentData.lastName}
                        onChange={(e) => setStudentData({...studentData, lastName: e.target.value})}
                        className="student-input"
                      />
                    </div>
                  ) : (
                    <span className="student-info">{`${studentData.firstName} ${studentData.lastName}`}</span>
                  )}
                </div>
      
                <div className="form-group">
                  <label>School:</label>
                  {isEditing ? (
                    <input
                      value={studentData.school}
                      onChange={(e) => setStudentData({...studentData, school: e.target.value})}
                      className="student-input"
                    />
                  ) : (
                    <span className="student-info">{studentData.school}</span>
                  )}
                </div>
      
                <div className="form-group">
                  <label>Graduation:</label>
                  {isEditing ? (
                    <div className="graduation-inputs">
                      <select
                        value={studentData.gradSemester}
                        onChange={(e) => setStudentData({...studentData, gradSemester: e.target.value})}
                        className="student-input"
                      >
                        <option value="Spring">Spring</option>
                        <option value="Fall">Fall</option>
                        <option value="Summer">Summer</option>
                      </select>
                      <input
                        type="number"
                        value={studentData.gradYear}
                        onChange={(e) => setStudentData({...studentData, gradYear: parseInt(e.target.value) || 0})}
                        className="student-input"
                      />
                    </div>
                  ) : (
                    <span className="student-info">{`${studentData.gradSemester} ${studentData.gradYear}`}</span>
                  )}
                </div>
      
                <div className="form-group">
                  <label>Bio:</label>
                  {isEditing ? (
                    <textarea
                      value={studentData.bio}
                      onChange={(e) => setStudentData({...studentData, bio: e.target.value})}
                      className="student-textarea"
                    />
                  ) : (
                    <span className="student-info">{studentData.bio}</span>
                  )}
                </div>
      
                <div className="form-group">
                  <label>Email:</label>
                  {isEditing ? (
                    <input
                      value={studentData.email}
                      onChange={(e) => setStudentData({...studentData, email: e.target.value})}
                      className="student-input"
                    />
                  ) : (
                    <span className="student-info">{studentData.email}</span>
                  )}
                </div>
      
                <button 
                  onClick={isEditing ? handleSave : () => setIsEditing(true)}
                  className="student-button"
                >
                  {isEditing ? 'Save Changes' : 'Edit Profile'}
                </button>
              </div>
            </div>
          {/* Saved roght side for performance */}
            <div className="right-space"></div>
          </div>
        );
      };
      
      export default StudentProfile;